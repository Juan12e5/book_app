import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthMiddleware implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('token');
    if (token && this.isTokenValid(token)) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  private isTokenValid(token: string): boolean {
    try {
      const decodedToken: { exp: number } = jwtDecode(token);
      const isExpired = decodedToken.exp * 1000 <= Date.now();
      if (isExpired) {
        console.warn('El token ha expirado');
      }
      return !isExpired;
    } catch (error) {
      console.error('Error al decodificar el token', error);
      return false;
    }
  }
}
