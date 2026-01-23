import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { LoginComponent } from './login-component/login-component';
import { RegisterComponent } from './register-component/register-component';
import { LogoutComponent } from './logout-component/logout-component';
import { TicketComponent } from './ticket-component/ticket-component';
import { DepartmentComponent } from './department-component/department-component';
import { SlaComponent } from './sla-component/sla-component';
import { TickettypeComponent } from './tickettype-component/tickettype-component';
import { EmployeeComponent } from './employee-component/employee-component';
import { NavbarComponent } from './navbar-component/navbar-component';
import { userAccessGuard } from './user-access-guard';
import { TicketReplyComponent } from './ticketreply-component/ticketreply-component';

export const routes: Routes = [

     { path: '', component: HomeComponent },
     { path: 'login', component: LoginComponent },
     { path: 'logout', component: LogoutComponent },
     { path: 'register', component: RegisterComponent },
     {path: 'home',component: HomeComponent,canActivate: [userAccessGuard],data: { roles: ['ADMIN', 'EMPLOYEE'] }},
     {path: 'ticket',component: TicketComponent,canActivate: [userAccessGuard],data: { roles: ['ADMIN', 'EMPLOYEE'] }},
     {path: 'ticketreply',component: TicketReplyComponent,canActivate: [userAccessGuard],data: { roles: ['ADMIN', 'EMPLOYEE'] }},
     {path: 'employee',component: EmployeeComponent,canActivate: [userAccessGuard],data: { roles: ['ADMIN'] }},
     {path: 'department',component: DepartmentComponent,canActivate: [userAccessGuard],data: { roles: ['ADMIN'] }},
     {path: 'tickettype',component: TickettypeComponent,canActivate: [userAccessGuard],data: { roles: ['ADMIN'] }},
     {path: 'sla',component: SlaComponent,canActivate: [userAccessGuard],data: { roles: ['ADMIN'] }},
     { path: 'navbar', component: NavbarComponent },
     { path: '**', redirectTo: 'home' }

];
