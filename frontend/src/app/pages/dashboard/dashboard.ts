import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VoitureService } from '../../services/voiture';
import { MissionService } from '../../services/mission';
import { AffectationService } from '../../services/affectation';
import { Voiture } from '../../models/voiture';
import { Mission } from '../../models/mission';
import { Affectation } from '../../models/affectation';

@Component({ selector: 'app-dashboard', standalone: true, imports: [RouterLink], templateUrl: './dashboard.html' })
export class Dashboard implements OnInit {
  private voitureService = inject(VoitureService);
  private missionService = inject(MissionService);
  private affectationService = inject(AffectationService);

  voitures: Voiture[] = []; missions: Mission[] = []; affectations: Affectation[] = [];

  ngOnInit() {
    this.voitureService.getAll().subscribe(res => this.voitures = res.data);
    this.missionService.getAll().subscribe(res => this.missions = res.data);
    this.affectationService.getAll().subscribe(res => this.affectations = res.data);
  }

  get dispo() { return this.voitures.filter(v => v.statut === 'disponible').length; }
  get actives() { return this.affectations.filter(a => a.statut === 'active').length; }
  get tauxDispo() { return this.voitures.length ? Math.round((this.dispo / this.voitures.length) * 100) : 0; }

  dotClasse(statut: string): string {
    return statut === 'disponible' ? 'dispo' : statut === 'en_mission' ? 'mission' : 'maint';
  }
}
