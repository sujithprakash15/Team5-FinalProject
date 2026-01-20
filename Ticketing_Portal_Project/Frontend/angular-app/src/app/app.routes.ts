import { Routes } from '@angular/router';
import { LoginComponent } from './login-component/login-component';
import { LogoutComponent } from './logout-component/logout-component';

export const routes: Routes = [
     {path: 'login', component: LoginComponent },
     {path: 'logout', component: LogoutComponent }
];
