<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Voiture extends Model
{
    protected $primaryKey = 'id';

    protected $fillable = [
        'immatriculation',
        'marque',
        'modele',
        'kilometrage',
        'statut',
        'capacite',
        'categorie',
        'image'
    ];

    // Inclut image_url même dans un dump brut du modèle (utilisé par ChatService pour vehicule_recommande)
    protected $appends = ['image_url'];

    public function affectations()
    {
        return $this->hasMany(Affectation::class, 'voiture_id', 'id');
    }

    protected function imageUrl(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->image ? Storage::disk('public')->url($this->image) : null,
        );
    }
}
