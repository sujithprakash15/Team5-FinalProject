import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { LoginComponent } from './login-component/login-component';
import { RegisterComponent } from './register-component/register-component';
import { LogoutComponent } from './logout-component/logout-component';
import { TicketComponent } from './ticket-component/ticket-component';
import { DepartmentComponent } from './department-component/department-component';
import { TicketreplyComponent } from './ticketreply-component/ticketreply-component';
import { SlaComponent } from './sla-component/sla-component';
import { TickettypeComponent } from './tickettype-component/tickettype-component';
import { EmployeeComponent } from './employee-component/employee-component';
import { NavbarComponent } from './navbar-component/navbar-component';

export const routes: Routes = [
     {path: 'login', component: LoginComponent },
     {path: 'logout', component: LogoutComponent },
     {path: 'ticket', component: TicketComponent },
     {path: 'department', component: DepartmentComponent },
     {path: 'ticketreply', component: TicketreplyComponent },
     {path: 'sla', component: SlaComponent },
     {path: 'tickettype', component: TickettypeComponent },
     {path: 'employee', component: EmployeeComponent },
     {path: 'navbar', component: NavbarComponent }
];
