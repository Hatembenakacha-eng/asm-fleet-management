import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VoitureService } from '../../../services/voiture';
import { Voiture } from '../../../models/voiture';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-voiture-liste',
  standalone: true,
  imports: [CommonModule ,RouterLink],
  templateUrl: './voiture-liste.html' })
export class VoitureListe implements OnInit {
  private service = inject(VoitureService);
  voitures: Voiture[] = [];
  chargement = true;
  erreur = '';

  ngOnInit() { this.charger(); }
 charger() {
  this.chargement = true;

  this.service.getAll().subscribe({
    next: (res) => {
      console.log('Réponse API :', res);
      console.log('Données :', res.data);

      this.voitures = res.data;

      console.log('Voitures :', this.voitures);

      this.chargement = false;
    },
    error: (err) => {
      console.error(err);
      this.erreur = "Impossible de charger les véhicules.";
      this.chargement = false;
    }
  });
}
  supprimer(id: number) {
    if (confirm('Supprimer ce véhicule ?')) this.service.delete(id).subscribe(() => this.charger());
  }
}
