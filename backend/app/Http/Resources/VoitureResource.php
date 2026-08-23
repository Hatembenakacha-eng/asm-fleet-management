<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VoitureResource extends JsonResource
{
    public function __construct($resource)
    {
        parent::__construct($resource);
    }

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
            'kilometrage' => $this->kilometrage,
            'statut' => $this->statut,
            'capacite' => $this->capacite,
            'categorie' => $this->categorie,
            'image_url' => $this->image_url,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
