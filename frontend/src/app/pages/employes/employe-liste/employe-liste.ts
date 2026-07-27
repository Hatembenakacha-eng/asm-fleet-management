import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmployeeService } from '../../../services/employee';
import { Employee } from '../../../models/employee';

@Component({ selector: 'app-employe-liste', standalone: true, imports: [RouterLink], templateUrl: './employe-liste.html' })
export class EmployeListe implements OnInit {
  private service = inject(EmployeeService);
  employes: Employee[] = [];
  chargement = true;
  erreur = '';

  ngOnInit() { this.charger(); }
  charger() {
    this.chargement = true;
    this.service.getAll().subscribe({
      next: res => { this.employes = res.data; this.chargement = false; },
      error: () => { this.erreur = "Impossible de charger les employés."; this.chargement = false; }
    });
  }
  supprimer(id: number) {
    if (confirm('Supprimer ?')) this.service.delete(id).subscribe(() => this.charger());
  }
}
