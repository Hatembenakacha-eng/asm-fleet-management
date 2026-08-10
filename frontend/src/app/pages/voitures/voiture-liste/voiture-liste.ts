import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { VoitureService } from '../../../services/voiture';
import { Voiture } from '../../../models/voiture';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-voiture-liste',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './voiture-liste.html' })
export class VoitureListe implements OnInit {
  private service = inject(VoitureService);
  private cdr = inject(ChangeDetectorRef);
  voitures: Voiture[] = [];
  chargement = true;
  erreur = '';

  recherche = '';
  filtreStatut = '';

  ngOnInit() { this.charger(); }
 charger() {
  this.chargement = true;

  this.service.getAll().subscribe({
    next: (res) => {
      this.voitures = res.data;
      this.chargement = false;
      this.cdr.detectChanges(); // Force le rafraîchissement de la vue après la réponse HTTP
    },
    error: (err) => {
      console.error(err);
      this.erreur = "Impossible de charger les véhicules.";
      this.chargement = false;
      this.cdr.detectChanges();
    }
  });
}

  get voituresFiltrees(): Voiture[] {
    const q = this.recherche.trim().toLowerCase();
    return this.voitures.filter(v => {
      const matchTexte = !q ||
        v.immatriculation?.toLowerCase().includes(q) ||
        v.marque?.toLowerCase().includes(q) ||
        v.modele?.toLowerCase().includes(q) ||
        (v.categorie || '').toLowerCase().includes(q);
      const matchStatut = !this.filtreStatut || v.statut === this.filtreStatut;
      return matchTexte && matchStatut;
    });
  }

  supprimer(id: number) {
    if (confirm('Supprimer ce véhicule ?')) this.service.delete(id).subscribe(() => this.charger());
  }
}
