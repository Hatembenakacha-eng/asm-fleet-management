import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
@Injectable({providedIn: 'root' })
export class Auth {
  private http = inject(HttpClient);
  private apiUrl =environment.apiUrl;

  login(email: string , password : string) {
    return this.http.post<{token : string ; user : any }>(`${this.apiUrl}/login`, { email, password });
  }

  logout(){
    return this.http.post(`${this.apiUrl}/logout`,{});
  }

  saveToken(token : string){
    sessionStorage.setItem('token',token);
  }

  getToken() : string | null {
    return sessionStorage.getItem('token');

  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
    }
}

