import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  clear(): void {
    localStorage.clear();
  }


  isAuthenticated(): boolean {
    return localStorage.getItem('token') != null;
  }


  loginAuthentication(userType) {
    localStorage.setItem('token', btoa(userType));
    window.location.reload();
    this.router.navigate(['/dashboard']);

  }

  logout(): void {
    this.clear();
    this.router.navigate(['/login']);
  }

}
