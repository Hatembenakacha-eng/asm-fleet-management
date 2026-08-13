import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VoitureService } from '../../../services/voiture';
import { Voiture } from '../../../models/voiture';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-voiture-liste',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './voiture-liste.html' })
export class VoitureListe implements OnInit {
  private service = inject(VoitureService);
  private cdr = inject(ChangeDetectorRef);
  voitures: Voiture[] = [];
  chargement = true;
  erreur = '';

  recherche = '';
  filtreStatut = '';

  showForm = false;
  id: number | null = null;
  immatriculation = '';
  marque = '';
  modele = '';
  kilometrage = 0;
  statut: Voiture['statut'] = 'disponible';
  capacite: number | null = null;
  categorie = '';

  ngOnInit() { this.charger(); }
  charger() {
    this.chargement = true;

    this.service.getAll().subscribe({
      next: (res) => {
        this.voitures = res.data;
        this.chargement = false;
        this.cdr.detectChanges();
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

  ouvrirAjout(): void {
    this.id = null;
    this.immatriculation = '';
    this.marque = '';
    this.modele = '';
    this.kilometrage = 0;
    this.statut = 'disponible';
    this.capacite = null;
    this.categorie = '';
    this.showForm = true;
  }

  ouvrirEdition(v: Voiture): void {
    this.id = v.id;
    this.immatriculation = v.immatriculation;
    this.marque = v.marque;
    this.modele = v.modele;
    this.kilometrage = v.kilometrage;
    this.statut = v.statut;
    this.capacite = v.capacite;
    this.categorie = v.categorie ?? '';
    this.showForm = true;
  }

  fermerForm(): void {
    this.showForm = false;
  }

  soumettreForm(): void {
    const payload = {
      immatriculation: this.immatriculation, marque: this.marque, modele: this.modele,
      kilometrage: this.kilometrage, statut: this.statut, capacite: this.capacite, categorie: this.categorie
    };
    const obs = this.id ? this.service.update(this.id, payload) : this.service.create(payload);
    obs.subscribe({
      next: () => { this.showForm = false; this.charger(); },
      error: (err) => { console.error(err); this.cdr.detectChanges(); }
    });
  }

  supprimer(id: number) {
    if (confirm('Supprimer ce véhicule ?')) this.service.delete(id).subscribe(() => this.charger());
  }
}
