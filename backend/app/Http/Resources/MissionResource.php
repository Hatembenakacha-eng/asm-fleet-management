<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MissionResource extends JsonResource
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
            'date_depart' => $this->date_depart,
            'date_retour' => $this->date_retour,
            'capacite_minimale' => $this->capacite_minimale,
            'type_vehicule' => $this->type_vehicule,
            'destination' => $this->destination,
        ];
    }
}
