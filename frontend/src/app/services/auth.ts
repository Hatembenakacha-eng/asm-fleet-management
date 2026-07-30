import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { User } from '../models/user';

const CLE_TOKEN = 'asm_token';
const CLE_USER = 'asm_user';

@Injectable({ providedIn: 'root' })
export class Auth {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://127.0.0.1:8000/api';

  // 1. Déclarer le Subject réactif pour l'utilisateur
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(res => {
        sessionStorage.setItem(CLE_TOKEN, res.token);
        sessionStorage.setItem(CLE_USER, JSON.stringify(res.user));
        // Mettre à jour le flux réactif
        this.currentUserSubject.next(res.user);
      })
    );
  }

  register(data: any): Observable<any> { return this.http.post<any>(`${this.apiUrl}/register`, data); }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe({
      next: () => this.forceLogout(),
      error: () => this.forceLogout()
    });
  }

  forceLogout(): void {
    sessionStorage.removeItem(CLE_TOKEN);
    sessionStorage.removeItem(CLE_USER);
    this.currentUserSubject.next(null); // Réinitialiser l'utilisateur
    this.router.navigate(['/login']);
  }

  getToken(): string | null { return sessionStorage.getItem(CLE_TOKEN); }
  isLoggedIn(): boolean { return !!this.getToken(); }

  getUser(): User | null {
    const raw = sessionStorage.getItem(CLE_USER);
    return raw ? JSON.parse(raw) : null;
  }

  updateProfile(data: { name: string; email: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/user/profile`, data).pipe(
      tap(res => {
        if (res && res.user) {
          sessionStorage.setItem(CLE_USER, JSON.stringify(res.user));
          // 2. Diffuser le nouvel utilisateur à TOUTE l'application
          this.currentUserSubject.next(res.user);
        }
      })
    );
  }

  updatePassword(data: { current_password: string; new_password: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/user/password`, data);
  }
  
}
