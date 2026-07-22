<?php

namespace App\Services;

use App\Models\Mission;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class RecommandationService
{
    protected AffectationService $affectationService;

    public function __construct(AffectationService $affectationService)
    {
        $this->affectationService = $affectationService;
    }

    public function recommander(Mission $mission): array
    {
        $candidats = $this->affectationService->voituresCandidates($mission);

        if ($candidats->isEmpty()) {
            return [
                'succes' => false,
                'message' => 'Aucun véhicule disponible ne correspond aux critères de cette mission.',
            ];
        }

        $reponseIA = $this->appelerIA($mission, $candidats);

        return $reponseIA ?? $this->reponseSecours($candidats);
    }

    protected function appelerIA(Mission $mission, $candidats): ?array
    {
        $listeVehicules = $candidats->map(fn($v) => [
            'id' => $v->id,
            'marque' => $v->marque,
            'modele' => $v->modele,
            'capacite' => $v->capacite,
            'categorie' => $v->categorie,
            'kilometrage' => $v->kilometrage,
        ])->toArray();

        $prompt = $this->construirePrompt($mission, $listeVehicules);

        try {
            $response = Http::timeout(10)->post(
                'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' . env('GEMINI_API_KEY'),
                ['contents' => [['parts' => [['text' => $prompt]]]]]
            );

            if (!$response->successful()) {
                Log::error('Appel IA échoué', ['status' => $response->status()]);
                return null;
            }

            $texteBrut = $response->json('candidates.0.content.parts.0.text');
            $donnees = json_decode($texteBrut, true);

            if (!$donnees || !isset($donnees['vehicule_id'])) {
                Log::error('Réponse IA mal formée', ['reponse' => $texteBrut]);
                return null;
            }

            $vehiculeValide = $candidats->firstWhere('id', $donnees['vehicule_id']);

            if (!$vehiculeValide) {
                Log::error('IA a recommandé un véhicule hors liste', ['id' => $donnees['vehicule_id']]);
                return null;
            }

            return [
                'succes' => true,
                'source' => 'ia',
                'vehicule_recommande' => $vehiculeValide,
                'justification' => $donnees['justification'] ?? '',
                'alternatives' => $candidats->whereIn('id', $donnees['alternatives'] ?? [])->values(),
            ];
        } catch (\Exception $e) {
            Log::error('Exception appel IA', ['erreur' => $e->getMessage()]);
            return null;
        }
    }

    protected function construirePrompt(Mission $mission, array $vehicules): string
    {
        $vehiculesJson = json_encode($vehicules);

        return <<<PROMPT
Tu choisis le véhicule le plus adapté pour une mission de transport.

Mission : destination {$mission->destination}, capacité minimale requise {$mission->capacite_minimale}, type requis {$mission->type_vehicule_requis}.

Véhicules disponibles (choisis UNIQUEMENT parmi ceux-ci) :
{$vehiculesJson}

Réponds UNIQUEMENT avec ce JSON, sans aucun texte autour :
{"vehicule_id": <id>, "justification": "<une phrase>", "alternatives": [<autres id>]}
PROMPT;
    }

    protected function reponseSecours($candidats): array
    {
        $premier = $candidats->first();

        return [
            'succes' => true,
            'source' => 'secours',
            'vehicule_recommande' => $premier,
            'justification' => 'Service IA indisponible — premier véhicule disponible correspondant aux critères proposé automatiquement.',
            'alternatives' => $candidats->slice(1, 2)->values(),
        ];
    }
}
