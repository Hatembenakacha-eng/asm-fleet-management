import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-layout', standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './layout.html', styleUrl: './layout.css'
})
export class Layout {
  private auth = inject(Auth);
  user = this.auth.getUser();
  menuOuvert = false;

  initiales(nom?: string): string {
    if (!nom) return '?';
    return nom.split(' ').map(p => p[0]).join('').substring(0, 2).toUpperCase();
  }

  logout() { this.auth.logout(); }
}
