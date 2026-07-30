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

        'voiture_id' => $this->voiture_id,
        'mission_id' => $this->mission_id,
        'employee_id' => $this->employee_id,

        'date_debut' => $this->date_debut,
        'date_retour' => $this->date_retour,

        'voiture' => new VoitureResource($this->whenLoaded('voiture')),
        'mission' => new MissionResource($this->whenLoaded('mission')),
        'employee' => new EmployeeResource($this->whenLoaded('employee')),
    ];
}
}
