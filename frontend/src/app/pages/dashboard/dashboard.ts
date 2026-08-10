import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VoitureService } from '../../services/voiture';
import { MissionService } from '../../services/mission';
import { AffectationService } from '../../services/affectation';
import { EmployeeService } from '../../services/employee';
import { Voiture } from '../../models/voiture';
import { Mission } from '../../models/mission';
import { Affectation } from '../../models/affectation';
import { Employee } from '../../models/employee';

interface JourBarre { label: string; count: number; pct: number; futur: boolean; }

@Component({ selector: 'app-dashboard', standalone: true, imports: [RouterLink, CommonModule], templateUrl: './dashboard.html', styleUrl: './dashboard.css' })
export class Dashboard implements OnInit {
  private voitureService = inject(VoitureService);
  private missionService = inject(MissionService);
  private affectationService = inject(AffectationService);
  private employeeService = inject(EmployeeService);
  private cdr = inject(ChangeDetectorRef);

  voitures: Voiture[] = [];
  missions: Mission[] = [];
  affectations: Affectation[] = [];
  employees: Employee[] = [];

  semaine: JourBarre[] = [];

  ngOnInit() {
    this.voitureService.getAll().subscribe(res => {
      this.voitures = res.data;
      this.cdr.detectChanges();
    });
    this.missionService.getAll().subscribe(res => {
      this.missions = res.data;
      this.cdr.detectChanges();
    });
    this.affectationService.getAll().subscribe(res => {
      this.affectations = res.data;
      this.calculerSemaine();
      this.cdr.detectChanges();
    });
    this.employeeService.getAll().subscribe(res => {
      this.employees = res.data;
      this.cdr.detectChanges();
    });
  }

  // --- KPI ---
  get dispo() { return this.voitures.filter(v => v.statut === 'disponible').length; }
  get enMission() { return this.voitures.filter(v => v.statut === 'en_mission').length; }
  get enMaintenance() { return this.voitures.filter(v => v.statut !== 'disponible' && v.statut !== 'en_mission').length; }
  get tauxDispo() { return this.voitures.length ? Math.round((this.dispo / this.voitures.length) * 100) : 0; }

  get missionsActives() {
    const today = new Date().toISOString().slice(0, 10);
    return this.missions.filter(m => m.date_depart <= today && m.date_retour >= today).length;
  }

  get demandesEnAttente() {
    return this.affectations.filter(a => String(a.statut).toLowerCase().includes('attente')).length;
  }

  // --- Jauge de disponibilité façon compte-tours ---
  private readonly GAUGE_ARC = Math.PI * 50; // demi-circonférence rayon 50

  get gaugeRotation(): number {
    return (this.tauxDispo / 100) * 180;
  }

  get gaugeDashArray(): string {
    const filled = (this.tauxDispo / 100) * this.GAUGE_ARC;
    return `${filled} ${this.GAUGE_ARC}`;
  }

  get gaugeTrackDashArray(): string {
    return `${this.GAUGE_ARC} ${this.GAUGE_ARC}`;
  }

  // --- Répartition du parc (donut) ---
  get donutSegments() {
    const total = this.voitures.length || 1;
    const d = (this.dispo / total) * 100;
    const m = (this.enMission / total) * 100;
    const mt = (this.enMaintenance / total) * 100;
    return [
      { color: 'var(--green)', dash: `${d} ${100 - d}`, offset: 25 },
      { color: 'var(--orange)', dash: `${m} ${100 - m}`, offset: 25 - d },
      { color: 'var(--red)', dash: `${mt} ${100 - mt}`, offset: 25 - d - m },
    ];
  }

  // --- Sorties de véhicules sur 7 jours (basé sur date_debut des affectations) ---
  private calculerSemaine() {
    const jours = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const aujourdHui = new Date();
    const derniers7: JourBarre[] = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(aujourdHui);
      d.setDate(d.getDate() - i);
      const iso = d.toISOString().slice(0, 10);

      const count = this.affectations.filter(a => a.date_debut === iso).length;
      derniers7.push({ label: jours[d.getDay()], count, pct: 0, futur: false });
    }

    const max = Math.max(...derniers7.map(j => j.count), 1);
    derniers7.forEach(j => j.pct = Math.max(8, Math.round((j.count / max) * 100)));

    this.semaine = derniers7;
  }

  // --- Kilométrage relatif pour la mini-barre du tableau flotte ---
  kmPct(v: Voiture): number {
    const max = Math.max(...this.voitures.map(x => x.kilometrage || 0), 1);
    return Math.max(6, Math.round(((v.kilometrage || 0) / max) * 100));
  }

  derniereMission(voitureId: number): string {
    const liees = this.affectations
      .filter(a => a.voiture_id === voitureId || a.voiture?.id === voitureId)
      .sort((a, b) => String(b.date_debut).localeCompare(String(a.date_debut)));

    if (!liees.length) return '—';
    const derniere = liees[0];
    return derniere.mission?.destination ? `${derniere.mission.destination}, ${derniere.date_debut}` : derniere.date_debut;
  }

  dotClasse(statut: string): string {
    return statut === 'disponible' ? 'dispo' : statut === 'en_mission' ? 'mission' : 'maint';
  }

  statutLabel(statut: string): string {
    const labels: Record<string, string> = {
      disponible: 'Disponible',
      en_mission: 'En mission',
      en_maintenance: 'Maintenance',
      hors_service: 'Hors service'
    };
    return labels[statut] || statut;
  }

  badgeClasse(statut: string): string {
    return statut === 'disponible' ? 'g' : statut === 'en_mission' ? 'o' : 'r';
  }
}
