import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AffectationService } from '../../services/affectation';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil implements OnInit {
  private affectationService = inject(AffectationService);
  private authService = inject(Auth);
  private cdr = inject(ChangeDetectorRef);

  user: any = null;
  demandesAValider: any[] = [];
  missionEnCours: any = null;
  demandeEnAttente: any = null;

  ngOnInit(): void {
    this.chargerUtilisateurConnecte();
    this.chargerDonnees();
  }

  chargerUtilisateurConnecte(): void {
    const auth = this.authService as any;

    if (auth?.user) {
      this.user = auth.user;
    } else if (typeof auth?.getUser === 'function') {
      this.user = auth.getUser();
    }

    if (!this.user) {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          this.user = JSON.parse(userData);
        } catch (e) {
          console.error('Erreur parsing user localStorage', e);
        }
      }
    }
    console.log('Utilisateur connecté :', this.user);
  }

  chargerDonnees(): void {
    this.affectationService.getAll().subscribe({
      next: (res: any) => {
        const liste = res.data || res;
        console.log('Affectations récupérées de la BDD :', liste);

        if (Array.isArray(liste)) {
          this.demandesAValider = liste.filter((a: any) => {
            if (!a.statut) return false;
            const st = String(a.statut).toLowerCase().trim();
            return st.includes('attente') || st.includes('pending') || st === 'en_attente';
          });

          console.log('Demandes à valider filtrées (Admin) :', this.demandesAValider);

          if (this.user) {
            const userId = String(this.user.id);

            const mesAffectations = liste.filter((a: any) =>
              String(a.employee_id) === userId ||
              String(a.employee?.id) === userId ||
              String(a.cree_par) === userId
            );


            this.missionEnCours = mesAffectations.find((a: any) => {
              if (!a.statut) return false;
              const st = String(a.statut).toLowerCase().trim();
              return st === 'active' || st === 'en_cours' || st === 'validee' || st === 'valide';
            }) || null;

            this.demandeEnAttente = mesAffectations.find((a: any) => {
              if (!a.statut) return false;
              const st = String(a.statut).toLowerCase().trim();
              return st.includes('attente') || st === 'en_attente';
            }) || null;
          }
        }

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur de chargement API :', err);
      }
    });
  }

  accepterDemande(id: number): void {
    this.changerStatutDemande(id, 'validee');
  }

  refuserDemande(id: number): void {
    this.changerStatutDemande(id, 'refusee');
  }

  private changerStatutDemande(id: number, nouveauStatut: string): void {
    const service = this.affectationService as any;

    const req$ = typeof service.update === 'function'
      ? service.update(id, { statut: nouveauStatut })
      : typeof service.changerStatut === 'function'
        ? service.changerStatut(id, nouveauStatut)
        : null;

    if (req$) {
      req$.subscribe({
        next: () => this.chargerDonnees(),
        error: (err: any) => console.error('Erreur lors de la mise à jour:', err)
      });
    } else {
      this.demandesAValider = this.demandesAValider.filter(d => d.id !== id);
      this.cdr.detectChanges();
    }
  }
}
