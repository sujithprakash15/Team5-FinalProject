import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { LoginService } from '../login-service';
import { Employee } from '../models/Employee';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export class LoginComponent {

  loginSvc: LoginService = inject(LoginService);
  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);

  empId: string;
  password: string;
  user!: Employee;
  errMsg: string;

  constructor() {
    this.empId = "";
    this.password = "";
    this.errMsg = "";
  }

  login() {
    this.errMsg = "";

    if (!this.empId?.trim()) {
      this.errMsg = "Employee ID is required.";
      return;
    }
    
    if (this.empId.length !== 4) {
      this.errMsg = "Employee ID must be exactly 4 characters.";
      return;
    }
    
    if (!this.password?.trim()) {
      this.errMsg = "Password is required.";
      return;
    }
    
    if (this.password.length < 6) {
      this.errMsg = "Password must be at least 6 characters.";
      return;
    }
    
    if (this.password.length > 15) {
      this.errMsg = "Password cannot exceed 15 characters.";
      return;
    }
    
    this.loginSvc.login(this.empId, this.password).subscribe({
      next: (response: Employee) => {
        this.user = response;

        const role = this.user.role && this.user.role.trim() !== ""
          ? this.user.role.toUpperCase()
          : "EMPLOYEE";
        
        sessionStorage.setItem("empName", this.user.empName);
        

        this.authService.loginSuccess(this.user.empId, role);
        
        alert("Login successfully");
      },
      error: (err) => {
        if (err.status === 401) {
          this.errMsg = "Invalid credentials. Please check your Employee ID and password.";
        } else if (err.status === 404) {
          this.errMsg = "Employee not found. Please check your Employee ID.";
        } else if (err.status === 0) {
          this.errMsg = "Unable to connect to server. Please check your network connection.";
        } else {
          this.errMsg = err.error?.message || err.error || "An error occurred during login. Please try again.";
        }
        console.log(err);
      }
    });
  }
}