import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  name = '';
  email = '';
  password = '';
  password_confirmation = '';
  role = 'admin'; // valeur par défaut

  erreur = '';
  succes = false;
  chargement = false;

  constructor(private auth: Auth, private router: Router) {}

  creerCompte(): void {
    this.erreur = '';
    this.chargement = true;

    this.auth.register({
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation
        }).subscribe({
      next: () => {
        this.chargement = false;
        this.succes = true;
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err: any) => {
      this.chargement = false;

      console.log(err);
      console.log(err.error);

      this.erreur = JSON.stringify(err.error);
    }
    });
  }
}
