import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { EmployeeService } from './employee-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  private router = inject(Router);

  baseUrl: string = "https://ticketportalteam5-hggbcggfgudhf8bg.canadacentral-01.azurewebsites.net/api/auth/";
  userName: string = "admin@ey.com";
  role: string = "admin";
  secretKey: string = "we are team5 and we think we did our best in this project";

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor() {
    // CHANGED: Check for both empId to determine login state
    const empId = sessionStorage.getItem("empId");
    if (empId) {
      this.isLoggedInSubject.next(true);
    }
  }

  getToken(): Observable<string> {
    return this.http.get<string>(
      this.baseUrl + this.userName + "/" + this.role + "/" + this.secretKey,
      { responseType: 'text' as 'json' }
    );
  }

  // CHANGED: Added role parameter to store both empId and role
  loginSuccess(empId: string, role: string) {
    sessionStorage.setItem("empId", empId);
    sessionStorage.setItem("role", role);
    this.isLoggedInSubject.next(true);
    this.router.navigate(['/home']);
  }

  logout() {
    sessionStorage.clear();
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/logout']);
  }

  // ADDED: Helper method to get current user role
  getCurrentUserRole(): string | null {
    return sessionStorage.getItem("role");
  }

  // ADDED: Helper method to get current user ID
  getCurrentUserId(): string | null {
    return sessionStorage.getItem("empId");
  }
}