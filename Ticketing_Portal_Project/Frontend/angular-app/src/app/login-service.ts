import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './models/Employee';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  http: HttpClient = inject(HttpClient);
  token;
  baseUrl: string = "http://localhost:5253/api/employee/";
  httpOptions;

  constructor() {
    this.token = sessionStorage.getItem("token");
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
      })
    };
  }

 login(empId: string, password: string): Observable<Employee> {
  //  console.log(this.token);
  return this.http.get<Employee>(this.baseUrl + empId + "/" + password, this.httpOptions);
}
}
