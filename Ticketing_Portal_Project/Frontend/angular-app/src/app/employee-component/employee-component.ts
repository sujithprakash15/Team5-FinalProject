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
    if (!this.employee.empId?.trim() && 
        !this.employee.empName?.trim() && 
        !this.employee.password?.trim() && 
        !this.employee.role?.trim() && 
        !this.employee.deptId?.trim()) {
      this.errMsg = "Please fill in at least one field before adding.";
      return;
    }

    if (!this.employee.empId?.trim()) {
      this.errMsg = "Employee ID is required.";
      return;
    }
    if (this.employee.empId.length !== 4) {
      this.errMsg = "Employee ID must be exactly 4 characters.";
      return;
    }
    
    if (!this.employee.empName?.trim()) {
      this.errMsg = "Employee Name is required.";
      return;
    }
    if (this.employee.empName.length > 50) {
      this.errMsg = "Employee Name cannot exceed 50 characters.";
      return;
    }
    
    if (!this.employee.password?.trim()) {
      this.errMsg = "Password is required.";
      return;
    }
    if (this.employee.password.length > 15) {
      this.errMsg = "Password cannot exceed 15 characters.";
      return;
    }
    if (this.employee.password.length < 6) {
      this.errMsg = "Password must be at least 6 characters.";
      return;
    }
    
    if (!this.employee.role?.trim()) {
      this.errMsg = "Role is required.";
      return;
    }
    if (this.employee.role.length > 20) {
      this.errMsg = "Role cannot exceed 20 characters.";
      return;
    }
    
    if (!this.employee.deptId?.trim()) {
      this.errMsg = "Department ID is required.";
      return;
    }
    if (this.employee.deptId.length !== 4) {
      this.errMsg = "Department ID must be exactly 4 characters.";
      return;
    }

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
    if (!this.employee.empId?.trim()) {
      this.errMsg = "Please enter an Employee ID to search.";
      return;
    }
    if (this.employee.empId.length !== 4) {
      this.errMsg = "Employee ID must be exactly 4 characters.";
      return;
    }

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
    if (!this.employee.empId?.trim()) {
      this.errMsg = "Cannot update: Employee ID is required.";
      return;
    }
    if (this.employee.empId.length !== 4) {
      this.errMsg = "Employee ID must be exactly 4 characters.";
      return;
    }
    
    if (this.employee.empName && this.employee.empName.length > 50) {
      this.errMsg = "Employee Name cannot exceed 50 characters.";
      return;
    }
    
    if (this.employee.password && this.employee.password.length > 15) {
      this.errMsg = "Password cannot exceed 15 characters.";
      return;
    }
    
    if (this.employee.role && this.employee.role.length > 20) {
      this.errMsg = "Role cannot exceed 20 characters.";
      return;
    }
    
    if (this.employee.deptId && this.employee.deptId.length !== 4) {
      this.errMsg = "Department ID must be exactly 4 characters.";
      return;
    }

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
    if (!this.employee.empId?.trim()) {
      this.errMsg = "Please enter an Employee ID to delete.";
      return;
    }
    if (this.employee.empId.length !== 4) {
      this.errMsg = "Employee ID must be exactly 4 characters.";
      return;
    }

    if (!confirm(`Are you sure you want to delete employee ${this.employee.empId}?`)) {
      return;
    }

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