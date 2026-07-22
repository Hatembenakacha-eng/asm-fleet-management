<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Affectation extends Model
{
    protected $fillable = [
        'voiture_id',
        'mission_id',
        'employee_id',
        'cree_par',
        'date_debut',
        'date_fin',
        'kilometrage_debut',
        'kilometrage_fin',
        'statut'
    ];

    public function voiture()
    {
        return $this->belongsTo(Voiture::class, 'voiture_id', 'id_voiture');
    }

    public function mission()
    {
        return $this->belongsTo(Mission::class);
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'cree_par');
    }
}
