import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { EmployeeService } from '../employee-service';


@Component({
  selector: 'app-navbar-component',
  standalone: true,
  imports: [RouterOutlet,RouterLinkActive, RouterLink],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {
  employeeSvc: EmployeeService = inject(EmployeeService);
  username = sessionStorage.getItem("empId");
}

