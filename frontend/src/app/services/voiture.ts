import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Voiture } from '../models/voiture';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class VoitureService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/voitures`;

  getAll(statut?: string): Observable<{ data: Voiture[] }> {
    return statut
      ? this.http.get<{ data: Voiture[] }>(this.apiUrl, { params: { statut } })
      : this.http.get<{ data: Voiture[] }>(this.apiUrl);
  }
  getOne(id: number): Observable<{ data: Voiture }> { return this.http.get<{ data: Voiture }>(`${this.apiUrl}/${id}`); }
  create(v: Partial<Voiture>): Observable<{ data: Voiture }> { return this.http.post<{ data: Voiture }>(this.apiUrl, v); }
  update(id: number, v: Partial<Voiture>): Observable<{ data: Voiture }> { return this.http.put<{ data: Voiture }>(`${this.apiUrl}/${id}`, v); }
  delete(id: number): Observable<{ message: string }> { return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`); }

  // Réservé à l'admin côté serveur (middleware 'admin' sur la route). Envoi en multipart/form-data.
  uploadImage(id: number, fichier: File): Observable<{ data: Voiture }> {
    const formData = new FormData();
    formData.append('image', fichier);
    return this.http.post<{ data: Voiture }>(`${this.apiUrl}/${id}/image`, formData);
  }
}
