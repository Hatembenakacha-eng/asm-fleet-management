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
    const token = localStorage.getItem('token');

    // 🔒 N'exécute la requête QUE SI un token existe ET que l'utilisateur n'est pas admin
    if (token && this.user && this.user.role !== 'admin') {
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
  }
}
