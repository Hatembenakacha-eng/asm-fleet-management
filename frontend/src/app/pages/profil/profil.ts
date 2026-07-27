import { Component, inject } from '@angular/core';
import { Auth } from '../../services/auth';

@Component({ selector: 'app-profil', standalone: true, imports: [], templateUrl: './profil.html' })
export class Profil {
  private auth = inject(Auth);
  user = this.auth.getUser();
}
