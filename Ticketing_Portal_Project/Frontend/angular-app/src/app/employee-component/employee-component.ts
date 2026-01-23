import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../employee-service'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Employee } from '../models/Employee';
import { DepartmentService } from '../department-service';
import { Department } from '../models/Department';

@Component({
  selector: 'app-employee-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employee-component.html',
  styleUrl: './employee-component.css',
})
export class EmployeeComponent implements OnInit {
  employeeSvc: EmployeeService = inject(EmployeeService);
  departmentSvc: DepartmentService = inject(DepartmentService);
  
  employees: Employee[]; 
  departments: Department[] = [];
  employee: Employee;      
  errMsg: string;          

  constructor() {
    this.employees = [];
    this.employee = new Employee('', '', '', '', '');  
    this.errMsg = '';
  }

  ngOnInit() {
    this.loadDepartments(); // Load departments first
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeSvc.getAllEmployees().subscribe({
      next: (response) => {
        this.employees = response;
        console.log('Employees loaded:', response);
        this.errMsg = '';  
      },
      error: (err) => {
        console.error('Error loading employees:', err);
        this.errMsg = 'Failed to load employees. Please try again.';
      }
    });
  }

  loadDepartments() {
    this.departmentSvc.getAllDepartments().subscribe({
      next: (response) => {
        this.departments = response;
        console.log('Available departments:', response);
        
        // If no departments exist, show an error
        if (this.departments.length === 0) {
          this.errMsg = 'No departments available. Please add departments first.';
        }
      },
      error: (err) => {
        console.error('Error loading departments:', err);
        this.errMsg = 'Failed to load departments. Please check if departments exist.';
      }
    });
  }

  saveEmployee() {
    // Reset error message
    this.errMsg = '';

    // Check if departments are loaded
    if (this.departments.length === 0) {
      this.errMsg = 'No departments available. Please add departments first.';
      return;
    }

    // Validation
    if (!this.employee.empId?.trim()) {
      this.errMsg = "Employee ID is required.";
      return;
    }
    if (this.employee.empId.length !== 4) {
      this.errMsg = "Employee ID must be exactly 4 characters (e.g., E001).";
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
      this.errMsg = "Department is required. Please select a department.";
      return;
    }

    // Check if selected department exists in the loaded departments
    const selectedDeptExists = this.departments.some(dept => dept.deptId === this.employee.deptId);
    if (!selectedDeptExists) {
      this.errMsg = `Selected department (${this.employee.deptId}) does not exist. Please select a valid department.`;
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
        console.error('Error adding employee:', err);
        
        // Provide more specific error messages
        if (err.status === 400) {
          if (err.error?.includes('FOREIGN KEY constraint')) {
            this.errMsg = 'Selected department does not exist. Please choose a valid department from the list.';
          } else if (err.error?.includes('PRIMARY KEY constraint')) {
            this.errMsg = 'Employee ID already exists. Please use a different ID.';
          } else {
            this.errMsg = err.error || 'Invalid data. Please check all fields.';
          }
        } else if (err.status === 401) {
          this.errMsg = 'Unauthorized. Please login again.';
        } else if (err.status === 403) {
          this.errMsg = 'Access denied. You do not have permission to add employees.';
        } else if (err.status === 500) {
          this.errMsg = 'Server error. Please try again later.';
        } else {
          this.errMsg = 'An error occurred. Please try again.';
        }
      }
    });
  }

  newEmployee() {
    this.employee = new Employee('', '', '', '', '');  
  }

  getEmployee() {
    this.errMsg = '';
    
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
        console.log('Employee found:', response);
      },
      error: (err) => {
        console.error('Error fetching employee:', err);
        if (err.status === 404) {
          this.errMsg = `Employee with ID ${this.employee.empId} not found.`;
        } else {
          this.errMsg = err.error || 'Error fetching employee details.';
        }
      }
    });
  }

  updateEmployee() {
    this.errMsg = '';
    
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

    // Check if department exists if it's being updated
    if (this.employee.deptId) {
      const selectedDeptExists = this.departments.some(dept => dept.deptId === this.employee.deptId);
      if (!selectedDeptExists) {
        this.errMsg = `Selected department (${this.employee.deptId}) does not exist.`;
        return;
      }
    }

    this.employeeSvc.updateEmployee(this.employee.empId, this.employee).subscribe({
      next: () => {
        alert('Employee updated successfully');
        this.errMsg = '';
        this.loadEmployees(); 
      },
      error: (err) => {
        console.error('Error updating employee:', err);
        if (err.status === 400) {
          if (err.error?.includes('FOREIGN KEY constraint')) {
            this.errMsg = 'Selected department does not exist.';
          } else {
            this.errMsg = err.error || 'Invalid data for update.';
          }
        } else if (err.status === 404) {
          this.errMsg = `Employee ${this.employee.empId} not found.`;
        } else {
          this.errMsg = err.error || 'Error updating employee.';
        }
      }
    });
  }

  deleteEmployee() {
    this.errMsg = '';
    
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
        console.error('Error deleting employee:', err);
        if (err.status === 404) {
          this.errMsg = `Employee ${this.employee.empId} not found.`;
        } else if (err.status === 400) {
          this.errMsg = err.error || 'Cannot delete employee.';
        } else {
          this.errMsg = err.error || 'Error deleting employee.';
        }
      }
    });
  }
}