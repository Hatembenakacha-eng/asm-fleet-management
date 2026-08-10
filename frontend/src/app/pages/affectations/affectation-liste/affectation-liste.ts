import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AffectationService } from '../../../services/affectation';
import { Affectation } from '../../../models/affectation';

@Component({
  selector: 'app-affectation-liste',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './affectation-liste.html'
})
export class AffectationListe implements OnInit {

  private service = inject(AffectationService);
  private cdr = inject(ChangeDetectorRef);

  affectations: Affectation[] = [];

  chargement = true;
  erreur = '';
  recherche = '';
  filtreStatut = '';

  ngOnInit(): void {
    this.charger();
  }

  charger(): void {
    this.chargement = true;
    this.erreur = '';

    this.service.getAll().subscribe({
      next: (res) => {
        this.affectations = res.data;
        this.chargement = false;
        this.cdr.detectChanges(); // Force le rafraîchissement de la vue après la réponse HTTP
      },
      error: (err) => {
        console.error(err);
        this.erreur = 'Impossible de charger les affectations.';
        this.chargement = false;
        this.cdr.detectChanges();
      }
    });
  }

  get affectationsFiltrees(): Affectation[] {
    const q = this.recherche.trim().toLowerCase();
    return this.affectations.filter(a => {
      const matchTexte = !q ||
        (a.voiture?.immatriculation || '').toLowerCase().includes(q) ||
        (a.voiture?.marque || '').toLowerCase().includes(q) ||
        (a.mission?.destination || '').toLowerCase().includes(q) ||
        (a.employee?.nom || '').toLowerCase().includes(q);
      const matchStatut = !this.filtreStatut || a.statut === this.filtreStatut;
      return matchTexte && matchStatut;
    });
  }

  supprimer(id: number) {
    if (confirm('Voulez-vous supprimer cette affectation ?')) {
      this.service.delete(id).subscribe({
        next: () => this.charger(),
        error: (err) => {
          this.erreur = err.error?.message || "Erreur lors de la suppression";
          this.cdr.detectChanges();
        }
      });
    }
  }

}
