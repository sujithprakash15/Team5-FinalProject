import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http: HttpClient= inject(HttpClient);
  baseUrl: string = "http://localhost:5253/api/auth/";
  userName: string = "admin@ey.com";
  role: string = "admin";
  secretKey: string = "we are team5 and we think we did our best in this project";
  getToken(): Observable<string> {
    return this.http.get<string>(this.baseUrl + this.userName + "/" +this.role +"/" + this.secretKey,{responseType:'text' as 'json'})
  }
}
