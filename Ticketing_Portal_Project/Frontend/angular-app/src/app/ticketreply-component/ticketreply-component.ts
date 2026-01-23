import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TicketreplyService } from '../ticketreply-service';
import { TicketReply } from '../models/TicketReply';
import { TicketService } from '../ticket-service';
import { Ticket } from '../models/Ticket';

@Component({
  selector: 'app-ticketreply-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ticketreply-component.html',
  styleUrls: ['./ticketreply-component.css']
})
export class TicketreplyComponent {
  replySvc = inject(TicketreplyService);
  ticketSvc = inject(TicketService);
  tickets: Ticket[] = [];
  reply: TicketReply = new TicketReply("", "", "", "", "");
  replies: TicketReply[] = [];

  errMsg = '';

  empId = '';
  repliedBy: 'creator' | 'assignee' = 'creator';


  selectedCreatorEmpId: string = '';
  selectedAssignedEmpId: string = '';
  searchReplyId: string = '';

  constructor() {
    this.showAllTickets();
    this.loadAllReplies();
  }

  newReply() {
    this.reply = new TicketReply("", "", "", "", "");
  }

  showAllTickets() {
    this.ticketSvc.getAllTickets().subscribe({
      next: (response: any) => {
        this.tickets = response;
        this.errMsg = "";
      },
      error: (err) => this.errMsg = err.error
    });
  }

  submitReply() {
    this.reply.replyByCreatorEmpId = "";
    this.reply.replyByAssignedEmpId = "";

    if (this.repliedBy === 'creator') {
      this.reply.replyByCreatorEmpId = this.empId;
    } else {
      this.reply.replyByAssignedEmpId = this.empId;
    }

    this.replySvc.addTicketreply(this.reply).subscribe({
      next: (response) => {
        alert('Reply Added');
        console.log(response);
        
        this.loadRepliesByTicket();
        this.newReply();
      },
      error: err => {
        this.errMsg = Object.values(err.error?.errors || {}).flat().join(',');
      }
    });
  }

  updateReply() {
    this.replySvc
      .updateTicketreply(this.reply.replyId, this.reply)
      .subscribe({
        next: () => {
          alert('Reply Updated');
          this.loadRepliesByTicket();
          this.newReply();
        },
        error: err => {
          this.errMsg = Object.values(err.error?.errors || {}).flat().join(',');
        }
      });
  }

  deleteReply() {
    this.replySvc.deleteTicketreply(this.reply.replyId).subscribe({
      next: () => {
        alert('Reply Deleted');
        this.loadRepliesByTicket();
        this.newReply();
      },
      error: err => {
        this.errMsg = Object.values(err.error?.errors || {}).flat().join(',');
      }
    });
  }

  getReplyById() {
    this.replySvc.getoneTicketreply(this.reply.replyId).subscribe({
      next: (res) => (this.reply = res),
      error: err => {
        this.errMsg = Object.values(err.error?.errors || {}).flat().join(',');
      }
    });
  }

  loadAllReplies() {
    this.replySvc.showallTicketreplies().subscribe({
      next: (res) => (this.replies = res),
      error: err => {
        this.errMsg = Object.values(err.error?.errors || {}).flat().join(',');
      }
    });
  }

  loadRepliesByTicket() {
    if (!this.reply.ticketId) return;

    this.replySvc.getrepliesbyTicketid(this.reply.ticketId).subscribe({
      next: (res) => (this.replies = res),
      error: err => {
        this.errMsg = Object.values(err.error?.errors || {}).flat().join(',');
      }
    });
  }

  loadRepliesByEmployee() {
    const empId = prompt('Enter Employee ID');

    if (!empId || empId.trim() === '') {
      alert('Employee ID is required');
      return;
    }

    this.replySvc.getrepliesbyCreatorempid(empId).subscribe({
      next: (res) => {
        this.replies = res;
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
      }
    });
  }

  // Add this method to your component class
  onReplyTypeChange() {
    // Clear the employee ID when switching types
    this.empId = '';

    // Clear the opposite employee ID in the reply object
    if (this.repliedBy === 'creator') {
      this.reply.replyByAssignedEmpId = '';
    } else {
      this.reply.replyByCreatorEmpId = '';
    }
  }


  onTicketSelect() {
  // When a ticket is selected, find its creator and assignee info
  if (this.reply.ticketId) {
    const selectedTicket = this.tickets.find(t => t.ticketId === this.reply.ticketId);
    if (selectedTicket) {
      // Assuming your Ticket model has these properties
      this.selectedCreatorEmpId = selectedTicket.createdByEmpId || '';
      this.selectedAssignedEmpId = selectedTicket.assignedToEmpId || '';
    }
  }
}



// Add search method
searchReply() {
  if (this.searchReplyId) {
    this.replySvc.getoneTicketreply(this.searchReplyId).subscribe({
      next: (res) => {
        this.reply = res;
        this.errMsg = '';
      },
      error: err => {
        this.errMsg = Object.values(err.error?.errors || {}).flat().join(',');
      }
    });
  }
}

// Add method to select reply from list
selectReply(replyItem: TicketReply) {
  this.reply = { ...replyItem };
  this.empId = replyItem.replyByCreatorEmpId || replyItem.replyByAssignedEmpId || '';
  
  // Set radio button based on who replied
  if (replyItem.replyByCreatorEmpId) {
    this.repliedBy = 'creator';
  } else if (replyItem.replyByAssignedEmpId) {
    this.repliedBy = 'assignee';
  }
}
}