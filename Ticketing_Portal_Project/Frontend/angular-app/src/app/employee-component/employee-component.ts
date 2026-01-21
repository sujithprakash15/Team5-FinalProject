import { Component, inject } from '@angular/core';
import { EmployeeService } from '../employee-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Employee } from '../models/Employee';

@Component({
  selector: 'app-employee-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employee-component.html',
  styleUrl: './employee-component.css',
})
export class EmployeeComponent {
  employeeSvc: EmployeeService = inject(EmployeeService); 
  employees: Employee[];   
  employee: Employee;      
  errMsg: string;          
  constructor() {
    this.employees = [];
    this.employee = new Employee('', '', '', '', '');  
    this.errMsg = '';
    this.loadEmployees();  
  }
  loadEmployees() {
    this.employeeSvc.getAllEmployees().subscribe({
      next: (response) => {
        this.employees = response;
        console.log(response);
        this.errMsg = '';  
      },
      error: (err) => {
        this.errMsg = err.error;  
      }
    });
  }
  saveEmployee() {
    this.employeeSvc.addEmployee(this.employee).subscribe({
      next: () => {
        alert('Employee added successfully');
        this.errMsg = '';
        this.newEmployee();  
        this.loadEmployees();  
      },
      error: (err) => {
        this.errMsg = err.error;  
      }
    });
  }
  newEmployee() {
    this.employee = new Employee('', '', '', '', '');  
  }
  getEmployee() {
    this.employeeSvc.getEmployee(this.employee.empId).subscribe({
      next: (response) => {
        this.employee = response;  
        this.errMsg = '';  
      },
      error: (err) => {
        this.errMsg = err.error;  
      }
    });
  }
  updateEmployee() {
    this.employeeSvc.updateEmployee(this.employee.empId, this.employee).subscribe({
      next: () => {
        alert('Employee updated successfully');
        this.errMsg = '';
        this.loadEmployees(); 
      },
      error: (err) => {
        this.errMsg = err.error;  
      }
    });
  }
  deleteEmployee() {
    this.employeeSvc.deleteEmployee(this.employee.empId).subscribe({
      next: () => {
        alert('Employee deleted successfully');
        this.errMsg = '';
        this.loadEmployees(); 
      },
      error: (err) => {
        this.errMsg = err.error;  
      }
    });
  }
}
