<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VoitureResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'immatriculation' => $this->immatriculation,
            'marque' => $this->marque,
            'modele' => $this->modele,
            'killometrage' => $this->killometrage,
            'status' => $this->status,
            'capacite' => $this->capacite,
            'type_carburant' => $this->type_carburant,
            'categorie' => $this->categorie,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
