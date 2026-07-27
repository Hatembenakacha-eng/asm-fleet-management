import { Component, inject, OnInit } from '@angular/core';
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

  id: number | null = null;

  destination = '';
  description = '';
  date_debut = '';
  date_fin = '';
  type_vehicule = '';
  capacite_minimale: number | null = null;

  erreurs: string[] = [];

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.id = +idParam;

      this.service.getOne(this.id).subscribe({
        next: (res) => {
          const m = res.data;

          this.destination = m.destination;
          this.description = m.description;
          this.date_debut = m.date_debut;
          this.date_fin = m.date_fin;
          this.type_vehicule = m.type_vehicule;
          this.capacite_minimale = m.capacite_minimale;
        },
        error: (err) => console.error(err)
      });
    }
  }

  onSubmit(): void {

    this.erreurs = [];

    const payload = {
      destination: this.destination,
      description: this.description,
      date_debut: this.date_debut,
      date_fin: this.date_fin,
      type_vehicule: this.type_vehicule,
      capacite_minimale: this.capacite_minimale
    };

    const request = this.id
      ? this.service.update(this.id, payload)
      : this.service.create(payload);

    request.subscribe({
      next: () => this.router.navigate(['/missions']),
      error: (err) => {
        console.error(err);

        if (err.error?.errors) {
          this.erreurs = Object.values(err.error.errors).flat() as string[];
        } else {
          this.erreurs = [err.error?.message || 'Une erreur est survenue.'];
        }
      }
    });
  }

  annuler(): void {
    this.router.navigate(['/missions']);
  }
}
