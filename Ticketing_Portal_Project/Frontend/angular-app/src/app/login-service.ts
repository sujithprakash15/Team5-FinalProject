import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './Models/Employee';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http: HttpClient = inject(HttpClient);

  baseUrl: string = "http://localhost:5253/api/employee/";

  login(empId: string, password: string): Observable<Employee> {

    const employee: Employee = {
      empId: empId,
      empName: "",
      password: password,
      role: "",
      deptId: ""
    };

    return this.http.post<Employee>(
      this.baseUrl + "login",
      employee
    );
  }
}
