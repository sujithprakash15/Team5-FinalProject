import { Routes } from '@angular/router';
import { LoginComponent } from './login-component/login-component';
import { LogoutComponent } from './logout-component/logout-component';
import { TicketComponent } from './ticket-component/ticket-component';
import { DepartmentComponent } from './department-component/department-component';
import { TicketreplyComponent } from './ticketreply-component/ticketreply-component';
import { SlaComponent } from './sla-component/sla-component';

export const routes: Routes = [
     {path: 'login', component: LoginComponent },
     {path: 'logout', component: LogoutComponent },
     {path: 'ticket', component: TicketComponent },
     {path: 'department', component: DepartmentComponent },
     {path: 'ticketreply',component: TicketreplyComponent },
     {path: 'sla', component: SlaComponent }// Placeholder for SLA component
];
