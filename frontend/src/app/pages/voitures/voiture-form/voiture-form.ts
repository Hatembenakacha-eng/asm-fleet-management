import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Voiture } from '../../../models/voiture';
import { VoitureService } from '../../../services/voiture';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-voiture-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './voiture-form.html',
  styleUrl: './voiture-form.css'
})
export class VoitureForm implements OnInit {
  private service = inject(VoitureService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  id: number | null = null;
  immatriculation = '';
  marque = '';
  modele = '';
  kilometrage = 0;
  statut: Voiture['statut'] = 'disponible';
  capacite: number | null = null;
  categorie = '';

 ngOnInit() {
  const idParam = this.route.snapshot.paramMap.get('id');

  if (idParam) {
    this.id = +idParam;

    this.service.getOne(this.id).subscribe({
      next: (res) => {
        console.log('Voiture reçue :', res);

        this.immatriculation = res.data.immatriculation;
        this.marque = res.data.marque;
        this.modele = res.data.modele;
        this.kilometrage = res.data.kilometrage;
        this.statut = res.data.statut;
        this.capacite = res.data.capacite;
        this.categorie = res.data.categorie ?? '';
        this.cdr.detectChanges(); // Force le rafraîchissement du formulaire après la réponse HTTP
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}

  onSubmit() {
    const payload = { immatriculation: this.immatriculation, marque: this.marque, modele: this.modele, kilometrage: this.kilometrage, statut: this.statut, capacite: this.capacite, categorie: this.categorie };
    const obs = this.id ? this.service.update(this.id, payload) : this.service.create(payload);
    obs.subscribe(() => this.router.navigate(['/voitures']));
  }

  annuler(): void {
    this.router.navigate(['/voitures']);
  }
}
