import { Component, inject } from '@angular/core';
import { TickettypeService } from '../tickettype-service';
import { TicketType } from '../models/TicketType';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tickettype-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tickettype-component.html',
  styleUrl: './tickettype-component.css',
})
export class TickettypeComponent {

  ticketTypeSvc: TickettypeService = inject(TickettypeService);

  ticketTypes: TicketType[];
  ticketType: TicketType;
  errMsg: string;

  constructor() {
    this.ticketTypes = [];
    this.ticketType = new TicketType('', '', '', '', '');
    this.errMsg = '';
    this.loadTicketTypes();
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
