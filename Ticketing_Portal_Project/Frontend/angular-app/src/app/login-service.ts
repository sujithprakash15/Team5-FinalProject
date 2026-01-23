import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './models/Employee';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  http: HttpClient = inject(HttpClient);

  baseUrl: string = "http://localhost:5253/api/employee/";

  constructor() {}

  login(empId: string, password: string): Observable<Employee> {

    return this.http.get<Employee>(
      this.baseUrl + empId + "/" + password
    );
  }
}
