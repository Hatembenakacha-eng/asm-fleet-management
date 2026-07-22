<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Voiture extends Model
{
    protected $primaryKey = 'id_voiture';

    protected $fillable = [
        'immatriculation',
        'marque',
        'modele',
        'kilometrage',
        'statut',
        'capacite',
        'categorie'
    ];

    public function affectations()
    {
        return $this->hasMany(Affectation::class, 'voiture_id', 'id_voiture');
    }
}
