import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MissionService } from '../../../services/mission';
import { Mission } from '../../../models/mission';

@Component({ selector: 'app-mission-liste', standalone: true, imports: [FormsModule], templateUrl: './mission-liste.html' })
export class MissionListe implements OnInit {
  private service = inject(MissionService);
  private cdr = inject(ChangeDetectorRef);
  missions: Mission[] = [];
  chargement = true;
  erreur = '';
  recherche = '';

  showForm = false;
  id: number | null = null;
  destination = '';
  date_depart = '';
  date_retour = '';
  type_vehicule = '';
  capacite_minimale: number | null = null;
  erreurs: string[] = [];

  ngOnInit() { this.charger(); }
  charger() {
    this.chargement = true;
    this.service.getAll().subscribe({
      next: res => { this.missions = res.data; this.chargement = false; this.cdr.detectChanges(); },
      error: () => { this.erreur = "Impossible de charger les missions."; this.chargement = false; this.cdr.detectChanges(); }
    });
  }

  get missionsFiltrees(): Mission[] {
    const q = this.recherche.trim().toLowerCase();
    if (!q) return this.missions;
    return this.missions.filter(m =>
      m.destination?.toLowerCase().includes(q) ||
      (m.type_vehicule || '').toLowerCase().includes(q)
    );
  }

  ouvrirAjout(): void {
    this.id = null;
    this.destination = '';
    this.date_depart = '';
    this.date_retour = '';
    this.type_vehicule = '';
    this.capacite_minimale = null;
    this.erreurs = [];
    this.showForm = true;
  }

  ouvrirEdition(m: Mission): void {
    this.id = m.id;
    this.destination = m.destination;
    this.date_depart = m.date_depart;
    this.date_retour = m.date_retour;
    this.type_vehicule = m.type_vehicule || '';
    this.capacite_minimale = m.capacite_minimale ?? null;
    this.erreurs = [];
    this.showForm = true;
  }

  fermerForm(): void {
    this.showForm = false;
  }

  soumettreForm(): void {
    this.erreurs = [];
    const payload = {
      destination: this.destination,
      date_depart: this.date_depart,
      date_retour: this.date_retour,
      type_vehicule: this.type_vehicule,
      capacite_minimale: this.capacite_minimale ? Number(this.capacite_minimale) : null
    };
    const request = this.id ? this.service.update(this.id, payload) : this.service.create(payload);
    request.subscribe({
      next: () => { this.showForm = false; this.charger(); },
      error: (err) => {
        const errorData = err.error?.erreurs || err.error?.errors;
        this.erreurs = errorData ? Object.values(errorData).flat() as string[] : [err.error?.message || 'Une erreur est survenue.'];
        this.cdr.detectChanges();
      }
    });
  }

  supprimer(id: number) {
    if (confirm('Supprimer ?')) this.service.delete(id).subscribe(() => this.charger());
  }
}
