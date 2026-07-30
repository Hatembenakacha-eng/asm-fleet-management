import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api'; // Ajustez selon votre URL backend

  /**
   * Envoie le message ainsi que l'historique complet des messages
   */
  envoyer(message: string, historique: { auteur: string; texte: string }[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/chat`, {
      message,
      historique // <-- Envoi du contexte au backend
    });
  }
}
