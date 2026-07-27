import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Mission } from '../models/mission';

@Injectable({ providedIn: 'root' })
export class MissionService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/missions`;

  getAll(statut?: string): Observable<{ data: Mission[] }> {
    let params = new HttpParams();
    if (statut) params = params.set('statut', statut);

    return this.http.get<{ data: Mission[] }>(this.apiUrl, { params });
  }

  getOne(id: number): Observable<{ data: Mission }> {
    return this.http.get<{ data: Mission }>(`${this.apiUrl}/${id}`);
  }

  create(mission: Partial<Mission>): Observable<{ data: Mission }> {
    return this.http.post<{ data: Mission }>(this.apiUrl, mission);
  }

  update(id: number, mission: Partial<Mission>): Observable<{ data: Mission }> {
    return this.http.put<{ data: Mission }>(`${this.apiUrl}/${id}`, mission);
  }

  delete(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  recommander(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/${id}/recommandation`);
}
}
