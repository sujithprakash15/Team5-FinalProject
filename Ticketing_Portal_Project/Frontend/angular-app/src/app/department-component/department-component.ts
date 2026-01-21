import { Component, inject } from '@angular/core';
import { DepartmentService } from '../department-service';
import { Department } from '../models/department';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-department-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './department-component.html',
  styleUrl: './department-component.css',
})
export class DepartmentComponent {

  departmentSvc: DepartmentService = inject(DepartmentService);

  departments: Department[];
  department: Department;
  errMsg: string;

  constructor() {
    this.departments = [];
    this.department = new Department("","","");
    this.errMsg = "";
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentSvc.getAllDepartments().subscribe({
      next: (response) => {
        this.departments = response;
        console.log(response);
        this.errMsg = '';
      },
      error: (err) => (this.errMsg = err.error),
    });
  }

  saveDepartment() {
    this.departmentSvc.addDepartment(this.department).subscribe({
      next: () => {
        alert('Department added successfully');
        this.errMsg = '';
        this.newDepartment();
        this.loadDepartments();
      },
      error: (err) => (this.errMsg = err.error),
    });
  }

  newDepartment() {
    this.department = new Department('', '','');
  }

  getDepartment() {
    this.departmentSvc.getDepartment(this.department.deptId).subscribe({
      next: (response) => {
        this.department = response;
        this.errMsg = '';
      },
      error: (err) => (this.errMsg = err.error),
    });
  }

  updateDepartment() {
    this.departmentSvc
      .updateDepartment(this.department.deptId, this.department)
      .subscribe({
        next: () => {
          alert('Department updated successfully');
          this.errMsg = '';
          this.loadDepartments();
        },
        error: (err) => (this.errMsg = err.error),
      });
  }

  deleteDepartment() {
    this.departmentSvc
      .deleteDepartment(this.department.deptId)
      .subscribe({
        next: () => {
          alert('Department deleted successfully');
          this.errMsg = '';
          this.loadDepartments();
        },
        error: (err) => (this.errMsg = err.error),
      });
  }
}
