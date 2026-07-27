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
        $prompt = "Tu es l'assistant du parc automobile ASM. Réponds en français, de façon concise, en te basant UNIQUEMENT sur ce contexte réel : {$contexte}\n\nQuestion : {$message}";

        try {
            $response = Http::timeout(15)->post(
                'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' . env('GEMINI_API_KEY'),
                ['contents' => [['parts' => [['text' => $prompt]]]]]
            );
            if (!$response->successful()) {
                return ['succes' => false, 'reponse' => "Le service IA est momentanément indisponible."];
            }
            return ['succes' => true, 'reponse' => $response->json('candidates.0.content.parts.0.text')];
        } catch (\Exception $e) {
            Log::error('Erreur chat IA', ['erreur' => $e->getMessage()]);
            return ['succes' => false, 'reponse' => "Le service IA est momentanément indisponible."];
        }
    }
}
