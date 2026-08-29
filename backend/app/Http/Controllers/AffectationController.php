<?php

namespace App\Http\Controllers;

use App\Models\Affectation;
use App\Models\Mission;
use App\Models\Employee;
use App\Services\AffectationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;

class AffectationController extends Controller
{
    public function __construct(private AffectationService $affectationService)
    {
    }

    public function index(Request $request): JsonResponse
    {
        try {
            $authUser = $request->user();
            $query = Affectation::with(['voiture', 'mission', 'employee']);


            if ($authUser->role !== 'admin') {
                $query->where('employee_id', $authUser->employee?->id ?? 0);
            }

            if ($request->has('statut') && !empty($request->statut)) {
                $statut = strtolower(trim($request->statut));
                $query->where(DB::raw('LOWER(statut)'), $statut);
            }

            $affectations = $query->orderBy('created_at', 'desc')->get();

            return response()->json([
                'succes' => true,
                'data'   => $affectations
            ], 200);

        } catch (\Throwable $e) {
            Log::error('Erreur AffectationController@index: ' . $e->getMessage());

            return response()->json([
                'succes'  => false,
                'message' => "Impossible de charger les affectations pour le moment. Réessayez dans un instant.",
            ], 500);
        }
    }

    private function parseDateValid(?string $dateInput, string $fallback): string
    {
        if (empty($dateInput) || trim($dateInput) === '?' || trim($dateInput) === '') {
            return $fallback;
        }

        try {
            return Carbon::parse($dateInput)->format('Y-m-d');
        } catch (\Throwable $e) {
            return $fallback;
        }
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'voiture_id'  => 'required|integer|exists:voitures,id',
            'mission_id'  => 'nullable|integer',
            'employee_id' => 'nullable|integer|exists:employees,id',
            'destination' => 'nullable|string',
            'date_debut'  => 'nullable|string',
            'date_fin'    => 'nullable|string',
            'statut'      => 'nullable|string|in:en_attente,active,validee,refusee,terminee,annulee',
        ]);

        try {
            return DB::transaction(function () use ($request) {
                $authUser = $request->user();
                $estAdmin = $authUser && $authUser->role === 'admin';

                $employeeId = $estAdmin ? $request->input('employee_id') : null;


                if (!$employeeId) {
                    $employeeId = $authUser?->employee?->id;
                }

                if (!$employeeId) {
                    return response()->json([
                        'succes'  => false,
                        'message' => "Aucun employé n'est associé à ce compte. Contactez un administrateur pour lier votre compte à une fiche employé.",
                    ], 422);
                }

                $creatorId = $authUser ? $authUser->id : 1;
                $missionId = $request->input('mission_id');

                $todayStr = now()->format('Y-m-d');
                $nextDayStr = now()->addDays(2)->format('Y-m-d');

                $dateDebut = $this->parseDateValid($request->input('date_debut'), $todayStr);
                $dateFin   = $this->parseDateValid($request->input('date_fin'), $nextDayStr);
                $destination = trim((string) $request->input('destination'));

                if (empty($destination) || $destination === '?') {
                    $destination = 'Mission IA (Générée)';
                }

                if (empty($missionId) || (int)$missionId === 0) {
                    $nouvelleMission = Mission::create([
                        'destination' => $destination,
                        'date_depart' => $dateDebut,
                        'date_retour' => $dateFin,
                    ]);

                    $missionId = $nouvelleMission->id;
                } elseif (!Mission::query()->whereKey($missionId)->exists()) {
                    return response()->json([
                        'succes'  => false,
                        'message' => "Mission introuvable.",
                    ], 422);
                }

                $voitureId = (int) $request->input('voiture_id');

                if ($this->affectationService->chevauchementExistant($voitureId, $dateDebut, $dateFin)) {
                    return response()->json([
                        'succes'  => false,
                        'message' => "Ce véhicule est déjà affecté à une autre mission validée sur cette période. Choisissez un autre véhicule ou d'autres dates.",
                    ], 409);
                }

                $affectation = Affectation::create([
                    'voiture_id'  => $voitureId,
                    'mission_id'  => $missionId,
                    'employee_id' => $employeeId,
                    'cree_par'    => $creatorId,
                    'statut'      => $request->input('statut', 'en_attente'),
                    'date_debut'  => $dateDebut,
                    'date_fin'    => $dateFin,
                ]);

                $affectation->load(['voiture', 'mission', 'employee']);

                return response()->json([
                    'succes'      => true,
                    'message'     => 'Demande transmise avec succès !',
                    'affectation' => $affectation
                ], 201);
            });

        } catch (\Throwable $e) {
            Log::error('Erreur AffectationController@store: ' . $e->getMessage());

            return response()->json([
                'succes'  => false,
                'message' => "Échec de l'enregistrement de la demande. Réessayez dans un instant.",
            ], 500);
        }
    }

    public function show(Request $request, $id): JsonResponse
    {
        $affectation = Affectation::with(['voiture', 'mission', 'employee'])->find($id);

        if (!$affectation) {
            return response()->json(['succes' => false, 'message' => 'Affectation introuvable.'], 404);
        }

        $authUser = $request->user();
        $estProprietaire = $affectation->employee_id !== null && $affectation->employee_id === $authUser->employee?->id;

        if ($authUser->role !== 'admin' && !$estProprietaire) {
            
            return response()->json(['succes' => false, 'message' => 'Affectation introuvable.'], 404);
        }

        return response()->json(['succes' => true, 'data' => $affectation], 200);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $request->validate([
            'statut' => 'required|string|in:en_attente,active,validee,refusee,terminee,annulee',
        ]);

        try {
            $affectation = Affectation::query()->find($id);

            if (!$affectation) {
                return response()->json([
                    'succes' => false,
                    'message' => 'Affectation introuvable.'
                ], 404);
            }

            $nouveauStatut = strtolower(trim($request->input('statut')));

            if (in_array($nouveauStatut, ['active', 'validee'])) {
                $conflit = $this->affectationService->chevauchementExistant(
                    $affectation->voiture_id,
                    $affectation->date_debut,
                    $affectation->date_fin,
                    $affectation->id
                );

                if ($conflit) {
                    return response()->json([
                        'succes'  => false,
                        'message' => "Impossible de valider : ce véhicule est déjà affecté à une autre mission validée sur une période qui chevauche celle-ci.",
                    ], 409);
                }
            }

            $affectation->statut = $request->input('statut');
            $affectation->save();

            if ($affectation->voiture) {
                if (in_array($nouveauStatut, ['active', 'validee', 'en_cours'])) {
                    $affectation->voiture->update(['statut' => 'en_mission']);
                } elseif (in_array($nouveauStatut, ['refusee', 'terminee'])) {
                    $affectation->voiture->update(['statut' => 'disponible']);
                }
            }

            return response()->json([
                'succes' => true,
                'message' => 'Statut mis à jour avec succès.',
                'data' => $affectation->load(['voiture', 'mission', 'employee'])
            ], 200);

        } catch (\Throwable $e) {
            Log::error('Erreur AffectationController@update: ' . $e->getMessage());

            return response()->json([
                'succes' => false,
                'message' => "Échec de la mise à jour du statut. Réessayez dans un instant.",
            ], 500);
        }
    }

    public function destroy($id): JsonResponse
    {
        try {
            $affectation = Affectation::query()->find($id);

            if (!$affectation) {
                return response()->json(['succes' => false, 'message' => 'Affectation introuvable.'], 404);
            }

            $affectation->forcedelete();

            return response()->json(['succes' => true, 'message' => 'Affectation supprimée.'], 200);
        } catch (\Throwable $e) {
            Log::error('Erreur AffectationController@destroy: ' . $e->getMessage());

            return response()->json([
                'succes'  => false,
                'message' => "Échec de la suppression. Réessayez dans un instant.",
            ], 500);
        }
    }
}