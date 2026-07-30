<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mission;
use App\Http\Resources\MissionResource;

class MissionController extends Controller
{
    public function index(Request $request)
    {
        return MissionResource::collection(Mission::all());
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'destination'       => 'required|string',
            'date_depart'       => 'required|date',
            'date_retour'       => 'required|date',
            'type_vehicule'     => 'nullable|string',
            'capacite_minimale' => 'nullable|integer',
        ]);

        // On instancie uniquement les colonnes réelles de la table
        $mission = new Mission();
        $mission->destination       = $validatedData['destination'];
        $mission->date_depart       = $validatedData['date_depart'];
        $mission->date_retour       = $validatedData['date_retour'];
        $mission->type_vehicule     = $validatedData['type_vehicule'] ?? null;
        $mission->capacite_minimale = $validatedData['capacite_minimale'] ?? null;

        $mission->save();

        return (new MissionResource($mission))->response()->setStatusCode(201);
    }

    public function show(Request $request, Mission $mission)
    {
        return new MissionResource($mission->load('affectations.voiture'));
    }

    public function update(Request $request, Mission $mission)
    {
        $validatedData = $request->validate([
            'destination'       => 'sometimes|required|string',
            'date_depart'       => 'sometimes|required|date',
            'date_retour'       => 'sometimes|required|date',
            'type_vehicule'     => 'nullable|string',
            'capacite_minimale' => 'nullable|integer',
        ]);

        $mission->update($validatedData);

        return new MissionResource($mission);
    }

    public function destroy(Mission $mission)
    {
        $mission->forceDelete();
        return response()->json(['message' => 'Mission supprimée avec succès']);
    }
}
