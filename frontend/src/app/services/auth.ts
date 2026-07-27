import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';

const CLE_TOKEN = 'asm_token';
const CLE_USER = 'asm_user';

@Injectable({ providedIn: 'root' })
export class Auth {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://127.0.0.1:8000/api';

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(res => {
        sessionStorage.setItem(CLE_TOKEN, res.token);
        sessionStorage.setItem(CLE_USER, JSON.stringify(res.user));
      })
    );
  }

  register(data: any): Observable<any> { return this.http.post<any>(`${this.apiUrl}/register`, data); }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe({
      next: () => this.forceLogout(),
      error: () => this.forceLogout() // déconnecte localement même si le serveur ne répond pas
    });
  }

  forceLogout(): void {
    sessionStorage.removeItem(CLE_TOKEN);
    sessionStorage.removeItem(CLE_USER);
    this.router.navigate(['/login']);
  }

  getToken(): string | null { return sessionStorage.getItem(CLE_TOKEN); }
  isLoggedIn(): boolean { return !!this.getToken(); }
  getUser(): User | null {
    const raw = sessionStorage.getItem(CLE_USER);
    return raw ? JSON.parse(raw) : null;
  }
}
