import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './models/Employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  http: HttpClient = inject(HttpClient);
  token: string | null;
  baseUrl: string = "https://ticketportalteam5-hggbcggfgudhf8bg.canadacentral-01.azurewebsites.net/api/employee/";
  httpOptions: { headers: HttpHeaders };

  constructor() {
    this.token = sessionStorage.getItem("token");
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (this.token || '')
      })
    };
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl, this.httpOptions);
  }

  getEmployee(empId: string): Observable<Employee> {
    return this.http.get<Employee>(this.baseUrl + empId, this.httpOptions);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, employee, this.httpOptions);
  }

  updateEmployee(empId: string, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.baseUrl + empId, employee, this.httpOptions);
  }

  deleteEmployee(empId: string): Observable<any> {
    return this.http.delete(this.baseUrl + empId, this.httpOptions);
  }
}