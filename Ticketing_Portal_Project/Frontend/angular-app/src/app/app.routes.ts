import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { LoginComponent } from './login-component/login-component';
import { RegisterComponent } from './register-component/register-component';
import { LogoutComponent } from './logout-component/logout-component';
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