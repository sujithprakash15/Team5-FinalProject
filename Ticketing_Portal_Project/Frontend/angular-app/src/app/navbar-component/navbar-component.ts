import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { EmployeeService } from '../employee-service';
import { AuthService } from '../auth-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar-component',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, RouterLink, FormsModule, AsyncPipe],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent implements OnInit {
  employeeSvc: EmployeeService = inject(EmployeeService);
  authService: AuthService = inject(AuthService);

  username: string = "";
  role: string = "";
  empId: string = "";

  isAdmin: boolean = false;
  isEmployee: boolean = false;

  isLoggedIn$ = this.authService.isLoggedIn$;

  ngOnInit(): void {
    this.loadUserData();
    
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.loadUserData();
      } else {
        this.clearUserData();
      }
    });
  }

  private loadUserData(): void {
    this.empId = sessionStorage.getItem("empId") || "";
    this.role = sessionStorage.getItem("role") || "";
    
    this.isAdmin = this.role === "ADMIN";
    this.isEmployee = !this.isAdmin && this.role !== "";

    this.username = sessionStorage.getItem("empName") || "";
    
    if (this.empId && !this.username) {
      this.fetchEmployeeDetails();
    }
  }

  private fetchEmployeeDetails(): void {
    this.employeeSvc.getEmployee(this.empId).subscribe({
      next: (employee) => {
        this.username = employee.empName;
        sessionStorage.setItem("empName", employee.empName);
      },
      error: (error) => {
        console.error('Failed to fetch employee:', error);
        this.username = "User";
      }
    });
  }

  private clearUserData(): void {
    this.username = "";
    this.role = "";
    this.empId = "";
    this.isAdmin = false;
    this.isEmployee = false;
  }

  logout(): void {
    this.authService.logout();
  }
}