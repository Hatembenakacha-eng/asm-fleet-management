import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AffectationService } from '../../../services/affectation';
import { VoitureService } from '../../../services/voiture';
import { MissionService } from '../../../services/mission';
import { EmployeeService } from '../../../services/employee';
import { Affectation } from '../../../models/affectation';
import { Voiture } from '../../../models/voiture';
import { Mission } from '../../../models/mission';
import { Employee } from '../../../models/employee';

@Component({
  selector: 'app-affectation-liste',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './affectation-liste.html'
})
export class AffectationListe implements OnInit {

  private service = inject(AffectationService);
  private voitureService = inject(VoitureService);
  private missionService = inject(MissionService);
  private employeeService = inject(EmployeeService);
  private cdr = inject(ChangeDetectorRef);

  affectations: Affectation[] = [];
  voitures: Voiture[] = [];
  missions: Mission[] = [];
  employees: Employee[] = [];

  chargement = true;
  erreur = '';
  recherche = '';
  filtreStatut = '';
  showForm = false;
  voiture_id!: number;
  mission_id!: number;
  employee_id!: number;
  date_debut = '';
  date_fin = '';
  erreurForm = '';

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

  get affectationsFiltrees(): Affectation[] {
    const q = this.recherche.trim().toLowerCase();
    return this.affectations.filter(a => {
      const matchTexte = !q ||
        (a.voiture?.immatriculation || '').toLowerCase().includes(q) ||
        (a.voiture?.marque || '').toLowerCase().includes(q) ||
        (a.mission?.destination || '').toLowerCase().includes(q) ||
        (a.employee?.nom || '').toLowerCase().includes(q);
      const matchStatut = !this.filtreStatut || a.statut === this.filtreStatut;
      return matchTexte && matchStatut;
    });
  }

  ouvrirAjout(): void {
    this.voiture_id = undefined as any;
    this.mission_id = undefined as any;
    this.employee_id = undefined as any;
    this.date_debut = '';
    this.date_fin = '';
    this.erreurForm = '';
    this.showForm = true;

    if (!this.voitures.length) this.voitureService.getAll('disponible').subscribe(res => { this.voitures = res.data; this.cdr.detectChanges(); });
    if (!this.missions.length) this.missionService.getAll().subscribe(res => { this.missions = res.data; this.cdr.detectChanges(); });
    if (!this.employees.length) this.employeeService.getAll().subscribe(res => { this.employees = res.data; this.cdr.detectChanges(); });
  }

  fermerForm(): void {
    this.showForm = false;
  }

  soumettreForm(): void {
    this.erreurForm = '';
    const payload = {
      voiture_id: this.voiture_id,
      mission_id: this.mission_id,
      employee_id: this.employee_id,
      date_debut: this.date_debut,
      date_fin: this.date_fin
    };
    this.service.create(payload).subscribe({
      next: () => { this.showForm = false; this.charger(); },
      error: (err) => {
        this.erreurForm = err.error?.message ?? 'Erreur lors de la création de l’affectation.';
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
