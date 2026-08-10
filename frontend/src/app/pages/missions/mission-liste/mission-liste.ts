import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MissionService } from '../../../services/mission';
import { Mission } from '../../../models/mission';

@Component({ selector: 'app-mission-liste', standalone: true, imports: [RouterLink, FormsModule], templateUrl: './mission-liste.html' })
export class MissionListe implements OnInit {
  private service = inject(MissionService);
  private cdr = inject(ChangeDetectorRef);
  missions: Mission[] = [];
  chargement = true;
  erreur = '';
  recherche = '';

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

  supprimer(id: number) {
    if (confirm('Supprimer ?')) this.service.delete(id).subscribe(() => this.charger());
  }
}
