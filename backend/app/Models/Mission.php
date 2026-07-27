<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Affectation;

class Mission extends Model
{
    protected $fillable = [
        'id',
        'description',
        'date_debut',
        'date_fin',
        'capacite_minimale',
        'type_vehicule',
        'destination',
        'statut'
    ];

    public function affectations()
    {
        return $this->hasMany(Affectation::class);
    }
}
