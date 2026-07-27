import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AffectationService } from '../../../services/affectation';
import { Affectation } from '../../../models/affectation';

@Component({ selector: 'app-affectation-liste', standalone: true, imports: [RouterLink], templateUrl: './affectation-liste.html' })
export class AffectationListe implements OnInit {
  private service = inject(AffectationService);
  affectations: Affectation[] = [];
  chargement = true;
  erreur = '';

  ngOnInit() { this.charger(); }
  charger() {
    this.chargement = true;
    this.service.getAll().subscribe({
      next: res => { this.affectations = res.data; this.chargement = false; },
      error: () => { this.erreur = "Impossible de charger les affectations."; this.chargement = false; }
    });
  }
  liberer(id: number) {
    const km = prompt('Kilométrage retour (optionnel) :');
    this.service.liberer(id, km ? +km : undefined).subscribe(() => this.charger());
  }
}
