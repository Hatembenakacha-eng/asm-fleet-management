import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MissionService } from '../../../services/mission';
import { Mission } from '../../../models/mission';

@Component({ selector: 'app-mission-liste', standalone: true, imports: [RouterLink], templateUrl: './mission-liste.html' })
export class MissionListe implements OnInit {
  private service = inject(MissionService);
  private cdr = inject(ChangeDetectorRef);
  missions: Mission[] = [];
  chargement = true;
  erreur = '';

  ngOnInit() { this.charger(); }
  charger() {
    this.chargement = true;
    this.service.getAll().subscribe({
      next: res => { this.missions = res.data; this.chargement = false; this.cdr.detectChanges(); },
      error: () => { this.erreur = "Impossible de charger les missions."; this.chargement = false; this.cdr.detectChanges(); }
    });
  }
  supprimer(id: number) {
    if (confirm('Supprimer ?')) this.service.delete(id).subscribe(() => this.charger());
  }
}
