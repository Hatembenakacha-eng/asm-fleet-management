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
                    . "4. Une fois toutes ces informations réunies, ajoute IMPÉRATIVEMENT ce tag exact à la toute fin du message :\n"
                    . "[PROPOSER:voiture_id=ID,mission_id=ID,dest=DESTINATION,debut=YYYY-MM-DD,fin=YYYY-MM-DD]\n"
                    . "5. Si la mission n'existe pas dans la liste des missions, mets mission_id=0 et extrais la destination et les dates dites par l'utilisateur."
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
                    'max_tokens' => 300,
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

            // Détection et extraction des balises [PROPOSER:...]
            if (preg_match('/\[PROPOSER:voiture_id=(\d+),mission_id=(\d+)(?:,dest=([^,\]]+))?(?:,debut=([^,\]]+))?(?:,fin=([^,\]]+))?\]/', $texte, $matches)) {
                $voitureId = (int) $matches[1];
                $missionIdFinal = (int) $matches[2];
                $destination = isset($matches[3]) ? trim($matches[3]) : null;
                $dateDebut   = isset($matches[4]) ? trim($matches[4]) : null;
                $dateFin     = isset($matches[5]) ? trim($matches[5]) : null;

                $texte = trim((string) preg_replace('/\[PROPOSER:.*?\]/', '', $texte));

                if ($voitureId > 0) {
                    $vehiculeRecommande = Voiture::query()->find($voitureId);
                }
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
