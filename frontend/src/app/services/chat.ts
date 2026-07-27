import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api/chat';
  envoyer(message: string): Observable<{ succes: boolean; reponse: string }> {
    return this.http.post<{ succes: boolean; reponse: string }>(this.apiUrl, { message });
  }
}
