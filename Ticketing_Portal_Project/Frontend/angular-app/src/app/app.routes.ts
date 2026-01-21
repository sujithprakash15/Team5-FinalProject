import { Routes } from '@angular/router';
import { LoginComponent } from './login-component/login-component';
import { LogoutComponent } from './logout-component/logout-component';
import { TicketComponent } from './ticket-component/ticket-component';
import { DepartmentComponent } from './department-component/department-component';
import { EmployeeComponent } from './employee-component/employee-component';

export const routes: Routes = [
     {path: 'login', component: LoginComponent },
     {path: 'logout', component: LogoutComponent },
     {path: 'ticket', component: TicketComponent },
     {path: 'department', component: DepartmentComponent },
     {path: 'employee', component: EmployeeComponent}
];
