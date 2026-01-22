import { Component, inject } from '@angular/core';
import { TickettypeService } from '../tickettype-service';
import { TicketType } from '../models/TicketType';
import { Department } from '../models/Department';
import { SLA } from '../models/SLA';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DepartmentService } from '../department-service';
import { SlaService } from '../sla-service';

@Component({
  selector: 'app-tickettype-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tickettype-component.html',
  styleUrl: './tickettype-component.css',
})
export class TickettypeComponent {

  ticketTypeSvc: TickettypeService = inject(TickettypeService);
  departmentSvc: DepartmentService = inject(DepartmentService);
  slaSvc: SlaService = inject(SlaService);

  ticketTypes: TicketType[];
  ticketType: TicketType;
  errMsg: string;

  departments: Department[] = [];
  slas: SLA[] = [];

  constructor() {
    this.ticketTypes = [];
    this.ticketType = new TicketType('', '', '', '', '');
    this.errMsg = '';
    this.loadTicketTypes();
    this.loadDepartments();
    this.loadSLAs();
  }

  loadDepartments() {
    this.departmentSvc.getAllDepartments().subscribe({
      next: (response:Department[]) => {
        this.departments = response;
      },
      error: (err) => {
        console.error('Error loading departments:', err);
        this.errMsg = 'Failed to load departments.';
      }
    });
  }

  loadSLAs() {
    this.slaSvc.getAllSlas().subscribe({
      next: (response:SLA[]) => {
        this.slas = response;
      },
      error: (err) => {
        console.error('Error loading SLAs:', err);
        this.errMsg = 'Failed to load SLAs.';
      }
    });
  }

  loadTicketTypes() {
    this.ticketTypeSvc.getAllTicketTypes().subscribe({
      next: (response) => {
        this.ticketTypes = response;
        this.errMsg = '';
      },
      error: (err) => (this.errMsg = err.error),
    });
  }

  saveTicketType() {
    if (!this.ticketType.ticketTypeId?.trim() &&
      !this.ticketType.typeName?.trim() &&
      !this.ticketType.description?.trim() &&
      !this.ticketType.slaId?.trim() &&
      !this.ticketType.deptId?.trim()) {
      this.errMsg = "Please fill in at least one field before adding.";
      return;
    }

    if (!this.ticketType.ticketTypeId?.trim()) {
      this.errMsg = "Ticket Type ID is required.";
      return;
    }
    if (this.ticketType.ticketTypeId.length !== 4) {
      this.errMsg = "Ticket Type ID must be exactly 4 characters.";
      return;
    }

    if (!this.ticketType.typeName?.trim()) {
      this.errMsg = "Type Name is required.";
      return;
    }
    if (this.ticketType.typeName.length > 30) {
      this.errMsg = "Type Name cannot exceed 30 characters.";
      return;
    }

    if (this.ticketType.description && this.ticketType.description.length > 100) {
      this.errMsg = "Description cannot exceed 100 characters.";
      return;
    }

    if (!this.ticketType.slaId?.trim()) {
      this.errMsg = "SLA is required.";
      return;
    }

    if (!this.ticketType.deptId?.trim()) {
      this.errMsg = "Department is required.";
      return;
    }

    this.ticketTypeSvc.addTicketType(this.ticketType).subscribe({
      next: () => {
        alert('Ticket Type added successfully');
        this.errMsg = '';
        this.newTicketType();
        this.loadTicketTypes();
      },
      error: (err) => (this.errMsg = err.error),
    });
  }

  newTicketType() {
    this.ticketType = new TicketType('', '', '', '', '');
  }

  getTicketType() {
    if (!this.ticketType.ticketTypeId?.trim()) {
      this.errMsg = "Please enter a Ticket Type ID to search.";
      return;
    }
    if (this.ticketType.ticketTypeId.length !== 4) {
      this.errMsg = "Ticket Type ID must be exactly 4 characters.";
      return;
    }

    this.ticketTypeSvc
      .getTicketType(this.ticketType.ticketTypeId)
      .subscribe({
        next: (response) => {
          this.ticketType = response;
          this.errMsg = '';
        },
        error: (err) => (this.errMsg = err.error),
      });
  }

  updateTicketType() {
    if (!this.ticketType.ticketTypeId?.trim()) {
      this.errMsg = "Cannot update: Ticket Type ID is required.";
      return;
    }
    if (this.ticketType.ticketTypeId.length !== 4) {
      this.errMsg = "Ticket Type ID must be exactly 4 characters.";
      return;
    }

    if (this.ticketType.typeName && this.ticketType.typeName.length > 30) {
      this.errMsg = "Type Name cannot exceed 30 characters.";
      return;
    }

    if (this.ticketType.description && this.ticketType.description.length > 100) {
      this.errMsg = "Description cannot exceed 100 characters.";
      return;
    }

    this.ticketTypeSvc
      .updateTicketType(
        this.ticketType.ticketTypeId,
        this.ticketType
      )
      .subscribe({
        next: () => {
          alert('Ticket Type updated successfully');
          this.errMsg = '';
          this.loadTicketTypes();
        },
        error: (err) => (this.errMsg = err.error),
      });
  }

  deleteTicketType() {
    if (!this.ticketType.ticketTypeId?.trim()) {
      this.errMsg = "Please enter a Ticket Type ID to delete.";
      return;
    }
    if (this.ticketType.ticketTypeId.length !== 4) {
      this.errMsg = "Ticket Type ID must be exactly 4 characters.";
      return;
    }

    if (!confirm(`Are you sure you want to delete ticket type ${this.ticketType.ticketTypeId}?`)) {
      return;
    }

    this.ticketTypeSvc
      .deleteTicketType(this.ticketType.ticketTypeId)
      .subscribe({
        next: () => {
          alert('Ticket Type deleted successfully');
          this.errMsg = '';
          this.loadTicketTypes();
        },
        error: (err) => (this.errMsg = err.error),
      });
  }
}
