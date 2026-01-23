import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  http: HttpClient = inject(HttpClient);

  baseUrl: string = "https://ticketportalteam5-hggbcggfgudhf8bg.canadacentral-01.azurewebsites.net/api/auth/";
  userName: string = "admin@ey.com";
  role: string = "admin";
  secretKey: string = "we are team5 and we think we did our best in this project";

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  isLoggedIn$: Observable<boolean> =
    this.isLoggedInSubject.asObservable();

  constructor() {
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

  loginSuccess() {
    this.isLoggedInSubject.next(true);
  }

  logout() {
    sessionStorage.clear();
    this.isLoggedInSubject.next(false);
  }
}
