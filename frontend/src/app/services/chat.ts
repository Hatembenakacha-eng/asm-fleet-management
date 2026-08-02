import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api';

  /**
   * Envoie le message ainsi que l'historique complet des messages
   */
  envoyer(message: string, historique: { auteur: string; texte: string }[]): Observable<any> {

    // 1. Conversion du format Front ({ auteur, texte }) vers le format attendu par Laravel/Groq ({ role, content })
    const historiqueFormate = historique.map(msg => ({
      role: msg.auteur === 'moi' ? 'user' : 'assistant',
      content: msg.texte
    }));

    // 2. Envoi de la requête HTTP
    return this.http.post<any>(`${this.apiUrl}/chat`, {
      message,
      historique: historiqueFormate
    });
  }
}
