<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Voiture;
use App\Http\Resources\VoitureResource;

class VoitureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Voiture::query();

        if (request()->has('status')) {
            $query->where('status', request('status'));
        }

        if (request()->has('categorie')) {
            $query->where('categorie', request('categorie'));
        }

        if (request()->has('capacite_minimale')) {
            $query->where('capacite_minimale', '>=', request()->input('capacite_minimale'));
        }

        $voitures = $query->get();

        return VoitureResource::collection($voitures);
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
            'immatriculation' => 'required|string|unique:voitures,immatriculation',
            'marque' => 'required|string',
            'modele' => 'required|string',
            'killometrage' => 'required|integer',
            'status' => 'required|in:disponible,en_mission,en_maintenance,hors_service',
            'capacite' => 'nullable|integer',
            'type_carburant' => 'nullable|string',
            'categorie' => 'nullable|string',
        ]);

        $voiture = Voiture::create($validatedData);

        return new VoitureResource($voiture);

    }

    /**
     * Display the specified resource.
     */
    public function show(Voiture $voiture)
    {
        return new VoitureResource($voiture);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Voiture $voiture)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Voiture $voiture)
    {
        $validatedData = $request->validate([
            'immatriculation' => 'sometimes|required|string|unique:voitures,immatriculation,' . $voiture->id,
            'marque' => 'sometimes|required|string',
            'modele' => 'sometimes|required|string',
            'killometrage' => 'sometimes|required|integer',
            'status' => 'sometimes|required|in:disponible,en_mission,en_maintenance,hors_service',
            'capacite' => 'nullable|integer',
            'type_carburant' => 'nullable|string',
            'categorie' => 'nullable|string',
        ]);

        $voiture->update($validatedData);

        return new VoitureResource($voiture);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Voiture $voiture)
    {
        $voiture->delete();

        return response()->json(['message' => 'Voiture supprimée avec succès']);
    }
}
