<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = [
        'nom',
        'specialite',
        'contact',
        'disponible'
    ];

    public function affectations()
    {
        return $this->hasMany(Affectation::class);
    }
}
