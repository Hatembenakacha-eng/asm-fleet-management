<?php

namespace App\Services;

use App\Models\Affectation;
use App\Models\Mission;
use App\Models\Voiture;

class AffectationService
{
    public function verifierDisponibilite(Voiture $voiture, Mission $mission,string $dateDebut, string $dateFin): ? string
    {
        if(in_array($voiture->statut, ['en_maintenance', 'hors_service'])) {
            return "Le véhicule est actuellement {$voiture->statut} et ne peut pas être affecté.";
        }

        $chevauchement= Affectation::where('voiture_id', $voiture->id)->where('statut', 'active')->where('date_debut', '<=', $dateFin)->where(function ($query) use ($dateDebut){
            $query->whereNull('date_fin')->orwhere('date_fin', '>=', $dateDebut);
        })->exists();
        if($chevauchement) {
            return "Le véhicule n'est pas disponible pour l'affectation pendant la période choisie.";
        }

        if($mission->type_vehicule_requis && $voiture->categorie !== $mission->type_vehicule_requis) {
            return "Le type de véhicule ({$voiture->categorie}) ne correspond pas au besoin de la mission ({$mission->type_vehicule_requis}).";
        }

        if(($mission->capacite_minimale && $voiture->capacite < $mission->capacite_minimale)) {
            return "La capacité du véhicule ({$voiture->capacite}) est insuffisante pour cette mission (minimum requis : {$mission->capacite_minimale}).";
        }

        return null;

    }

    public function voituresCandidates(Mission $mission)
    {
        $query = Voiture::where('statut', 'disponible');

        if($mission->capacite_minimale) {
            $query->where('capacite', '>=', $mission->capacite_minimale);
        }


        if($mission->type_vehicule_requis) {
            $query->where('categorie', $mission->type_vehicule_requis);
        }

        return $query->get()->filter(function ( Voiture $voiture) use ($mission) {
            return $this->verifierDisponibilite($voiture, $mission, $mission->date_debut, $mission->date_fin) === null;
        })->values();
    }
}
