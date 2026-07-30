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
        ?string $dateDebut = null,
        ?string $dateFin = null
    ): ?string {

        $dateDebut = $dateDebut ?? ($mission->date_depart ? (string)$mission->date_depart : null) ?? now()->toDateString();
        $dateFin   = $dateFin   ?? ($mission->date_retour ? (string)$mission->date_retour : null) ?? $dateDebut;

        $statutVoiture = $voiture->statut ?? null;

        // 1. Vérifier le statut d'inponibilité du véhicule
        if (in_array($statutVoiture, ['en_maintenance', 'hors_service'])) {
            return "Le véhicule est actuellement {$statutVoiture} et ne peut pas être affecté.";
        }

        // 2. Vérifier les chevauchements d'affectations
        $chevauchement = Affectation::query()
            ->where('voiture_id', '=', $voiture->id)
            ->where('statut', '=', 'active')
            ->where('date_debut', '<=', $dateFin)
            ->where(function ($query) use ($dateDebut) {
                $query->whereNull('date_fin')
                      ->orWhere('date_fin', '>=', $dateDebut);
            })
            ->exists();

        if ($chevauchement) {
            return "Le véhicule n'est pas disponible pendant la période choisie.";
        }

        // 3. (Option 1) La contrainte de catégorie/type de véhicule a été désactivée
        // pour permettre d'affecter n'importe quel véhicule à la mission.

        // 4. Vérifier la capacité minimale si définie
        if (
            !empty($mission->capacite_minimale) &&
            isset($voiture->capacite) &&
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
