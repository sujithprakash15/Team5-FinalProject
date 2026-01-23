import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from './models/Department';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {

  http: HttpClient = inject(HttpClient);

  baseUrl: string = "http://localhost:5253/api/department/";

  getAllDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.baseUrl);
  }

  getDepartment(deptId: string): Observable<Department> {
    return this.http.get<Department>(this.baseUrl + deptId);
  }

  addDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(this.baseUrl, department);
  }

  updateDepartment(deptId: string, department: Department): Observable<Department> {
    return this.http.put<Department>(this.baseUrl + deptId, department);
  }

  deleteDepartment(deptId: string): Observable<any> {
    return this.http.delete(this.baseUrl + deptId);
  }
}
