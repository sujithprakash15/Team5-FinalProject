import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-navbar-component',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, RouterLink, FormsModule],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {

  username: string | null = "";
  role: string | null = "";

  isAdmin: boolean = false;
  isEmployee: boolean = false;

  constructor() {
    this.username = sessionStorage.getItem("empId");
    this.role = sessionStorage.getItem("role");
    this.isAdmin = this.role === "ADMIN";
    this.isEmployee = this.role !== "ADMIN";
  }
}
