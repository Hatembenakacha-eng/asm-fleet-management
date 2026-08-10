import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Auth } from '../services/auth';
import { AffectationService } from '../services/affectation';
import { User } from '../models/user';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout implements OnInit {
  private auth = inject(Auth);
  private affectationService = inject(AffectationService);
  private cdr = inject(ChangeDetectorRef);

  user: User | null = null;
  menuOuvert = false;
  demandesEnAttente = 0;

  ngOnInit(): void {
    // S'abonne au flux utilisateur pour mettre à jour l'affichage en temps réel
    this.auth.currentUser$.subscribe(updatedUser => {
      this.user = updatedUser;
      this.cdr.detectChanges(); // Force le rafraîchissement du HTML du Layout

      if (updatedUser?.role === 'admin') {
        this.chargerCompteurDemandes();
      }
    });
  }

  private chargerCompteurDemandes(): void {
    this.affectationService.getAll().subscribe({
      next: (res: any) => {
        const liste = res.data || res;
        this.demandesEnAttente = Array.isArray(liste)
          ? liste.filter((a: any) => String(a.statut).toLowerCase().includes('attente')).length
          : 0;
        this.cdr.detectChanges();
      },
      error: () => {}
    });
  }

  initiales(nom?: string): string {
    if (!nom) return '?';
    return nom.split(' ').map(p => p[0]).join('').substring(0, 2).toUpperCase();
  }

  logout() {
    this.auth.logout();
  }
}
