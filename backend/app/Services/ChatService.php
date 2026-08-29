<?php

namespace App\Services;

use App\Models\Voiture;
use App\Models\Mission;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ChatService
{
    public function repondre(string $message, array $historique = []): array
    {
        try {
            $voitures = Voiture::where('statut', 'disponible')->get(['id', 'immatriculation', 'marque', 'modele', 'statut', 'capacite']);
            $missions = Mission::all(['id', 'destination', 'date_depart', 'date_retour']);

            $contexte = "Véhicules disponibles à proposer (n'en propose aucun autre) : " . json_encode($voitures) . " | Missions en base : " . json_encode($missions);

            $cle = config('services.groq.key') ?? env('GROQ_API_KEY');
            $modele = config('services.groq.model') ?? env('GROQ_MODEL', 'llama-3.3-70b-versatile');

            $systemMessage = [
                'role' => 'system',
                'content' => "Tu es l'assistant de gestion du parc automobile ASM. Contexte : {$contexte}.\n"
                    . "CONSIGNES STRICTES DE RÉPONSE :\n"
                    . "1. Si l'utilisateur demande N places et qu'un véhicule disponible a une capacité >= N (ex: 5 places pour 3 personnes), ce véhicule CONVIENT PARFAITEMENT. Ne dis JAMAIS qu'aucun véhicule n'est disponible !\n"
                    . "2. Sois clair, logique et très court (2 phrases max).\n"
                    . "3. N'ajoute le tag [PROPOSER:...] QUE lorsque tu connais à la fois : un véhicule adapté, LA DESTINATION et LES DATES DE DÉPART/RETOUR données par l'utilisateur. "
                    . "Si la destination ou les dates manquent encore, pose la question à l'utilisateur au lieu d'ajouter le tag.\n"
                    . "4. Une fois toutes ces informations réunies, ajoute IMPÉRATIVEMENT ce tag exact, seul sur sa propre ligne, à la toute fin du message :\n"
                    . "[PROPOSER:immatriculation=PLAQUE,mission_id=ID,dest=DESTINATION,debut=YYYY-MM-DD,fin=YYYY-MM-DD]\n"
                    . "PLAQUE doit être recopiée EXACTEMENT comme dans le champ immatriculation de la liste ci-dessus (jamais un id).\n"
                    . "5. Si la mission n'existe pas dans la liste des missions, mets mission_id=0 et extrais la destination et les dates dites par l'utilisateur.\n"
                    . "6. Ce tag est un mécanisme technique INTERNE, jamais montré tel quel à l'utilisateur : n'écris jamais le mot PROPOSER ni des crochets [...] dans ta phrase, "
                    . "et ne mentionne pas la plaque d'immatriculation dans le texte visible. Désigne le véhicule par sa marque et son modèle : ce sont ces mots qui doivent "
                    . "correspondre exactement au véhicule indiqué dans le tag."
            ];

            $formattedHistory = [];
            foreach ($historique as $msg) {
                if (is_array($msg) && isset($msg['role'], $msg['content'])) {
                    $formattedHistory[] = [
                        'role' => in_array($msg['role'], ['user', 'assistant'], true) ? $msg['role'] : 'user',
                        'content' => (string) $msg['content']
                    ];
                }
            }

            $messagesPayload = array_merge([$systemMessage], $formattedHistory);
            $lastFormatted = end($formattedHistory);
            if (!$lastFormatted || $lastFormatted['content'] !== $message) {
                $messagesPayload[] = ['role' => 'user', 'content' => $message];
            }

            $response = Http::withToken($cle)
                ->timeout(60)
                ->post('https://api.groq.com/openai/v1/chat/completions', [
                    'model' => $modele,
                    'messages' => $messagesPayload,
                    'temperature' => 0.1,
                    'max_tokens' => 450,
                ]);

            if ($response->failed()) {
                Log::error('Erreur ChatService: réponse Groq en échec', [
                    'status' => $response->status(),
                    'body'   => $response->body(),
                ]);
                return [
                    'succes'  => false,
                    'reponse' => "Le service IA est momentanément indisponible. Réessayez dans un instant.",
                ];
            }

            $texte = trim((string) $response->json('choices.0.message.content'));

            if ($texte === '') {
                Log::error('Erreur ChatService: réponse Groq vide/inattendue', ['body' => $response->body()]);
                return [
                    'succes'  => false,
                    'reponse' => "Je n'ai pas pu générer de réponse cette fois-ci. Réessayez ou reformulez votre question.",
                ];
            }

            $vehiculeRecommande = null;
            $missionIdFinal = null;
            $destination = null;
            $dateDebut = null;
            $dateFin = null;

            // Détection et extraction de la balise [PROPOSER:...] bien formée.
            if (preg_match('/\[PROPOSER:immatriculation=([^,\]]+),mission_id=(\d+)(?:,dest=([^,\]]+))?(?:,debut=([^,\]]+))?(?:,fin=([^,\]]+))?\]/', $texte, $matches)) {
                $plaqueBrute = trim($matches[1]);
                $missionIdFinal = (int) $matches[2];
                $destination = isset($matches[3]) ? trim($matches[3]) : null;
                $dateDebut   = isset($matches[4]) ? trim($matches[4]) : null;
                $dateFin     = isset($matches[5]) ? trim($matches[5]) : null;

                // On recherche dans la MÊME collection que celle envoyée au modèle (pas une
                // nouvelle requête) : le rapprochement se fait forcément avec un véhicule que le
                // modèle avait réellement sous les yeux. Comparaison normalisée (espaces/casse)
                // pour tolérer une légère variation de recopie.
                $normaliser = fn (string $s) => strtoupper(str_replace(' ', '', $s));
                $plaqueNormalisee = $normaliser($plaqueBrute);

                $candidat = $voitures->first(
                    fn (Voiture $v) => $normaliser((string) $v->immatriculation) === $plaqueNormalisee
                );

                // Filet de cohérence : le véhicule pointé par le tag doit être celui que le
                // modèle vient de décrire en toutes lettres (marque ou modèle) dans sa phrase
                // visible. Sans ce garde-fou, un tag qui pointerait — par erreur du modèle —
                // vers un AUTRE véhicule existant que celui annoncé à l'utilisateur passerait
                // totalement inaperçu et proposerait silencieusement le mauvais véhicule.
                if ($candidat) {
                    $texteMinuscule = mb_strtolower($texte);
                    $mentionne = ($candidat->marque && str_contains($texteMinuscule, mb_strtolower($candidat->marque)))
                        || ($candidat->modele && str_contains($texteMinuscule, mb_strtolower($candidat->modele)));

                    if ($mentionne) {
                        $vehiculeRecommande = $candidat;
                    } else {
                        Log::warning('ChatService: véhicule du tag non mentionné dans le texte visible, proposition ignorée.', [
                            'immatriculation_tag' => $plaqueBrute,
                        ]);
                    }
                }
            }

            // Filet de sécurité : on retire tout fragment de balise technique restant, y compris
            // une balise tronquée (ex. réponse coupée par max_tokens avant le "]" final) ou mal
            // formée que la regex stricte ci-dessus n'aurait pas reconnue. Sans ce filet, un
            // fragment brut du type "[PROPOSER:voiture_id=3,mission_id=0,dest=Tunis" pourrait
            // s'afficher tel quel dans le chat — ce que l'utilisateur ne doit jamais voir.
            $texte = trim((string) preg_replace('/\[PROPOSER:[^\]]*\]?/i', '', $texte));

            if ($texte === '') {
                $texte = $vehiculeRecommande
                    ? "Voici ce que je vous propose."
                    : "Pouvez-vous préciser votre demande ?";
            }

            $informationsCompletes = (bool) ($vehiculeRecommande && $destination && $dateDebut && $dateFin);

            return [
                'succes'                  => true,
                'reponse'                 => $texte,
                'vehicule_recommande'     => $vehiculeRecommande,
                'mission_id'              => ($missionIdFinal && $missionIdFinal > 0) ? $missionIdFinal : null,
                'destination'             => $destination,
                'date_debut'              => $dateDebut,
                'date_fin'                => $dateFin,
                'informations_completes'  => $informationsCompletes,
            ];

        } catch (\Throwable $e) {
            Log::error('Erreur ChatService: ' . $e->getMessage());
            return [
                'succes' => false,
                'reponse' => "Une erreur est survenue lors du traitement de votre demande."
            ];
        }
    }
}
