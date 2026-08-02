import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MissionService } from '../../../services/mission';

@Component({
  selector: 'app-mission-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './mission-form.html'
})
export class MissionForm implements OnInit {
  private service = inject(MissionService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  id: number | null = null;
  destination = '';
  date_depart = '';
  date_retour = '';
  type_vehicule = '';
  capacite_minimale: number | null = null;
  erreurs: string[] = [];

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.service.getOne(this.id).subscribe({
        next: (res) => {
          const m = res.data || res;
          this.destination = m.destination;
          this.date_depart = m.date_depart;
          this.date_retour = m.date_retour;
          this.type_vehicule = m.type_vehicule;
          this.capacite_minimale = m.capacite_minimale;
          this.cdr.detectChanges();
        },
        error: (err) => console.error(err)
      });
    }
  }

  onSubmit(): void {
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
      next: () => this.router.navigate(['/missions']),
      error: (err) => {
        console.error('Détails erreur backend :', err);
        const errorData = err.error?.erreurs || err.error?.errors;
        if (errorData) {
          this.erreurs = Object.values(errorData).flat() as string[];
        } else {
          this.erreurs = [err.error?.message || 'Une erreur est survenue.'];
        }
        this.cdr.detectChanges();
      }
    });
  }

  annuler(): void {
    this.router.navigate(['/missions']);
  }
}
