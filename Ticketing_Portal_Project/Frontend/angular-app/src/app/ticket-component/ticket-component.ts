import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TicketService } from '../ticket-service';
import { Ticket } from '../models/Ticket';
import { Employee } from '../models/Employee';

@Component({
  selector: 'app-ticket-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ticket-component.html',
  styleUrl: './ticket-component.css',
})
export class TicketComponent implements OnInit {

  ticketSvc: TicketService = inject(TicketService);
  tickets: Ticket[];
  ticket: Ticket;
  ticketTypes: any[];
  employees: Employee[];
  errMsg: string;

  constructor() {
    this.tickets = [];
    this.ticketTypes = [];
    this.employees = [];
    this.errMsg = "";

    this.ticket = new Ticket("", "", "", "", new Date(), "Open", "", "");
    this.showAllTickets();
  }

  ngOnInit(): void {
    this.loadDropdownData();
  }

  loadDropdownData(): void {
    // Load ticket types
    this.ticketSvc.getAllTicketTypes().subscribe({
      next: (response: any[]) => {
        this.ticketTypes = response;
      },
      error: (err) => {
        console.error('Error loading ticket types:', err);
      }
    });

    // Load employees
    this.ticketSvc.getAllEmployees().subscribe({
      next: (response: Employee[]) => {
        this.employees = response;
      },
      error: (err) => {
        console.error('Error loading employees:', err);
      }
    });
  }

  showAllTickets(): void {
    this.ticketSvc.getAllTickets().subscribe({
      next: (response: Ticket[]) => {
        this.tickets = response;
        this.errMsg = "";
      },
      error: (err) => {
        this.errMsg = err.error;
      }
    });
  }

  showTicket(): void {
    this.ticketSvc.getTicket(this.ticket.ticketId).subscribe({
      next: (response: Ticket) => {
        this.ticket = response;
        this.errMsg = "";
      },
      error: (err) => {
        this.errMsg = err.error;
      }
    });
  }

  addTicket(): void {
    this.ticketSvc.addTicket(this.ticket).subscribe({
      next: (response: Ticket) => {
        this.tickets.push(response);
        this.ticket = new Ticket("", "", "", "", new Date(), "Open", "", "");
        alert("Ticket raised successfully");
        this.errMsg = "";
      },
      error: (err) => {
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
        this.errMsg = "";
      },
      error: (err) => {
        this.errMsg = err.error;
      }
    });
  }

  deleteTicket(): void {
    this.ticketSvc.deleteTicket(this.ticket.ticketId).subscribe({
      next: () => {
        this.showAllTickets();
        alert("Ticket deleted successfully");
        this.errMsg = "";
      },
      error: err => {
        this.errMsg = err.error?.message;
      }
    });
  }

}