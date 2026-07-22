<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AffectationResource extends JsonResource
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
            'voiture' => new VoitureResource($this->whenLoaded('voiture')),
            'employe' => new EmployeeResource($this->whenLoaded('employe')),
            'mission' => new MissionResource($this->whenLoaded('mission')),
            'date_debut' => $this->date_debut,
            'date_fin' => $this->date_fin,
            'kilometrage_debut' => $this->kilometrage_debut,
            'kilometrage_fin' => $this->kilometrage_fin,
            'statut' => $this->statut,
        ];

    }
}
