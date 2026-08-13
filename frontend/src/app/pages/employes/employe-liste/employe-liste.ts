import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../../services/employee';
import { Employee } from '../../../models/employee';

@Component({ selector: 'app-employe-liste', standalone: true, imports: [FormsModule], templateUrl: './employe-liste.html' })
export class EmployeListe implements OnInit {
  private service = inject(EmployeeService);
  private cdr = inject(ChangeDetectorRef);
  employes: Employee[] = [];
  chargement = true;
  erreur = '';
  recherche = '';

  // --- Etat de la modale Ajouter / Modifier ---
  showForm = false;
  id: number | null = null;
  nom = ''; specialite = ''; contact = ''; disponible = true;
  erreurs: string[] = [];

  ngOnInit() { this.charger(); }
  charger() {
    this.chargement = true;
    this.service.getAll().subscribe({
      next: res => { this.employes = res.data; this.chargement = false; this.cdr.detectChanges(); },
      error: () => { this.erreur = "Impossible de charger les employés."; this.chargement = false; this.cdr.detectChanges(); }
    });
  }

  get employesFiltres(): Employee[] {
    const q = this.recherche.trim().toLowerCase();
    if (!q) return this.employes;
    return this.employes.filter(e =>
      e.nom?.toLowerCase().includes(q) ||
      (e.specialite || '').toLowerCase().includes(q)
    );
  }

  ouvrirAjout(): void {
    this.id = null;
    this.nom = ''; this.specialite = ''; this.contact = ''; this.disponible = true;
    this.erreurs = [];
    this.showForm = true;
  }

  ouvrirEdition(e: Employee): void {
    this.id = e.id;
    this.nom = e.nom;
    this.specialite = e.specialite;
    this.contact = e.contact;
    this.disponible = e.disponible;
    this.erreurs = [];
    this.showForm = true;
  }

  fermerForm(): void {
    this.showForm = false;
  }

  soumettreForm(): void {
    const payload = { nom: this.nom, specialite: this.specialite, contact: this.contact, disponible: this.disponible };
    const obs = this.id ? this.service.update(this.id, payload) : this.service.create(payload);
    obs.subscribe({
      next: () => { this.showForm = false; this.charger(); },
      error: (err) => { console.error(err); this.cdr.detectChanges(); }
    });
  }

  supprimer(id: number) {
    if (confirm('Supprimer ?')) this.service.delete(id).subscribe(() => this.charger());
  }
}
