import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AffectationService } from '../../../services/affectation';
import { VoitureService } from '../../../services/voiture';
import { MissionService } from '../../../services/mission';
import { EmployeeService } from '../../../services/employee';
import { Voiture } from '../../../models/voiture';
import { Mission } from '../../../models/mission';
import { Employee } from '../../../models/employee';

@Component({
  selector: 'app-affectation-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './affectation-form.html'
})
export class AffectationForm implements OnInit {
  private affectationService = inject(AffectationService);
  private voitureService = inject(VoitureService);
  private missionService = inject(MissionService);
  private employeeService = inject(EmployeeService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  voitures: Voiture[] = [];
  missions: Mission[] = [];
  employees: Employee[] = [];

  voiture_id!: number;
  mission_id!: number;
  employee_id!: number;
  date_debut = '';
  date_fin = '';
  erreur = '';

  ngOnInit(): void {
    this.voitureService.getAll('disponible').subscribe(res => { this.voitures = res.data; this.cdr.detectChanges(); });
    this.missionService.getAll().subscribe(res => { this.missions = res.data; this.cdr.detectChanges(); });
    this.employeeService.getAll().subscribe(res => { this.employees = res.data; this.cdr.detectChanges(); });
  }

  onSubmit(): void {
    this.erreur = '';
    const payload = {
      voiture_id: this.voiture_id,
      mission_id: this.mission_id,
      employee_id: this.employee_id,
      date_debut: this.date_debut,
      date_fin: this.date_fin
    };

    this.affectationService.create(payload).subscribe({
      next: () => this.router.navigate(['/affectations']),
      error: (err) => {
        console.error(err);
        this.erreur = err.error?.message ?? 'Erreur lors de la création de l’affectation.';
        this.cdr.detectChanges();
      }
    });
  }

  annuler(): void {
    this.router.navigate(['/affectations']);
  }
}
