import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TicketreplyService } from '../ticketreply-service';
import { TicketReply } from '../Models/TicketReply';

@Component({
  selector: 'app-ticketreply-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './ticketreply-component.html',
  styleUrl: './ticketreply-component.css',
})
export class TicketreplyComponent {

  ticketreplySvc: TicketreplyService = inject(TicketreplyService);
  ticketreplies = [];
  ticketreply: TicketReply;
  errMsg: string;

  constructor() {

    this.ticketreplies = [];
    this.ticketreply = new TicketReply("", "", "", "", "");
    this.errMsg = "";
    this.showAllTicketreplies();
  }

  showAllTicketreplies() {
    this.ticketreplySvc.showallTicketreplies().subscribe({
      next: (response: any) => {
        this.ticketreplies = response;
        this.errMsg = "";
      },
      error: (err) => this.errMsg = err.error
    });
  }

  saveTicketreply() {
    this.ticketreplySvc.addTicketreply(this.ticketreply).subscribe({
      next: (response: any) => {
        alert("Ticket Reply Added Successfully");
        this.errMsg = "";
        this.newTicketreply();
        this.showAllTicketreplies();
      },
      error: (err) => this.errMsg = err.error
    });
  }

  newTicketreply() {
    this.ticketreply = new TicketReply("", "", "", "", "");
  }

  showTicketreply() {
    this.ticketreplySvc.getoneTicketreply(this.ticketreply.replyId).subscribe({
      next: (response: any) => {
        this.ticketreply = response;
        this.errMsg = "";
      },
      error: (err) => this.errMsg = err.error
    });

  }

  updateTicketreply() {
    this.ticketreplySvc.updateTicketreply(this.ticketreply.replyId, this.ticketreply).subscribe({
      next: (response: any) => {
        alert("Ticket Reply Updated Successfully");
        this.errMsg = "";
        this.showAllTicketreplies();
      },
      error: (err) => this.errMsg = err.error
    });
  }

  deleteTicketreply() {
    this.ticketreplySvc.deleteTicketreply(this.ticketreply.replyId).subscribe({
      next: (response: any) => {
        alert("Ticket Reply Deleted Successfully");
        this.errMsg = "";
        this.showAllTicketreplies();
      },
      error: (err) => this.errMsg = err.error
    });
  }

  


}
