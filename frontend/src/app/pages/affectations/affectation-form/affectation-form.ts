import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AffectationService } from '../../../services/affectation';
import { VoitureService } from '../../../services/voiture';
import { MissionService } from '../../../services/mission';
import { Voiture } from '../../../models/voiture';
import { Mission } from '../../../models/mission';

@Component({ selector: 'app-affectation-form', standalone: true, imports: [FormsModule], templateUrl: './affectation-form.html' })
export class AffectationForm implements OnInit {
  private affectationService = inject(AffectationService);
  private voitureService = inject(VoitureService);
  private missionService = inject(MissionService);
  private router = inject(Router);

  voitures: Voiture[] = []; missions: Mission[] = [];
  voiture_id!: number; mission_id!: number; date_debut = ''; date_fin = '';
  erreur = '';

  ngOnInit() {
    this.voitureService.getAll('disponible').subscribe(res => this.voitures = res.data);
    this.missionService.getAll().subscribe(res => this.missions = res.data);
  }

  onSubmit() {
    this.affectationService.create({ voiture_id: this.voiture_id, mission_id: this.mission_id, date_debut: this.date_debut, date_fin: this.date_fin })
      .subscribe({
        next: () => this.router.navigate(['/affectations']),
        error: (err) => this.erreur = err.error?.message || 'Erreur.'
      });
  }
}
