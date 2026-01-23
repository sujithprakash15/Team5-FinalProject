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

  empId: string = "";
  password: string = "";

  user!: Employee;
  errMsg: string = "";

  login() {

    this.loginSvc.login(this.empId, this.password).subscribe({

      next: (response: Employee) => {

        this.user = response;

        sessionStorage.setItem("empId", this.user.empId);
        const role =
          this.user.role && this.user.role.trim() !== ""
            ? this.user.role.toUpperCase()
            : "EMPLOYEE";

        sessionStorage.setItem("role", role);

        alert("Login successfully");

        this.router.navigate(['/home']);
      },

      error: (err) => {
        this.errMsg = err.error;
        console.error(err);
      }
    });
  }
}
