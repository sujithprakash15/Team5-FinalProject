// import { Component, inject } from '@angular/core';
// import { DepartmentService } from '../department-service';
// import { Department } from '../models/Department';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-department-component',
//   standalone: true,
//   imports: [FormsModule, CommonModule],
//   templateUrl: './department-component.html',
//   styleUrl: './department-component.css',
// })
// export class DepartmentComponent {

//   departmentSvc: DepartmentService = inject(DepartmentService);

//   departments: Department[];
//   department: Department;
//   errMsg: string;

//   constructor() {
//     this.departments = [];
//     this.department = new Department("","","");
//     this.errMsg = "";
//     this.loadDepartments();
//   }

//   loadDepartments() {
//     this.departmentSvc.getAllDepartments().subscribe({
//       next: (response) => {
//         this.departments = response;
//         console.log(response);
//         this.errMsg = '';
//       },
//       error: (err) => {
//         this.errMsg = err.error;
//         console.log(err);
//       }
//     });
//   }

//   saveDepartment() {
//     this.departmentSvc.addDepartment(this.department).subscribe({
//       next: () => {
//         alert('Department added successfully');
//         this.errMsg = '';
//         this.newDepartment();
//         this.loadDepartments();
//       },
//       error: (err) => {
//         this.errMsg = err.error;
//         console.log(err);
//       }
//     });
//   }

//   newDepartment() {
//     this.department = new Department('', '','');
//   }

//   getDepartment() {
//     this.departmentSvc.getDepartment(this.department.deptId).subscribe({
//       next: (response) => {
//         this.department = response;
//         this.errMsg = '';
//       },
//       error: (err) => {
//         this.errMsg = err.error;
//         console.log(err);
//       }
//     });
//   }

//   updateDepartment() {
//     this.departmentSvc
//       .updateDepartment(this.department.deptId, this.department)
//       .subscribe({
//         next: () => {
//           alert('Department updated successfully');
//           this.errMsg = '';
//           this.loadDepartments();
//         },
//         error: (err) => {
//         this.errMsg = err.error;
//         console.log(err);
//       }
//       });
//   }

//   deleteDepartment() {
//     this.departmentSvc
//       .deleteDepartment(this.department.deptId)
//       .subscribe({
//         next: () => {
//           alert('Department deleted successfully');
//           this.errMsg = '';
//           this.loadDepartments();
//         },
//         error: (err) => {
//         this.errMsg = err.error;
//         console.log(err);
//       }
//       });
//   }
// }



import { Component, inject, OnInit } from '@angular/core';
import { DepartmentService } from '../department-service';
import { Department } from '../models/Department';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-department-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './department-component.html',
  styleUrl: './department-component.css',
})
export class DepartmentComponent implements OnInit {
  departmentSvc: DepartmentService = inject(DepartmentService);

  departments: Department[] = [];
  department: Department = new Department('', '', '');
  errMsg: string = '';

  ngOnInit() {
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentSvc.getAllDepartments().subscribe({
      next: (response) => {
        this.departments = response;
        this.errMsg = '';
      },
      error: (err) => {
        console.error('Error loading departments:', err);
        this.errMsg = 'Failed to load departments. Please try again.';
      }
    });
  }

  saveDepartment() {
    this.errMsg = '';

    // Validation
    if (!this.department.deptId?.trim()) {
      this.errMsg = 'Department ID is required.';
      return;
    }

    if (this.department.deptId.length > 4) {
      this.errMsg = 'Department ID cannot exceed 4 characters.';
      return;
    }

    if (!this.department.deptName?.trim()) {
      this.errMsg = 'Department Name is required.';
      return;
    }

    if (this.department.deptName.length > 50) {
      this.errMsg = 'Department Name cannot exceed 50 characters.';
      return;
    }

    if (this.department.description && this.department.description.length > 100) {
      this.errMsg = 'Description cannot exceed 100 characters.';
      return;
    }

    this.departmentSvc.addDepartment(this.department).subscribe({
      next: () => {
        alert('Department added successfully');
        this.newDepartment();
        this.loadDepartments();
      },
      error: (err) => {
        console.error('Error adding department:', err);

        if (err.status === 400) {
          if (err.error?.includes('PRIMARY KEY')) {
            this.errMsg = 'Department ID already exists.';
          } else {
            this.errMsg = err.error || 'Invalid department data.';
          }
        }
        else if (err.status === 409) {
          this.errMsg = 'Duplicate department entry.';
        }
        else if (err.status === 500) {
          this.errMsg = 'Server error while adding department.';
        }
        else {
          this.errMsg = 'Failed to add department.';
        }
      }
    });
  }

  newDepartment() {
    this.department = new Department('', '', '');
    this.errMsg = '';
  }

  getDepartment() {
    this.errMsg = '';

    if (!this.department.deptId?.trim()) {
      this.errMsg = 'Please enter Department ID to search.';
      return;
    }

    this.departmentSvc.getDepartment(this.department.deptId).subscribe({
      next: (response) => {
        this.department = response;
        this.errMsg = '';
      },
      error: (err) => {
        console.error('Error fetching department:', err);
        if (err.status === 404) {
          this.errMsg = `Department ${this.department.deptId} not found.`;
        } else {
          this.errMsg = err.error || 'Error fetching department.';
        }
      }
    });
  }

  updateDepartment() {
    this.errMsg = '';

    if (!this.department.deptId?.trim()) {
      this.errMsg = 'Department ID is required for update.';
      return;
    }

    if (!this.department.deptName?.trim()) {
      this.errMsg = 'Department Name is required.';
      return;
    }

    if (this.department.deptName.length > 50) {
      this.errMsg = 'Department Name cannot exceed 50 characters.';
      return;
    }

    if (this.department.description && this.department.description.length > 100) {
      this.errMsg = 'Description cannot exceed 100 characters.';
      return;
    }

    this.departmentSvc.updateDepartment(this.department.deptId, this.department).subscribe({
      next: () => {
        alert('Department updated successfully');
        this.loadDepartments();
      },
      error: (err) => {
        console.error('Error updating department:', err);
        if (err.status === 404) {
          this.errMsg = `Department ${this.department.deptId} not found.`;
        } else {
          this.errMsg = err.error || 'Error updating department.';
        }
      }
    });
  }

  deleteDepartment() {
    this.errMsg = '';

    if (!this.department.deptId?.trim()) {
      this.errMsg = 'Please enter Department ID to delete.';
      return;
    }

    if (!confirm(`Are you sure you want to delete Department ${this.department.deptId}?`)) {
      return;
    }

    this.departmentSvc.deleteDepartment(this.department.deptId).subscribe({
      next: () => {
        alert('Department deleted successfully');
        this.newDepartment();
        this.loadDepartments();
      },
      error: (err) => {
        console.error('Error deleting department:', err);
        if (err.status === 404) {
          this.errMsg = `Department ${this.department.deptId} not found.`;
        } else {
          this.errMsg = err.error || 'Error deleting department.';
        }
      }
    });
  }
}
