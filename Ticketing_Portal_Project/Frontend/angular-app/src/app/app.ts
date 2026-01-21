import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login-component/login-component';
import { LogoutComponent } from './logout-component/logout-component';
import { TicketComponent } from './ticket-component/ticket-component';
import { DepartmentComponent } from './department-component/department-component';
import { TicketreplyComponent } from './ticketreply-component/ticketreply-component';
import { EmployeeComponent } from './employee-component/employee-component';
import { SlaComponent } from './sla-component/sla-component';
import { TickettypeComponent } from './tickettype-component/tickettype-component';
import { NavbarComponent } from './navbar-component/navbar-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LoginComponent, LogoutComponent, TicketComponent, DepartmentComponent, TicketreplyComponent, SlaComponent, TickettypeComponent, EmployeeComponent, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-app');
}
