import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { LoginService } from '../login-service';
import { Employee } from '../models/Employee';

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

    this.loginSvc.login(this.empId, this.password).subscribe({

      next: (response: Employee) => {

        this.user = response;

        sessionStorage.setItem("empId", this.user.empId);
        sessionStorage.setItem("role", this.user.role);
        alert("Login succesfully")
        this.errMsg = "";
        this.router.navigate(['/']);
      },

      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
  }
}
