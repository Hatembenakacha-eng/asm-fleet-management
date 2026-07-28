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
        $missions = Mission::where('statut', '!=', 'terminee')->get(['destination', 'statut', 'date_debut', 'date_fin', 'capacite_minimale', 'type_vehicule']);

        $contexte = "Parc actuel : " . $voitures->toJson() . " Missions actives/planifiées : " . $missions->toJson();
        $prompt = "Tu es l'assistant du parc automobile ASM. Réponds en français, de façon concise (3 phrases maximum), "
                . "en te basant UNIQUEMENT sur ce contexte réel : {$contexte}\n\nQuestion : {$message}";

        $urlBase = rtrim(config('services.ollama.url'), '/');
        $modele = config('services.ollama.model');

        try {
            $response = Http::timeout(60)->post("{$urlBase}/api/generate", [
                'model'  => $modele,
                'prompt' => $prompt,
                'stream' => false,
            ]);

            if (!$response->successful()) {
                Log::error('Ollama indisponible', ['status' => $response->status(), 'body' => $response->body()]);
                return ['succes' => false, 'reponse' => "Le service IA est momentanément indisponible."];
            }

            $texte = trim((string) $response->json('response'));

            return [
                'succes' => true,
                'reponse' => $texte !== '' ? $texte : "Je n'ai pas de réponse à te donner pour le moment.",
            ];
        } catch (\Exception $e) {
            Log::error('Erreur chat IA (Ollama)', ['erreur' => $e->getMessage()]);
            return ['succes' => false, 'reponse' => "Le service IA est momentanément indisponible. Vérifiez qu'Ollama est bien lancé (ollama serve)."];
        }
    }
}
