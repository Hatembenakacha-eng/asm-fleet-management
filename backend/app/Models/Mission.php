<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Affectation;

class Mission extends Model
{
    protected $fillable = [
        'id',
        'destination',
        'date_depart',
        'date_retour',
        'type_vihicule',
        'capacite_minimale',
        'statut'
    ];

    public function affectations()
    {
        return $this->hasMany(Affectation::class);
    }
}
