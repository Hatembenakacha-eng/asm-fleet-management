import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';
  erreur = '';
  chargement = false;

  constructor(private auth: Auth, private router: Router) {}

  connecter(): void {
    this.erreur = '';
    this.chargement = true;
    this.auth.login(this.email, this.password).subscribe({
      next: () => { this.chargement = false; this.router.navigate(['/dashboard']); },
      error: (err) => {
        this.chargement = false;
        this.erreur = err.error?.message || 'E-mail ou mot de passe incorrect.';
      }
    });
  }
}



