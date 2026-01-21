import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { LoginComponent } from './login-component/login-component';
import { RegisterComponent } from './register-component/register-component';
import { LogoutComponent } from './logout-component/logout-component';
import { TicketComponent } from './ticket-component/ticket-component';
import { DepartmentComponent } from './department-component/department-component';
<<<<<<< HEAD
import { TicketreplyComponent } from './ticketreply-component/ticketreply-component';
import { SlaComponent } from './sla-component/sla-component';
=======
import { EmployeeComponent } from './employee-component/employee-component';
>>>>>>> 5175a898bde049a9286ccf638fa0c9dae124cdd1

export const routes: Routes = [
     {path: 'login', component: LoginComponent },
     {path: 'logout', component: LogoutComponent },
     {path: 'ticket', component: TicketComponent },
     {path: 'department', component: DepartmentComponent },
<<<<<<< HEAD
     {path: 'ticketreply',component: TicketreplyComponent },
     {path: 'sla', component: SlaComponent }// Placeholder for SLA component
=======
     {path: 'employee', component: EmployeeComponent}
>>>>>>> 5175a898bde049a9286ccf638fa0c9dae124cdd1
];
