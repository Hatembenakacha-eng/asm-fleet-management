<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Voiture extends Model
{
    protected $fillable = [
        'immatriculation',
        'marque',
        'modele',
        'killometrage',
        'status',
        'capacite'
    ];

    public function affectations()
    {
        return $this->hasMany(Affectation::class);
    }
}
