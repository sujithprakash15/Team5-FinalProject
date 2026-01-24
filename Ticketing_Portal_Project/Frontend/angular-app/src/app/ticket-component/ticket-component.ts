import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TicketService } from '../ticket-service';
import { Ticket } from '../models/Ticket';
import { Employee } from '../models/Employee';
import { TicketType } from '../models/TicketType';

@Component({
  selector: 'app-ticket-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ticket-component.html',
  styleUrl: './ticket-component.css',
})
export class TicketComponent implements OnInit {

  ticketSvc: TicketService = inject(TicketService);

  tickets: Ticket[] = [];
  allTickets: Ticket[] = [];
  ticket: Ticket = new Ticket("", "", "", "", new Date(), "Open", "", "");
  viewMode: string = "created";
  ticketTypes: any[] = [];
  employees: Employee[] = [];
  errMsg: string = "";

  role: string = "";
  loggedEmpId: string = "";

  selectedStatus: string = "";
  filterEmpId: string = "";
  filterTicketType: string = "";

  constructor() {
    this.loggedEmpId = sessionStorage.getItem("empId") || "";
    this.role = sessionStorage.getItem("role") || "";
  }

  ngOnInit(): void {
    if (this.role !== "ADMIN") {
      this.ticket.createdByEmpId = this.loggedEmpId;
    }

    this.loadDropdownData();
    this.showAllTickets();
  }

  loadDropdownData(): void {
    this.ticketSvc.getAllTicketTypes().subscribe({
      next: res => {
        this.ticketTypes = res;
        console.log('Ticket types loaded:', res);
      },
      error: err => {
        console.error('Error loading ticket types:', err);
        this.errMsg = 'Failed to load ticket types. Please try again.';
      }
    });

    if (this.role === "ADMIN") {
      this.ticketSvc.getAllEmployees().subscribe({
        next: res => {
          this.employees = res;
          console.log('Employees loaded for admin:', res);
        },
        error: err => {
          console.error('Error loading employees:', err);
          this.errMsg = 'Failed to load employees. Please try again.';
        }
      });
    }
  }

  showAllTickets(): void {
    this.ticketSvc.getAllTickets().subscribe({
      next: (res: Ticket[]) => {
        if (this.role === "ADMIN") {
          this.tickets = res;
        } else {
          if (this.viewMode === "created") {
            this.tickets = res.filter(
              t => t.createdByEmpId === this.loggedEmpId
            );
          } else {
            this.tickets = res.filter(
              t => t.assignedToEmpId === this.loggedEmpId
            );
          }
        }

        this.allTickets = this.tickets;
        this.errMsg = "";
      },
      error: err => {
        console.error('Error loading tickets:', err);
        if (err.status === 401) {
          this.errMsg = 'Unauthorized. Please login again.';
        } else if (err.status === 403) {
          this.errMsg = 'Access denied. You do not have permission to view tickets.';
        } else if (err.status === 500) {
          this.errMsg = 'Server error. Please try again later.';
        } else {
          this.errMsg = err.error || 'Failed to load tickets. Please try again.';
        }
      }
    });
  }

  switchView(mode: string): void {
    this.viewMode = mode;
    this.showAllTickets();
  }

  showTicket(): void {
    this.errMsg = '';
    
    if (!this.ticket.ticketId?.trim()) {
      this.errMsg = "Please enter a Ticket ID to search.";
      return;
    }
    if (this.ticket.ticketId.length !== 4) {
      this.errMsg = "Ticket ID must be exactly 4 characters.";
      return;
    }

    this.ticketSvc.getTicket(this.ticket.ticketId).subscribe({
      next: res => {
        this.ticket = res;
        this.errMsg = "";
      },
      error: err => {
        console.error('Error fetching ticket:', err);
        if (err.status === 404) {
          this.errMsg = `Ticket with ID ${this.ticket.ticketId} not found.`;
        } else if (err.status === 401) {
          this.errMsg = 'Unauthorized. Please login again.';
        } else if (err.status === 403) {
          this.errMsg = 'Access denied. You do not have permission to view this ticket.';
        } else {
          this.errMsg = err.error || 'Error fetching ticket details.';
        }
      }
    });
  }

  addTicket(): void {
    this.errMsg = '';

    if (!this.ticket.title?.trim()) {
      this.errMsg = "Ticket Title is required.";
      return;
    }
    if (this.ticket.title.length > 15) {
      this.errMsg = "Ticket Title cannot exceed 15 characters.";
      return;
    }
    
    if (!this.ticket.description?.trim()) {
      this.errMsg = "Description is required.";
      return;
    }
    if (this.ticket.description.length > 100) {
      this.errMsg = "Description cannot exceed 100 characters.";
      return;
    }
    
    if (!this.ticket.ticketTypeId?.trim()) {
      this.errMsg = "Ticket Type is required. Please select a ticket type.";
      return;
    }
    if (this.ticket.ticketTypeId.length !== 4) {
      this.errMsg = "Ticket Type ID must be exactly 4 characters.";
      return;
    }

    if (!this.ticket.ticketCreatedDate) {
      this.errMsg = "Ticket Created Date is required.";
      return;
    }

    if (!this.ticket.status?.trim()) {
      this.errMsg = "Status is required.";
      return;
    }
    if (this.ticket.status.length > 20) {
      this.errMsg = "Status cannot exceed 20 characters.";
      return;
    }

    if (!this.ticket.createdByEmpId?.trim()) {
      this.errMsg = "Created By Employee ID is required.";
      return;
    }
    if (this.ticket.createdByEmpId.length !== 4) {
      this.errMsg = "Created By Employee ID must be exactly 4 characters.";
      return;
    }

    if (this.ticket.assignedToEmpId && this.ticket.assignedToEmpId.trim() && this.ticket.assignedToEmpId.length !== 4) {
      this.errMsg = "Assigned To Employee ID must be exactly 4 characters if provided.";
      return;
    }

    if (this.role === "ADMIN") {
      if (!this.ticket.createdByEmpId?.trim()) {
        this.errMsg = "Created By Employee ID is required for admin.";
        return;
      }
    } else {
      this.ticket.createdByEmpId = this.loggedEmpId;
    }

    if (this.ticket.assignedToEmpId === "") {
      this.ticket.assignedToEmpId = null as any;
    }

    this.ticketSvc.addTicket(this.ticket).subscribe({
      next: (response: Ticket) => {
        this.tickets.push(response);
        this.allTickets.push(response);
        this.ticket = new Ticket("", "", "", "", new Date(), "Open", "", "");
        this.errMsg = "";
        alert("Ticket raised successfully");
      },
      error: err => {
        console.error('Error adding ticket:', err);
        if (err.status === 400) {
          if (err.error?.includes('FOREIGN KEY constraint')) {
            this.errMsg = 'Ticket Type or Employee does not exist. Please select valid options.';
          } else if (err.error?.includes('PRIMARY KEY constraint')) {
            this.errMsg = 'Ticket ID already exists. Please use a different ID.';
          } else {
            this.errMsg = err.error || 'Invalid data. Please check all fields.';
          }
        } else if (err.status === 401) {
          this.errMsg = 'Unauthorized. Please login again.';
        } else if (err.status === 403) {
          this.errMsg = 'Access denied. You do not have permission to add tickets.';
        } else if (err.status === 500) {
          this.errMsg = 'Server error. Please try again later.';
        } else {
          this.errMsg = 'An error occurred. Please try again.';
        }
      }
    });
  }

  updateTicket(): void {
    this.errMsg = '';
    
    if (!this.ticket.ticketId?.trim()) {
      this.errMsg = "Cannot update: Ticket ID is required.";
      return;
    }
    if (this.ticket.ticketId.length !== 4) {
      this.errMsg = "Ticket ID must be exactly 4 characters.";
      return;
    }
    
    if (this.ticket.title && this.ticket.title.length > 15) {
      this.errMsg = "Ticket Title cannot exceed 15 characters.";
      return;
    }
    
    if (this.ticket.description && this.ticket.description.length > 100) {
      this.errMsg = "Description cannot exceed 100 characters.";
      return;
    }
    
    if (this.ticket.ticketTypeId && this.ticket.ticketTypeId.length !== 4) {
      this.errMsg = "Ticket Type ID must be exactly 4 characters.";
      return;
    }
    
    if (this.ticket.status && this.ticket.status.length > 20) {
      this.errMsg = "Status cannot exceed 20 characters.";
      return;
    }
    
    if (this.ticket.createdByEmpId && this.ticket.createdByEmpId.length !== 4) {
      this.errMsg = "Created By Employee ID must be exactly 4 characters.";
      return;
    }
    
    if (this.ticket.assignedToEmpId && this.ticket.assignedToEmpId.trim() && this.ticket.assignedToEmpId.length !== 4) {
      this.errMsg = "Assigned To Employee ID must be exactly 4 characters if provided.";
      return;
    }

    this.ticketSvc.updateTicket(
      this.ticket.ticketId,
      this.ticket
    ).subscribe({
      next: () => {
        this.showAllTickets();
        this.errMsg = "";
        alert("Ticket updated successfully");
      },
      error: err => {
        console.error('Error updating ticket:', err);
        if (err.status === 400) {
          if (err.error?.includes('FOREIGN KEY constraint')) {
            this.errMsg = 'Ticket Type or Employee does not exist.';
          } else {
            this.errMsg = err.error || 'Invalid data for update.';
          }
        } else if (err.status === 404) {
          this.errMsg = `Ticket ${this.ticket.ticketId} not found.`;
        } else if (err.status === 401) {
          this.errMsg = 'Unauthorized. Please login again.';
        } else if (err.status === 403) {
          this.errMsg = 'Access denied. You do not have permission to update tickets.';
        } else {
          this.errMsg = err.error || 'Error updating ticket.';
        }
      }
    });
  }

  deleteTicket(): void {
    this.errMsg = '';
    
    if (!this.ticket.ticketId?.trim()) {
      this.errMsg = "Please enter a Ticket ID to delete.";
      return;
    }
    if (this.ticket.ticketId.length !== 4) {
      this.errMsg = "Ticket ID must be exactly 4 characters.";
      return;
    }

    if (!confirm(`Are you sure you want to delete ticket ${this.ticket.ticketId}?`)) {
      return;
    }

    this.ticketSvc.deleteTicket(this.ticket.ticketId).subscribe({
      next: () => {
        this.tickets = this.tickets.filter(
          t => t.ticketId !== this.ticket.ticketId
        );
        this.allTickets = this.allTickets.filter(
          t => t.ticketId !== this.ticket.ticketId
        );
        this.ticket = new Ticket("", "", "", "", new Date(), "Open", "", "");
        this.errMsg = "";
        alert("Ticket deleted successfully");
      },
      error: err => {
        console.error('Error deleting ticket:', err);
        if (err.status === 404) {
          this.errMsg = `Ticket ${this.ticket.ticketId} not found.`;
        } else if (err.status === 400) {
          this.errMsg = err.error || 'Cannot delete ticket.';
        } else if (err.status === 401) {
          this.errMsg = 'Unauthorized. Please login again.';
        } else if (err.status === 403) {
          this.errMsg = 'Access denied. You do not have permission to delete tickets.';
        } else {
          this.errMsg = err.error || 'Error deleting ticket.';
        }
      }
    });
  }

  filterByStatus(): void {
    this.errMsg = '';
    
    if (!this.selectedStatus) {
      this.tickets = this.allTickets;
      return;
    }

    this.tickets = this.allTickets.filter(
      t => t.status.toLowerCase() === this.selectedStatus.toLowerCase()
    );
  }

  filterByEmployee(): void {
    this.errMsg = '';
    
    if (!this.filterEmpId) {
      this.errMsg = "Please enter an Employee ID to filter by.";
      return;
    }
    if (this.filterEmpId.length !== 4) {
      this.errMsg = "Employee ID must be exactly 4 characters.";
      return;
    }

    this.ticketSvc.getTicketsByEmployee(this.filterEmpId).subscribe({
      next: res => this.tickets = res,
      error: err => {
        console.error('Error filtering by employee:', err);
        if (err.status === 404) {
          this.errMsg = `No tickets found for employee ${this.filterEmpId}.`;
        } else {
          this.errMsg = err.error || 'Error filtering tickets by employee.';
        }
      }
    });
  }

  filterByTicketType(): void {
    this.errMsg = '';
    
    if (!this.filterTicketType) {
      this.errMsg = "Please select a Ticket Type to filter by.";
      return;
    }
    if (this.filterTicketType.length !== 4) {
      this.errMsg = "Ticket Type ID must be exactly 4 characters.";
      return;
    }

    this.ticketSvc.getTicketsByTicketType(this.filterTicketType).subscribe({
      next: res => this.tickets = res,
      error: err => {
        console.error('Error filtering by ticket type:', err);
        if (err.status === 404) {
          this.errMsg = `No tickets found for ticket type ${this.filterTicketType}.`;
        } else {
          this.errMsg = err.error || 'Error filtering tickets by ticket type.';
        }
      }
    });
  }

  clearFilters(): void {
    this.selectedStatus = "";
    this.filterEmpId = "";
    this.filterTicketType = "";
    this.tickets = this.allTickets;
    this.errMsg = "";
  }
}




