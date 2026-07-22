<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Affectation;
use App\Models\Mission;
use App\Models\Voiture;
use App\Http\Resources\AffectationResource;
use App\Services\AffectationService;
USE Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AffectationController extends Controller
{
    protected AffectationService $affectationService;

    public function __construct(AffectationService $affectationService)
    {
        $this->affectationService = $affectationService;
    }

    public function index()
    {
        $affectations = Affectation::with(['voiture', 'mission', 'employée'])->get();
        return AffectationResource::collection($affectations);
    }

    public function show(Affectation $affectation)
    {
        return new AffectationResource($affectation->load(['voiture', 'mission', 'employée']));
    }

    public function store(Request $request)
    {
        if($request->user()->role !== 'admin') {
            abort(403, 'Seul un administrateur peut créer une affectation.');

        }

        $validatedData = $request->validate([
            'voiture_id' => 'required|exists:voitures,id',
            'mission_id' => 'required|exists:missions,id',
            'employée_id' => 'required|exists:employées,id',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after_or_equal:date_debut',
            'kilometrage_debut' => 'required|integer',
        ]);

        $voiture = Voiture::findOrFail($validatedData['voiture_id']);
        $mission = Mission::findOrFail($validatedData['mission_id']);

        $erreur = $this->affectationService->verifierDisponibilite($voiture, $mission, $validatedData['date_debut'], $validatedData['date_fin'] ?? $mission->date_fin);
        if ($erreur!== null) {
            return response()->json(['message' => $erreur], 422);
        }

        $affectation = DB::transaction(function () use ($validatedData, $voiture, $mission) {
            $nouvelleAffectation =Affectation::create([
                ...$validatedData,
                'cree_par' => auth()->id(),
                'statut' => 'active',
            ]);

            $voiture->update(['status' => 'en_mission']);

            return $nouvelleAffectation;
        });
        Log::info('Affectation créée', [
                    'affectation_id' => $affectation->id,
                    'voiture_id' => $voiture->id,
                    'mission_id' => $mission->id,
                    'cree_par' => auth()->id(),
       ]);

        return ( new AffectationResource($affectation->load(['voiture', 'mission', 'employée'])))->response()->setStatusCode(201);

    }

    public function liberer(Request $request, Affectation $affectation)
    {
        if($request->user()->role !== 'admin') {
            abort(403, 'Seul un administrateur peut libérer une affectation.');
        }

        if($affectation->statut !== 'active') {
            return response()->json(['message' => 'Cette affectation n\'est pas active.'], 422);
        }

        $validatedData = $request->validate([
            'kilometrage_fin' => 'nullable|integer|min:0',

        ]);

        DB::transaction(function () use ($affectation, $validatedData) {
            $affectation->update([
                'statut' => 'terminee',
                'date_fin' => now(),
                'kilometrage_fin' => $validatedData['kilometrage_fin'] ?? null,
            ]);

            $affectation->voiture->update(['status' => 'disponible']);
        });

        Log::info('Affectation libérée', [
                'affectation_id' => $affectation->id,
                'voiture_id' => $affectation->voiture_id,
                'kilometrage_retour' => $validatedData['kilometrage_retour'] ?? null,
      ]);

        return new AffectationResource($affectation->fresh()->load(['voiture', 'mission', 'employée']));
        }

}
