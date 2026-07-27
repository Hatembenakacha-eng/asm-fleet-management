import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { AffectationService } from '../../services/affectation';
import { Affectation } from '../../models/affectation';

@Component({ selector: 'app-accueil', standalone: true, imports: [RouterLink], templateUrl: './accueil.html' })
export class Accueil implements OnInit {
  private auth = inject(Auth);
  private affectationService = inject(AffectationService);
  user = this.auth.getUser();
  missionEnCours: Affectation | null = null;

  ngOnInit() {
    if (this.user?.role !== 'admin') {
      this.affectationService.getAll().subscribe(res => {
        //this.missionEnCours = res.data.find(a => a.statut === 'active') || null;
      });
    }
  }
}
