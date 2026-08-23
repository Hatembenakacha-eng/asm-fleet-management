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
                'message' => 'Aucun vehicule disponible ne correspond aux critères de cette mission.',
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

        $cle = config('services.groq.key');
        $modele = config('services.groq.model');

        try {
            $response = Http::withToken($cle)->timeout(60)->post('https://api.groq.com/openai/v1/chat/completions', [
                'model' => $modele,
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'Tu réponds UNIQUEMENT avec un objet JSON valide, sans texte autour, sans balises markdown.',
                    ],
                    [
                        'role' => 'user',
                        'content' => $prompt,
                    ],
                ],
                'response_format' => ['type' => 'json_object'],
                'temperature' => 0.2,
                'max_tokens' => 500,
            ]);

            if (!$response->successful()) {
                Log::error('Appel IA echoue', ['status' => $response->status(), 'body' => $response->body()]);
                return null;
            }

            $texteBrut = $response->json('choices.0.message.content');
            $donnees = json_decode($texteBrut, true);

            if (!$donnees || !isset($donnees['vehicule_id'])) {
                Log::error('Reponse IA mal formee', ['reponse' => $texteBrut]);
                return null;
            }

            $vehiculeValide = $candidats->firstWhere('id', $donnees['vehicule_id']);

            if (!$vehiculeValide) {
                Log::error('IA a recommande un vehicule hors liste', ['id' => $donnees['vehicule_id']]);
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
Tu choisis le vehicule le plus adapte pour une mission de transport.

Mission : destination {$mission->destination}, capacite minimale requise {$mission->capacite_minimale}, type requis {$mission->type_vehicule}.

Vehicules disponibles (choisis UNIQUEMENT parmi ceux-ci) :
{$vehiculesJson}

Reponds UNIQUEMENT avec ce JSON, sans aucun texte autour :
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
            'justification' => 'Service IA indisponible — premier vehicule disponible correspondant aux critères propose automatiquement.',
            'alternatives' => $candidats->slice(1, 2)->values(),
        ];
    }
}
