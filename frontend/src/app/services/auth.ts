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

  // 1. BehaviorSubject réactif
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  // Récupération initiale dans le sessionStorage
  private getUserFromStorage(): User | null {
    const raw = sessionStorage.getItem(CLE_USER);
    return raw ? JSON.parse(raw) : null;
  }

  // Connexion
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(res => {
        sessionStorage.setItem(CLE_TOKEN, res.token);
        sessionStorage.setItem(CLE_USER, JSON.stringify(res.user));
        this.currentUserSubject.next(res.user);
      })
    );
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, data);
  }

  // Déconnexion
  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe({
      next: () => this.forceLogout(),
      error: () => this.forceLogout()
    });
  }

  forceLogout(): void {
    sessionStorage.removeItem(CLE_TOKEN);
    sessionStorage.removeItem(CLE_USER);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return sessionStorage.getItem(CLE_TOKEN);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Renvoie toujours la valeur réactive courante
  getUser(): User | null {
    return this.currentUserSubject.value;
  }

  // 2. Mise à jour Profil (Nom, Email)
  updateProfile(data: { name: string; email: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/profile`, data).pipe(
      tap(res => {
        if (res && res.user) {
          sessionStorage.setItem(CLE_USER, JSON.stringify(res.user));
          // Diffuse immédiatement le profil mis à jour à toute l'application (Header, Sidebar, Profil...)
          this.currentUserSubject.next(res.user);
        }
      })
    );
  }

  // 3. Changement de mot de passe
  updatePassword(data: { current_password: string; new_password: string; new_password_confirmation: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/profile/password`, data);
  }
}
