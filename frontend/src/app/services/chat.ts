import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  envoyer(message: string, historique: { auteur: string; texte: string }[]): Observable<any> {
    const historiqueFormate = historique.map(msg => ({
      role: msg.auteur === 'moi' ? 'user' : 'assistant',
      content: msg.texte
    }));


    return this.http.post<any>(`${this.apiUrl}/chat`, {
      message,
      historique: historiqueFormate
    });
  }
}
