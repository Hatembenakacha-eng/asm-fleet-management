<?php

namespace App\Http\Controllers;

use App\Models\Affectation;
use App\Models\Mission;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;

class AffectationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Affectation::with(['voiture', 'mission', 'employee']);

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
            return response()->json([
                'succes'  => false,
                'message' => 'Erreur: ' . $e->getMessage()
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
            'voiture_id'  => 'required|integer',
            'mission_id'  => 'nullable',
            'destination' => 'nullable|string',
            'date_debut'  => 'nullable|string',
            'date_fin'    => 'nullable|string',
            'statut'      => 'nullable|string',
        ]);

        try {
            return DB::transaction(function () use ($request) {
                $authUser = Auth::user() ?? $request->user();

                $employeeId = null;
                if ($authUser) {
                    if (!empty($authUser->employee_id)) {
                        $employeeId = $authUser->employee_id;
                    } elseif (method_exists($authUser, 'employee') && $authUser->employee) {
                        $employeeId = $authUser->employee->id;
                    } else {
                        $employee = Employee::query()->find($authUser->id);
                        $employeeId = $employee ? $employee->id : null;
                    }
                }

                if (!$employeeId) {
                    $firstEmployee = Employee::query()->first();
                    $employeeId = $firstEmployee ? $firstEmployee->id : 1;
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
                        'created_by'  => $creatorId,
                    ]);

                    $missionId = $nouvelleMission->id;
                }

                $affectation = Affectation::create([
                    'voiture_id'  => $request->input('voiture_id'),
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
                'message' => 'Erreur serveur : ' . $e->getMessage()
            ], 500);
        }
    }

    public function show($id): JsonResponse
    {
        $affectation = Affectation::with(['voiture', 'mission', 'employee'])->find($id);

        if (!$affectation) {
            return response()->json(['succes' => false, 'message' => 'Affectation introuvable.'], 404);
        }

        return response()->json(['succes' => true, 'data' => $affectation], 200);
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $affectation = Affectation::query()->find($id);

            if (!$affectation) {
                return response()->json([
                    'succes' => false,
                    'message' => 'Affectation introuvable.'
                ], 404);
            }

            $request->validate([
                'statut' => 'required|string',
            ]);

            $affectation->statut = $request->input('statut');
            $affectation->save();

            if ($affectation->voiture) {
                if (in_array(strtolower($affectation->statut), ['active', 'validee', 'en_cours'])) {
                    $affectation->voiture->update(['statut' => 'en_mission']);
                } elseif (in_array(strtolower($affectation->statut), ['refusee', 'terminee'])) {
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
                'message' => 'Erreur lors de la mise à jour : ' . $e->getMessage()
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
            return response()->json(['succes' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
