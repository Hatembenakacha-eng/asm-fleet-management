<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Affectation;

class Employee extends Model
{
    protected $fillable = [
        'id',
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
