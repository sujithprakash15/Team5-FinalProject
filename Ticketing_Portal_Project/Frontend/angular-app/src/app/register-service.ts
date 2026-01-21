import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './Models/Employee';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  http:HttpClient = inject(HttpClient);
  baseUrl:string = "http://localhost:5170/api/employee/";
  register(user:Employee):Observable<any>{
    console.log(user);
    
    return this.http.post(this.baseUrl,user);
  }
}
