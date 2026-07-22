import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http = inject(HttpClient);
  message = 'loading...';

  ngOnInit(): void {
    this.http.get<any>('http://127.0.0.1:8000/api/ping').subscribe({
      next: (reponse) => {
        this.message = 'Connexion réussie : ' + reponse.message;
      },
      error: (erreur) => {
        this.message = 'Échec — vérifie la console (F12)';
        console.error(erreur);
      }
    });
  }
}
