import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { AffectationService } from '../../services/affectation';
import { Affectation } from '../../models/affectation';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil implements OnInit {
  private auth = inject(Auth);
  private affectationService = inject(AffectationService);

  user = this.auth.getUser();
  missionEnCours: Affectation | null = null;

  ngOnInit() {
    // N'exécuter la requête QUE SI un utilisateur est connecté ET n'est pas admin
    //if (this.user && this.user.role !== 'admin') {
      this.affectationService.getAll().subscribe({
        next: (res) => {
          const affectations = res.data || res;
          this.missionEnCours = affectations.find((a: any) =>
            a.statut === 'active' || a.statut === 'en_cours'
          ) || null;
        },
        error: (err) => console.error('Erreur chargement affectations:', err)
      });
    }
  //}
}
