<?php

namespace App\Http\Controllers;

use App\Http\Resources\AffectationResource;
use App\Models\Affectation;
use App\Models\Mission;
use App\Models\Voiture;
use App\Services\AffectationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AffectationController extends Controller
{
    protected AffectationService $affectationService;

    public function __construct(AffectationService $affectationService)
    {
        $this->affectationService = $affectationService;
    }

    public function index()
    {
        return AffectationResource::collection(
            Affectation::with([
                'voiture',
                'mission',
                'employee'
            ])->get()
        );
    }

    public function show(Affectation $affectation)
    {
        return new AffectationResource(
            $affectation->load([
                'voiture',
                'mission',
                'employee'
            ])
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'voiture_id'  => 'required|exists:voitures,id',
            'mission_id'  => 'required|exists:missions,id',
            'employee_id' => 'required|exists:employees,id',
            'date_depart'  => 'required|date',
            'date_retour'    => 'required|date|after_or_equal:date_depart',
        ]);

        $voiture = Voiture::findOrFail($validated['voiture_id']);
        $mission = Mission::findOrFail($validated['mission_id']);

        $erreur = $this->affectationService->verifierDisponibilite(
            $voiture,
            $mission,
            $validated['date_depart'],
            $validated['date_retour']
        );

        if ($erreur) {
            return response()->json([
                'message' => $erreur
            ],422);
        }

        $affectation = DB::transaction(function() use ($validated,$voiture){

            $affectation = Affectation::create([
                ...$validated,
                'cree_par'=>Auth::id()
            ]);

            $voiture->update([
                'statut'=>'en_mission'
            ]);

            return $affectation;
        });

        return new AffectationResource(
            $affectation->load([
                'voiture',
                'mission',
                'employee'
            ])
        );
    }

public function update(Request $request, Affectation $affectation)
{
    $validated = $request->validate([
        'voiture_id'  => 'required|exists:voitures,id',
        'mission_id'  => 'required|exists:missions,id',
        'employee_id' => 'required|exists:employees,id',
        'date_depart'  => 'required|date',
        'date_retour'    => 'required|date|after_or_equal:date_depart',
    ]);


    DB::transaction(function () use ($validated, $affectation) {


        if ($affectation->voiture_id != $validated['voiture_id']) {



            $ancienneVoiture = Voiture::findOrFail(
                $affectation->voiture_id
            );


            $ancienneVoiture->update([
                'statut' => 'disponible'
            ]);



            // Nouvelle voiture
            $nouvelleVoiture = Voiture::findOrFail(
                $validated['voiture_id']
            );


            $nouvelleVoiture->update([
                'statut' => 'en_mission'
            ]);
        }



        $affectation->update($validated);

    });


    return new AffectationResource(
        $affectation->fresh()->load([
            'voiture',
            'mission',
            'employee'
        ])
    );
}

public function destroy(Affectation $affectation)
{
    DB::transaction(function () use ($affectation) {

        $voiture = $affectation->voiture;

        if ($voiture) {
            $voiture->update([
                'statut' => 'disponible'
            ]);
        }


        Affectation::destroy($affectation->id);

    });


    return response()->json([
        'message' => 'Affectation supprimée.'
    ]);
}

}
