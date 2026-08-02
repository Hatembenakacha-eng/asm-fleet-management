import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AffectationService } from '../../../services/affectation';
import { Affectation } from '../../../models/affectation';

@Component({
  selector: 'app-affectation-liste',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './affectation-liste.html'
})
export class AffectationListe implements OnInit {
  private service = inject(AffectationService);
  private cdr = inject(ChangeDetectorRef);
  affectations: Affectation[] = [];
  chargement = true;
  erreur = '';

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
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.erreur = 'Impossible de charger les affectations.';
        this.chargement = false;
        this.cdr.detectChanges();
      }
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
