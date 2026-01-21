import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TicketService } from '../ticket-service';
import { Ticket } from '../models/Ticket';

@Component({
  selector: 'app-ticket-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ticket-component.html',
  styleUrl: './ticket-component.css',
})
export class TicketComponent {

  ticketSvc: TicketService = inject(TicketService);

  tickets: Ticket[];
  ticket: Ticket;
  errMsg: string;

  constructor() {
    this.tickets = [];
    this.errMsg = "";

    this.ticket = new Ticket("", "", "", "", new Date(),"Open", "", "");
    this.showAllTickets();
  }

  showAllTickets(): void {
    this.ticketSvc.getAllTickets().subscribe({
      next: (response: Ticket[]) => {
        console.log(response);
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

        this.ticket = new Ticket("", "", "", "", new Date(),"Open", "", "");
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
      error: (err) => {
        this.errMsg = err.error;
      }
    });
  }
}
