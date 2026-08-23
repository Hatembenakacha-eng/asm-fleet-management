<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Voiture;
use App\Http\Resources\VoitureResource;

class VoitureController extends Controller
{

    public function index()
    {
        $query = Voiture::query();

        if (request()->has('statut')) {
            $query->where('statut', request('statut'));
        }

        if (request()->has('categorie')) {
            $query->where('categorie', request('categorie'));
        }

        if (request()->has('capacite')) {
            $query->where('capacite', '>=', request()->input('capacite'));
        }

        if (request()->has('kilometrage')) {
            $query->where('kilometrage', request('kilometrage'));
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

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'immatriculation' => 'required|string|unique:voitures,immatriculation',
            'marque' => 'required|string',
            'modele' => 'required|string',
            'kilometrage' => 'required|integer',
            'statut' => 'required|in:disponible,en_mission,en_maintenance,hors_service',
            'capacite' => 'nullable|integer',
            'categorie' => 'nullable|string',
        ]);

        $validatedData = $this->normalizeValidated($validatedData, ['immatriculation', 'marque', 'modele','categorie']);

        $voiture = Voiture::create($validatedData);

        return new VoitureResource($voiture);

    }

    public function show(Voiture $voiture)
    {
        return new VoitureResource($voiture);
    }

    public function edit(Voiture $voiture)
    {
        //
    }

    public function update(Request $request, Voiture $voiture)
    {
        $validatedData = $request->validate([
            'immatriculation' => 'sometimes|required|string|unique:voitures,immatriculation,' . $voiture->id,
            'marque' => 'sometimes|required|string',
            'modele' => 'sometimes|required|string',
            'kilometrage' => 'sometimes|required|integer',
            'statut' => 'sometimes|required|in:disponible,en_mission,en_maintenance,hors_service',
            'capacite' => 'nullable|integer',
            'categorie' => 'nullable|string',
        ]);

        $validatedData = $this->normalizeValidated($validatedData, ['immatriculation', 'marque', 'modele','categorie']);

        $voiture->update($validatedData);

        return new VoitureResource($voiture);

    }


    public function destroy(Voiture $voiture)
    {

        $voiture->forceDelete();

        return response()->json(['message' => 'Voiture supprimee avec succès']);
    }


    public function uploadImage(Request $request, Voiture $voiture)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($voiture->image) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($voiture->image);
        }

        $chemin = $request->file('image')->store('voitures', 'public');
        $voiture->update(['image' => $chemin]);

        return new VoitureResource($voiture->fresh());
    }
}
