import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AffectationService } from '../../services/affectation';
import { VoitureService } from '../../services/voiture';
import { Auth } from '../../services/auth';
import { Voiture } from '../../models/voiture';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil implements OnInit {
  private affectationService = inject(AffectationService);
  private voitureService = inject(VoitureService);
  private authService = inject(Auth);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  user: any = null;
  demandesAValider: any[] = [];
  missionEnCours: any = null;
  demandeEnAttente: any = null;
  voituresSuggerees: Voiture[] = [];

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.chargerDonnees();
    this.chargerVoituresSuggerees();
  }

  chargerDonnees(): void {
    // Depuis le correctif backend, /affectations est déjà filtré côté serveur : un admin reçoit
    // tout, un utilisateur normal ne reçoit que SES propres affectations. Plus besoin de filtrer
    // par employee_id/cree_par côté client.
    this.affectationService.getAll().subscribe({
      next: (res: any) => {
        const liste = res.data || res;
        if (!Array.isArray(liste)) return;

        if (this.user?.role === 'admin') {
          this.demandesAValider = liste.filter((a: any) => {
            if (!a.statut) return false;
            const st = String(a.statut).toLowerCase().trim();
            return st.includes('attente');
          });
        } else {
          this.missionEnCours = liste.find((a: any) => {
            if (!a.statut) return false;
            const st = String(a.statut).toLowerCase().trim();
            return st === 'active' || st === 'en_cours' || st === 'validee' || st === 'valide';
          }) || null;

          this.demandeEnAttente = liste.find((a: any) => {
            if (!a.statut) return false;
            const st = String(a.statut).toLowerCase().trim();
            return st.includes('attente');
          }) || null;
        }

        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erreur de chargement API :', err)
    });
  }

  chargerVoituresSuggerees(): void {
    this.voitureService.getAll('disponible').subscribe({
      next: (res: any) => {
        const liste = res.data || res;
        this.voituresSuggerees = (Array.isArray(liste) ? liste : []).slice(0, 4);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erreur de chargement des véhicules :', err)
    });
  }

  // Amorce une demande dans le chat pour ce véhicule précis (voir assistant-ia.ts, lecture du paramètre ?voiture=).
  demanderVehicule(v: Voiture): void {
    this.router.navigate(['/assistant-ia'], { queryParams: { voiture: v.id } });
  }

  erreurDemande = '';

  accepterDemande(id: number): void {
    this.changerStatutDemande(id, 'validee');
  }

  refuserDemande(id: number): void {
    this.changerStatutDemande(id, 'refusee');
  }

  private changerStatutDemande(id: number, nouveauStatut: string): void {
    this.erreurDemande = '';
    this.affectationService.update(id, { statut: nouveauStatut }).subscribe({
      next: () => this.chargerDonnees(),
      error: (err: any) => {
        this.erreurDemande = err.error?.message || "Impossible de mettre à jour cette demande.";
        this.cdr.detectChanges();
      }
    });
  }
}
