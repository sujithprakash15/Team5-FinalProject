import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service'; 

@Component({
  selector: 'app-logout-component',
  imports: [],
  templateUrl: './logout-component.html',
  styleUrl: './logout-component.css'
})
export class LogoutComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  
  constructor() {
    this.authService.logout();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2500);
  }
}