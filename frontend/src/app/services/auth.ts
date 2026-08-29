import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { ChatStateService } from './chat-state';

const CLE_TOKEN = 'asm_token';
const CLE_USER = 'asm_user';

@Injectable({ providedIn: 'root' })
export class Auth {
  private http = inject(HttpClient);
  private router = inject(Router);
  private chatState = inject(ChatStateService);
  private apiUrl = environment.apiUrl;

  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();
  private getUserFromStorage(): User | null {
    const raw = sessionStorage.getItem(CLE_USER);
    return raw ? JSON.parse(raw) : null;
  }

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
    // Évite qu'un prochain utilisateur, sur un poste partagé, voie la conversation de la personne précédente.
    this.chatState.reinitialiser();
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return sessionStorage.getItem(CLE_TOKEN);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUser(): User | null {
    return this.currentUserSubject.value;
  }

  updateProfile(data: { name: string; email: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/profile`, data).pipe(
      tap(res => {
        if (res && res.user) {
          sessionStorage.setItem(CLE_USER, JSON.stringify(res.user));
          this.currentUserSubject.next(res.user);
        }
      })
    );
  }

  updatePassword(data: { current_password: string; new_password: string; new_password_confirmation: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/profile/password`, data);
  }

  uploadPhoto(fichier: File): Observable<any> {
    const formData = new FormData();
    formData.append('photo', fichier);
    return this.http.post<any>(`${this.apiUrl}/profile/photo`, formData).pipe(
      tap(res => {
        if (res && res.user) {
          sessionStorage.setItem(CLE_USER, JSON.stringify(res.user));
          this.currentUserSubject.next(res.user);
        }
      })
    );
  }
}
