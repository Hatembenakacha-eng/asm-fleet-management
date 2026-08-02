import { Component, inject, OnInit } from '@angular/core';
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

  // Propriétés utilisées directement dans accueil.html
  user: any = null;
  demandesAValider: any[] = [];
  missionEnCours: any = null;
  demandeEnAttente: any = null;

  ngOnInit() {
    this.chargerUtilisateurConnecte();
    this.chargerDonnees();
  }

  chargerUtilisateurConnecte() {
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
    console.log('👤 Utilisateur connecté :', this.user);
  }

  chargerDonnees() {
    this.affectationService.getAll().subscribe({
      next: (res: any) => {
        const liste = res.data || res;
        console.log('📦 Affectations récupérées de la BDD :', liste);

        if (Array.isArray(liste)) {
          // Afficher la valeur EXACTE de 'statut' pour chaque objet dans la console
          liste.forEach((item, index) => {
            console.log(`Item #${index} (ID: ${item.id}) -> statut brut: "${item.statut}"`);
          });

          // 1. Pour l'Admin : On accepte "en_attente", "enattente", "pending", ou tout ce qui contient "attente"
          this.demandesAValider = liste.filter((a: any) => {
            if (!a.statut) return false;
            const st = String(a.statut).toLowerCase().trim();
            return st.includes('attente') || st.includes('pending');
          });

          console.log('✅ Demandes à valider filtrées (Admin) :', this.demandesAValider);

          // 2. Pour l'Employé
          if (this.user) {
            const userId = this.user.id;

            const mesAffectations = liste.filter((a: any) =>
              a.employee_id == userId ||
              a.employee?.id == userId ||
              a.cree_par == userId
            );

            this.missionEnCours = mesAffectations.find((a: any) => {
              if (!a.statut) return false;
              const st = String(a.statut).toLowerCase().trim();
              return st === 'active' || st === 'en_cours' || st === 'validee';
            }) || null;

            this.demandeEnAttente = mesAffectations.find((a: any) => {
              if (!a.statut) return false;
              const st = String(a.statut).toLowerCase().trim();
              return st.includes('attente');
            }) || null;
          }
        }
      },
      error: (err) => {
        console.error('❌ Erreur de chargement API :', err);
      }
    });
  }

  accepterDemande(id: number) {
    this.changerStatutDemande(id, 'active');
  }

  refuserDemande(id: number) {
    this.changerStatutDemande(id, 'refusee');
  }

  private changerStatutDemande(id: number, nouveauStatut: string) {
    const service = this.affectationService as any;

    if (typeof service.update === 'function') {
      service.update(id, { statut: nouveauStatut }).subscribe({
        next: () => this.chargerDonnees(),
        error: (err: any) => console.error('Erreur lors de la mise à jour:', err)
      });
    } else if (typeof service.changerStatut === 'function') {
      service.changerStatut(id, nouveauStatut).subscribe({
        next: () => this.chargerDonnees(),
        error: (err: any) => console.error('Erreur lors de la mise à jour:', err)
      });
    } else {
      this.demandesAValider = this.demandesAValider.filter(d => d.id !== id);
    }
  }
}
