import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Employee } from '../models/employee';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/employees`;

  getAll(filtres?: { disponible?: boolean; specialite?: string }): Observable<{ data: Employee[] }> {
    let params = new HttpParams();
    if (filtres?.disponible !== undefined) params = params.set('disponible', String(filtres.disponible));
    if (filtres?.specialite) params = params.set('specialite', filtres.specialite);

    return this.http.get<{ data: Employee[] }>(this.apiUrl, { params });
  }

  getOne(id: number): Observable<{ data: Employee }> {
    return this.http.get<{ data: Employee }>(`${this.apiUrl}/${id}`);
  }

  create(employee: Partial<Employee>): Observable<{ data: Employee }> {
    return this.http.post<{ data: Employee }>(this.apiUrl, employee);
  }

  update(id: number, employee: Partial<Employee>): Observable<{ data: Employee }> {
    return this.http.put<{ data: Employee }>(`${this.apiUrl}/${id}`, employee);
  }

  delete(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
