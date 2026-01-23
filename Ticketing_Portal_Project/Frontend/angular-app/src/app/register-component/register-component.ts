import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../employee-service';
import { DepartmentService } from '../department-service';
import { Employee } from '../models/Employee';
import { Department } from '../models/Department';

@Component({
  selector: 'app-register-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
})
export class RegisterComponent {

  empSvc = inject(EmployeeService);
  depSvc = inject(DepartmentService);

  employee: Employee = new Employee('', '', '', '', '');
  departments: Department[] = [];
  errMsg: string = '';

  constructor() {
    this.getAllDepartments();
  }

  getAllDepartments(): void {
    this.depSvc.getAllDepartments().subscribe({
      next: (res: Department[]) => {
        this.departments = res;
        this.errMsg = '';
      },
      error: (err) => {
        console.error(err);
        this.errMsg = "Unable to load departments";
      }
    });
  }

  addEmployee(): void {

    if (this.employee.empId.trim() === "") {
      this.errMsg = "Enter Employee ID";
      return;
    }

    if (this.employee.empName.trim() === "") {
      this.errMsg = "Enter Employee Name";
      return;
    }

    if (this.employee.password.trim() === "") {
      this.errMsg = "Enter password";
      return;
    }

    if (!this.employee.deptId) {
      this.errMsg = "Select department";
      return;
    }

    this.empSvc.addEmployee(this.employee).subscribe({
      next: () => {
        alert('Employee registered successfully!');
        this.employee = new Employee('', '', '', '', '');
        this.errMsg = '';
      },
      error: (err) => {
        console.error(err);
        this.errMsg = err.error;
      }
    });
  }
}
