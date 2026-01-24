import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TicketService } from '../ticket-service';
import { EmployeeService } from '../employee-service';
import { TicketreplyService } from '../ticketreply-service';
import { Ticket } from '../models/Ticket';
import { TicketReply } from '../models/TicketReply';

@Component({
  selector: 'app-ticket-reply-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ticketreply-component.html',
  styleUrl: './ticketreply-component.css',
})
export class TicketReplyComponent {

  replySvc = inject(TicketreplyService);
  ticketSvc = inject(TicketService);
  employeeSvc = inject(EmployeeService);

  tickets: Ticket[] = [];
  replies: TicketReply[] = [];

  ticket!: Ticket;
  reply!: TicketReply;

  replier: string = '';
  errMsg: string = '';

  ticketId: string = '';
  empId: string = '';

  creator: any = sessionStorage.getItem('empId');

  // ✅ ROLE
  userRole: string = '';

  constructor() {
    this.userRole = sessionStorage.getItem('role') || 'USER';

    this.ticket = new Ticket('', '', '', '', new Date(), '', '', '');
    this.newReply();

    this.showAllTickets();
    this.showAllReplies();
  }

  newReply() {
    this.reply = new TicketReply('', '', '', '', '');
  }

  onReplierChange(value: string) {
    if (value === 'creator') {
      this.reply.replyByAssignedEmpId = '';
    } else {
      this.reply.replyByCreatorEmpId = '';
    }
  }

  onTicketIdChange(ticketId: string) {
    this.ticketSvc.getTicket(ticketId).subscribe({
      next: (res) => {
        this.ticket = res;
        this.reply.replyByCreatorEmpId = res.createdByEmpId;
        this.reply.replyByAssignedEmpId = res.assignedToEmpId;
        this.errMsg = '';
      },
      error: (err) => this.errMsg = err.error
    });
  }

  showAllTickets() {
    this.ticketSvc.getAllTickets().subscribe({
      next: (res) => this.tickets = res,
      error: (err) => this.errMsg = err.error
    });
  }

  showAllReplies() {
    this.replySvc.showallTicketreplies().subscribe({
      next: (res) => {
        this.replies = res;
        this.errMsg = '';
      },
      error: (err) => this.errMsg = err.error
    });
  }

  getReply() {
    this.replySvc.getoneTicketreply(this.reply.replyId).subscribe({
      next: (res) => {
        this.reply = res;
        this.onTicketIdChange(res.ticketId);
        this.errMsg = '';
      },
      error: (err) => this.errMsg = err.error
    });
  }

  addReply() {
    if (!this.reply.replyId) {
      this.errMsg = 'Reply ID is required';
      return;
    }

    this.replySvc.addTicketreply(this.reply).subscribe({
      next: () => {
        alert('Reply Added Successfully');
        this.newReply();
        this.showAllReplies();
      },
      error: (err) => this.errMsg = err.error
    });
  }

  updateReply() {
    this.replySvc.updateTicketreply(this.reply.replyId, this.reply).subscribe({
      next: () => {
        alert('Reply Updated Successfully');
        this.newReply();
        this.showAllReplies();
      },
      error: (err) => this.errMsg = err.error
    });
  }

  deleteReply() {
    this.replySvc.deleteTicketreply(this.reply.replyId).subscribe({
      next: () => {
        alert('Reply Deleted Successfully');
        this.newReply();
        this.showAllReplies();
      },
      error: (err) => this.errMsg = err.error
    });
  }
}
