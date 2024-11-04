import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userInfo: any = null;

  constructor() {
    this.loadUserInfo();
  }

  private loadUserInfo(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        this.userInfo = jwtDecode(token);
      } catch (error) {
        console.error('Error al decodificar el token', error);
      }
    } else {
      console.error('Error al obtener el token');
    }
  }

  getUserInfo(): any {
    return this.userInfo;
  }

  isLoggedIn(): boolean {
    return this.userInfo !== null;
  }

  logout(): void {
    this.userInfo = null; 
  }

  loadToken(token:string): any {
    localStorage.setItem('token', token)
  }
}
