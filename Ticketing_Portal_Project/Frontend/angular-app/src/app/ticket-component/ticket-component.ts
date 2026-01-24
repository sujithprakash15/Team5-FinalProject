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
      next: res => this.ticketTypes = res,
      error: err => console.error(err)
    });

    if (this.role === "ADMIN") {
      this.ticketSvc.getAllEmployees().subscribe({
        next: res => this.employees = res,
        error: err => console.error(err)
      });
    }
  }

  showAllTickets(): void {
    this.ticketSvc.getAllTickets().subscribe({
      next: (res: Ticket[]) => {

        if (this.role === "ADMIN") {
          this.tickets = res;
        } else {
          this.tickets = res.filter(
            t => t.createdByEmpId === this.loggedEmpId
          );
        }

        this.allTickets = this.tickets;
        this.errMsg = "";
      },
      error: err => this.errMsg = err.error
    });
  }

  showTicket(): void {
    this.ticketSvc.getTicket(this.ticket.ticketId).subscribe({
      next: res => {
        this.ticket = res;
        this.errMsg = "";
      },
      error: err => this.errMsg = err.error
    });
  }

  addTicket(): void {

    this.ticket.createdByEmpId = this.loggedEmpId;

    if (this.ticket.assignedToEmpId === "") {
      this.ticket.assignedToEmpId = null as any;
    }

    this.ticketSvc.addTicket(this.ticket).subscribe({
      next: (response: Ticket) => {
        this.tickets.push(response);
        this.allTickets.push(response);
        this.ticket = new Ticket("", "", "", "", new Date(), "Open", "", "");
        alert("Ticket raised successfully");
      },
      error: err => {
        this.errMsg = err.error;
      }
    });
  }

  updateTicket(): void {
    this.ticketSvc.updateTicket(
      this.ticket.ticketId,
      this.ticket
    ).subscribe({
      next: () => {
        this.showAllTickets();
        alert("Ticket updated successfully");
      },
      error: err => this.errMsg = err.error
    });
  }

  deleteTicket(): void {
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
        if (err.status === 204 || err.status === 200) {
          this.tickets = this.tickets.filter(
            t => t.ticketId !== this.ticket.ticketId
          );
          this.allTickets = this.allTickets.filter(
            t => t.ticketId !== this.ticket.ticketId
          );
          this.ticket = new Ticket("", "", "", "", new Date(), "Open", "", "");
          this.errMsg = "";
          alert("Ticket deleted successfully");
          return;
        }

        this.errMsg = "Delete failed";
      }
    });
  }

  filterByStatus(): void {
    if (!this.selectedStatus) {
      this.tickets = this.allTickets;
      return;
    }

    this.tickets = this.allTickets.filter(
      t => t.status.toLowerCase() === this.selectedStatus.toLowerCase()
    );
  }

  filterByEmployee(): void {
    if (!this.filterEmpId) return;

    this.ticketSvc.getTicketsByEmployee(this.filterEmpId).subscribe({
      next: res => this.tickets = res,
      error: err => this.errMsg = err.error
    });
  }

  filterByTicketType(): void {
    if (!this.filterTicketType) return;

    this.ticketSvc.getTicketsByTicketType(this.filterTicketType).subscribe({
      next: res => this.tickets = res,
      error: err => this.errMsg = err.error
    });
  }

  clearFilters(): void {
    this.selectedStatus = "";
    this.filterEmpId = "";
    this.filterTicketType = "";
    this.tickets = this.allTickets;
  }
}
