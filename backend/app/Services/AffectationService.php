<?php

namespace App\Services;

use App\Models\Affectation;
use App\Models\Mission;
use App\Models\Voiture;

class AffectationService
{
    public function verifierDisponibilite(
        Voiture $voiture,
        Mission $mission,
        ?string $dateDebut=null,
        ?string $dateFin=null
    ): ?string {

        $dateDebut = $dateDebut ?? ($mission->date_depart ? (string)$mission->date_depart : null) ?? now()->toDateString();
        $dateFin   = $dateFin   ?? ($mission->date_retour ? (string)$mission->date_retour : null) ?? $dateDebut;


        $statutVoiture = isset($voiture->statut) ? $voiture->statut : null;

        if (in_array($statutVoiture, ['en_maintenance', 'hors_service'])) {
            return "Le véhicule est actuellement {$statutVoiture} et ne peut pas être affecté.";
        }

        // Vérifier les affectations qui se chevauchent
        $chevauchement = Affectation::query()
            ->where('voiture_id', '=', $voiture->id)
            ->where('statut', '=', 'active')
            ->where('date_depart', '<=', $dateFin)
            ->where(function ($query) use ($dateDebut) {
                $query->whereNull('date_retour')
                      ->orWhere('date_retour', '>=', $dateDebut);
            })
            ->exists();

        if ($chevauchement) {
            return "Le véhicule n'est pas disponible pendant la période choisie.";
        }

        // Vérifier la catégorie
        if (
            !empty($mission->type_vehicule) &&
            $voiture->categorie !== $mission->type_vehicule
        ) {
            return "Le type de véhicule ({$voiture->categorie}) ne correspond pas au besoin de la mission ({$mission->type_vehicule}).";
        }

        // Vérifier la capacité
        if (
            !empty($mission->capacite_minimale) &&
            $voiture->capacite < $mission->capacite_minimale
        ) {
            return "La capacité du véhicule ({$voiture->capacite}) est insuffisante pour cette mission (minimum requis : {$mission->capacite_minimale}).";
        }

        return null;
    }

    public function voituresCandidates(Mission $mission)
    {
        $query = Voiture::query();
        $query->where('statut', '=', 'disponible');

        if (!empty($mission->capacite_minimale)) {
            $query->where('capacite', '>=', $mission->capacite_minimale);
        }

        if (!empty($mission->type_vehicule)) {
            $query->where('categorie', '=', $mission->type_vehicule);
        }

        return $query->get()
            ->filter(function (Voiture $voiture) use ($mission) {
                return $this->verifierDisponibilite(
                    $voiture,
                    $mission,
                    $mission->date_depart,
                    $mission->date_retour
                ) === null;
            })
            ->values();
    }
}
