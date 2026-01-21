import { Component, inject } from '@angular/core';
import { RegisterService } from '../register-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Employee } from '../Models/Employee';

@Component({
  selector: 'app-register-component',
  imports: [FormsModule,CommonModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
})
export class RegisterComponent {
  regsiterSvc: RegisterService = inject(RegisterService);
  user: Employee;
  errMsg: string;
  constructor() {
    this.user = new Employee("","","","","");
    this.errMsg = "";
  }
  register() {
    this.regsiterSvc.register(this.user).subscribe({
      next: (response: any) => {
        // console.log(response);
        alert("New user registered");
        this.errMsg = "";
      },
     error: (err) => {this.errMsg = err.error ; console.log(err);}
    });
  }
}
