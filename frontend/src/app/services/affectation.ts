import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Affectation } from '../models/affectation';

@Injectable({
  providedIn: 'root'
})
export class AffectationService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/affectations`;

  getAll(): Observable<{data:Affectation[]}>{
    return this.http.get<{data:Affectation[]}>(this.apiUrl);
  }

  getOne(id:number):Observable<{data:Affectation}>{
    return this.http.get<{data:Affectation}>(`${this.apiUrl}/${id}`);
  }

  create(data:any):Observable<{data:Affectation}>{
    return this.http.post<{data:Affectation}>(this.apiUrl,data);
  }

  update(id:number,data:any):Observable<{data:Affectation}>{
    return this.http.put<{data:Affectation}>(`${this.apiUrl}/${id}`,data);
  }

  delete(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
