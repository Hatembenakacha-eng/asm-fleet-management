import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VoitureService } from '../../../services/voiture';
import { Voiture } from '../../../models/voiture';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-voiture-liste',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './voiture-liste.html' })
export class VoitureListe implements OnInit {
  private service = inject(VoitureService);
  private cdr = inject(ChangeDetectorRef);
  private auth = inject(Auth);
  voitures: Voiture[] = [];
  chargement = true;
  erreur = '';

  recherche = '';
  filtreStatut = '';

  showForm = false;
  id: number | null = null;
  immatriculation = '';
  marque = '';
  modele = '';
  kilometrage = 0;
  statut: Voiture['statut'] = 'disponible';
  capacite: number | null = null;
  categorie = '';

  fichierImage: File | null = null;
  envoiImageEnCours = false;

  get estAdmin(): boolean {
    return this.auth.getUser()?.role === 'admin';
  }

  ngOnInit() { this.charger(); }
  charger() {
    this.chargement = true;

    this.service.getAll().subscribe({
      next: (res) => {
        this.voitures = res.data;
        this.chargement = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.erreur = "Impossible de charger les véhicules.";
        this.chargement = false;
        this.cdr.detectChanges();
      }
    });
  }

  get voituresFiltrees(): Voiture[] {
    const q = this.recherche.trim().toLowerCase();
    return this.voitures.filter(v => {
      const matchTexte = !q ||
        v.immatriculation?.toLowerCase().includes(q) ||
        v.marque?.toLowerCase().includes(q) ||
        v.modele?.toLowerCase().includes(q) ||
        (v.categorie || '').toLowerCase().includes(q);
      const matchStatut = !this.filtreStatut || v.statut === this.filtreStatut;
      return matchTexte && matchStatut;
    });
  }

  ouvrirAjout(): void {
    this.id = null;
    this.immatriculation = '';
    this.marque = '';
    this.modele = '';
    this.kilometrage = 0;
    this.statut = 'disponible';
    this.capacite = null;
    this.categorie = '';
    this.fichierImage = null;
    this.showForm = true;
  }

  ouvrirEdition(v: Voiture): void {
    this.id = v.id;
    this.immatriculation = v.immatriculation;
    this.marque = v.marque;
    this.modele = v.modele;
    this.kilometrage = v.kilometrage;
    this.statut = v.statut;
    this.capacite = v.capacite;
    this.categorie = v.categorie ?? '';
    this.fichierImage = null;
    this.showForm = true;
  }

  fermerForm(): void {
    this.showForm = false;
  }

  onFichierImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.fichierImage = input.files?.[0] ?? null;
  }

  soumettreForm(): void {
    const payload = {
      immatriculation: this.immatriculation, marque: this.marque, modele: this.modele,
      kilometrage: this.kilometrage, statut: this.statut, capacite: this.capacite, categorie: this.categorie
    };
    const obs = this.id ? this.service.update(this.id, payload) : this.service.create(payload);
    obs.subscribe({
      next: (res: any) => {
        const idVoiture = this.id ?? res?.data?.id;
        if (this.fichierImage && idVoiture) {
          this.envoyerImage(idVoiture);
        } else {
          this.showForm = false;
          this.charger();
        }
      },
      error: (err) => { console.error(err); this.cdr.detectChanges(); }
    });
  }

  private envoyerImage(idVoiture: number): void {
    this.envoiImageEnCours = true;
    this.service.uploadImage(idVoiture, this.fichierImage!).subscribe({
      next: () => {
        this.envoiImageEnCours = false;
        this.showForm = false;
        this.fichierImage = null;
        this.charger();
      },
      error: (err) => {
        console.error(err);
        this.envoiImageEnCours = false;
        // Le véhicule est déjà enregistré à ce stade ; seule l'image a échoué.
        this.erreur = "Véhicule enregistré, mais l'envoi de la photo a échoué.";
        this.showForm = false;
        this.charger();
      }
    });
  }

  supprimer(id: number) {
    if (confirm('Supprimer ce véhicule ?')) this.service.delete(id).subscribe(() => this.charger());
  }
}
