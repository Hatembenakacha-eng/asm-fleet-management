<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Affectation;

class Mission extends Model
{
    protected $fillable = [
        'destination',
        'date_depart',
        'date_retour',
        'type_vehicule',
        'capacite_minimale',
    ];
    public function affectations()
    {
        return $this->hasMany(Affectation::class);
    }
}
