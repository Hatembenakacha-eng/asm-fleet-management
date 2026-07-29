<?php
namespace App\Services;

use App\Models\Voiture;
use App\Models\Mission;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ChatService
{
    public function repondre(string $message): array
    {
        $voitures = Voiture::all(['immatriculation', 'marque', 'modele', 'statut', 'capacite', 'categorie']);

        $missions = Mission::all(['destination', 'date_debut', 'date_fin', 'capacite_minimale', 'type_vehicule']);

        $contexte = "Parc actuel : " . $voitures->toJson() . " Missions actives/planifiées : " . $missions->toJson();

        $cle = config('services.groq.key');
        $modele = config('services.groq.model');

        try {
            $response = Http::withToken($cle)
                ->withOptions(['verify' => false])
                ->timeout(60)
                ->post('https://api.groq.com/openai/v1/chat/completions', [
                    'model' => $modele,
                    'messages' => [
                        [
                            'role' => 'system',
                            'content' => "Tu es l'assistant du parc automobile ASM. Réponds en français, de façon concise (3 phrases maximum), "
                                . "en te basant UNIQUEMENT sur ce contexte réel : {$contexte}",
                        ],
                        [
                            'role' => 'user',
                            'content' => $message,
                        ],
                    ],
                    'temperature' => 0.3,
                    'max_tokens' => 300,
                ]);

            if (!$response->successful()) {
                Log::error('Groq indisponible', ['status' => $response->status(), 'body' => $response->body()]);
                return ['succes' => false, 'reponse' => "Le service IA est momentanément indisponible."];
            }

            $texte = trim((string) $response->json('choices.0.message.content'));

            return [
                'succes' => true,
                'reponse' => $texte !== '' ? $texte : "Je n'ai pas de réponse à te donner pour le moment.",
            ];
        } catch (\Exception $e) {
            Log::error('Erreur chat IA (Groq)', ['erreur' => $e->getMessage()]);
            return ['succes' => false, 'reponse' => "Le service IA est momentanément indisponible."];
        }
    }
}
