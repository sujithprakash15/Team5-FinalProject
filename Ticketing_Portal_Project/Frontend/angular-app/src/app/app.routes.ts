import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { LoginComponent } from './login-component/login-component';
import { RegisterComponent } from './register-component/register-component';
import { LogoutComponent } from './logout-component/logout-component';
<<<<<<< HEAD
import { NavbarComponent } from './navbar-component/navbar-component';
import { userAccessGuard } from './user-access-guard';
import { DepartmentComponent } from './department-component/department-component';

export const routes: Routes = [
    {path: '',component:HomeComponent},
    {path: 'Department',component:DepartmentComponent, canActivate: [userAccessGuard]},
    // {path: 'Course',component:CourseComponent, canActivate: [userAccessGuard]},
    // {path: 'Employee',component:EmployeeComponent, canActivate: [userAccessGuard]},
    // { path: 'SLA', component: SLAComponent, canActivate: [userAccessGuard] },
    // { path: 'Ticket', component: TicketComponent, canActivate: [userAccessGuard] },
    // {path: 'TicketType',component:TicketTypeComponent, canActivate: [userAccessGuard]},
    {path: 'Login',component:LoginComponent},
    {path: 'Register',component:RegisterComponent},
    {path: 'Logout',component:LogoutComponent, canActivate: [userAccessGuard]},
    {path: 'Navbar',component:NavbarComponent}
];
=======
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
>>>>>>> 8fed890133fe179b35fc05436136a630c3bc3ece
