import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Affectation } from '../models/affectation';

@Injectable({ providedIn: 'root' })
export class AffectationService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/affectations`;

  getAll(): Observable<{ data: Affectation[] }> {
    return this.http.get<{ data: Affectation[] }>(this.apiUrl);
  }

  getOne(id: number): Observable<{ data: Affectation }> {
    return this.http.get<{ data: Affectation }>(`${this.apiUrl}/${id}`);
  }

  create(affectation: {
    voiture_id: number;
    mission_id: number;
    technicien_id?: number;
    date_debut: string;
    date_fin: string;
  }): Observable<Affectation> {
    return this.http.post<Affectation>(this.apiUrl, affectation);
  }

  liberer(id: number, kilometrageRetour?: number): Observable<{ message: string }> {
    return this.http.patch<{ message: string }>(`${this.apiUrl}/${id}/liberer`, {
      kilometrage_retour: kilometrageRetour
    });
  }
}
