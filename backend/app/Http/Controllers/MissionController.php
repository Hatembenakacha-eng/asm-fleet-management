<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mission;
use App\Http\Resources\MissionResource;
class MissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Mission::query();

        if ($request->filled('statut')) {
            $query->where('statut', '=', $request->query('statut'));
        }

        $missions = $query->get(['*']);

        return MissionResource::collection($missions);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'description' => 'required|string',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after_or_equal:date_debut',
            'capacite' => 'required|integer',
            'type_vehicule' => 'required|string',
            'destination' => 'required|string',
        ]);

        $mission = Mission::create($validatedData);

        return (new MissionResource($mission))->response()->setStatusCode(201);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Mission $mission)
    {
        return new MissionResource($mission->load('affectations.voiture'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Mission $mission)
    {
        $validatedData = $request->validate([
            'description' => 'sometimes|required|string',
            'date_debut' => 'sometimes|required|date',
            'date_fin' => 'sometimes|required|date|after_or_equal:date_debut',
            'capacite' => 'sometimes|required|integer',
            'type_vehicule' => 'sometimes|required|string',
            'destination' => 'sometimes|required|string',
            'statut' => 'sometimes|required|in:en_attente,en_cours,terminee,annulee',
        ]);

        $mission->update($validatedData);

        return new MissionResource($mission);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Mission $mission)
    {
        $mission->forceDelete();

        return response()->json(['message' => 'Mission supprimee avec succès']);
    }

}
