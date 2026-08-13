import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api';

  envoyer(message: string, historique: { auteur: string; texte: string }[]): Observable<any> {
    const historiqueFormate = historique.map(msg => ({{
      role: msg.auteur === 'moi' ? 'user' : 'assistant',
      content: msg.texte
    }));


    return this.http.post<any>(`${this.apiUrl}/chat`, {
      message,
      historique: historiqueFormate
    });
  }
}
