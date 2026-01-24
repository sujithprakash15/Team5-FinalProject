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
  allReplies: TicketReply[] = []; 
  userTickets: Ticket[] = []; 
  displayReplies: TicketReply[] = [];

  ticket!: Ticket;
  reply!: TicketReply;

  replier: string = '';
  errMsg: string = '';
  searchTicketId: string = '';

  loggedEmpId: string = '';
  userRole: string = '';
  isSearchMode: boolean = false;

  constructor() {
    this.loggedEmpId = sessionStorage.getItem('empId') || '';
    this.userRole = sessionStorage.getItem('role') || 'USER';

    this.ticket = new Ticket('', '', '', '', new Date(), '', '', '');
    this.newReply();

    this.showAllTickets();
    this.loadUserReplies();
  }

  newReply() {
    this.reply = new TicketReply('', '', '', '', '');
    this.errMsg = '';
  }

  onReplierChange(value: string) {
    if (value === 'creator') {
      this.reply.replyByAssignedEmpId = '';
    } else {
      this.reply.replyByCreatorEmpId = '';
    }
  }

  onTicketIdChange(ticketId: string) {
    this.errMsg = '';
    
    if (!ticketId?.trim()) {
      this.errMsg = "Please enter a Ticket ID.";
      return;
    }
    if (ticketId.length !== 4) {
      this.errMsg = "Ticket ID must be exactly 4 characters.";
      return;
    }

    this.ticketSvc.getTicket(ticketId).subscribe({
      next: (res) => {
        this.ticket = res;
        this.reply.replyByCreatorEmpId = res.createdByEmpId;
        this.reply.replyByAssignedEmpId = res.assignedToEmpId;
        this.errMsg = '';
      },
      error: (err) => {
        console.error('Error fetching ticket:', err);
        if (err.status === 404) {
          this.errMsg = `Ticket with ID ${ticketId} not found.`;
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

  showAllTickets() {
    this.ticketSvc.getAllTickets().subscribe({
      next: (res) => {
        this.tickets = res;
        
        if (this.userRole !== 'ADMIN') {
          this.userTickets = res.filter(ticket => 
            ticket.createdByEmpId === this.loggedEmpId || 
            ticket.assignedToEmpId === this.loggedEmpId
          );
        } else {
          this.userTickets = res;
        }
        
        this.errMsg = '';
      },
      error: (err) => {
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

  loadUserReplies() {
    this.isSearchMode = false;
    this.searchTicketId = '';
    
    this.replySvc.showallTicketreplies().subscribe({
      next: (res) => {
        this.allReplies = res;
        
        if (this.userRole === 'ADMIN') {
          this.displayReplies = [...res];
        } else {
          this.displayReplies = res.filter(reply => {
            const ticket = this.tickets.find(t => t.ticketId === reply.ticketId);
            return ticket && (
              ticket.createdByEmpId === this.loggedEmpId || 
              ticket.assignedToEmpId === this.loggedEmpId
            );
          });
        }
        
        this.errMsg = '';
      },
      error: (err) => {
        console.error('Error loading ticket replies:', err);
        if (err.status === 401) {
          this.errMsg = 'Unauthorized. Please login again.';
        } else if (err.status === 403) {
          this.errMsg = 'Access denied. You do not have permission to view ticket replies.';
        } else if (err.status === 500) {
          this.errMsg = 'Server error. Please try again later.';
        } else {
          this.errMsg = err.error || 'Failed to load ticket replies. Please try again.';
        }
      }
    });
  }

  searchByTicketId() {
    this.errMsg = '';
    
    if (!this.searchTicketId?.trim()) {
      this.errMsg = "Please enter a Ticket ID to search.";
      return;
    }
    if (this.searchTicketId.length !== 4) {
      this.errMsg = "Ticket ID must be exactly 4 characters.";
      return;
    }

    if (this.userRole !== 'ADMIN') {
      const ticket = this.tickets.find(t => t.ticketId === this.searchTicketId);
      if (!ticket || (ticket.createdByEmpId !== this.loggedEmpId && ticket.assignedToEmpId !== this.loggedEmpId)) {
        this.errMsg = `You don't have permission to view replies for Ticket ID: ${this.searchTicketId}`;
        return;
      }
    }

    const filteredReplies = this.allReplies.filter(reply => reply.ticketId === this.searchTicketId);
    
    if (filteredReplies.length > 0) {
      this.displayReplies = filteredReplies;
      this.isSearchMode = true;
      this.errMsg = '';
    } else {
      this.errMsg = `No replies found for Ticket ID: ${this.searchTicketId}`;
      this.displayReplies = [];
      this.isSearchMode = true;
    }
  }

  clearSearch() {
    this.isSearchMode = false;
    this.searchTicketId = '';
    this.loadUserReplies();
  }

  addReply() {
    this.errMsg = '';
    if (this.userRole !== 'ADMIN') {
      const ticket = this.tickets.find(t => t.ticketId === this.reply.ticketId);
      if (!ticket || (ticket.createdByEmpId !== this.loggedEmpId && ticket.assignedToEmpId !== this.loggedEmpId)) {
        this.errMsg = "You can only add replies to tickets you created or are assigned to.";
        return;
      }
    }
    
    if (!this.reply.replyId?.trim()) {
      this.errMsg = "Reply ID is required.";
      return;
    }
    if (this.reply.replyId.length !== 6) {
      this.errMsg = "Reply ID must be exactly 6 characters.";
      return;
    }
    
    if (!this.reply.ticketId?.trim()) {
      this.errMsg = "Ticket ID is required.";
      return;
    }
    if (this.reply.ticketId.length !== 4) {
      this.errMsg = "Ticket ID must be exactly 4 characters.";
      return;
    }
    
    if (!this.reply.replyMessage?.trim()) {
      this.errMsg = "Reply Message is required.";
      return;
    }
    if (this.reply.replyMessage.length > 100) {
      this.errMsg = "Reply Message cannot exceed 100 characters.";
      return;
    }
    
    if (!this.reply.replyByCreatorEmpId?.trim() && !this.reply.replyByAssignedEmpId?.trim()) {
      this.errMsg = "Either Reply By Creator or Reply By Assigned is required.";
      return;
    }
    
    if (this.reply.replyByCreatorEmpId && this.reply.replyByCreatorEmpId.length !== 4) {
      this.errMsg = "Reply By Creator Employee ID must be exactly 4 characters.";
      return;
    }
    
    if (this.reply.replyByAssignedEmpId && this.reply.replyByAssignedEmpId.length !== 4) {
      this.errMsg = "Reply By Assigned Employee ID must be exactly 4 characters.";
      return;
    }

    if (this.reply.replyByCreatorEmpId && this.reply.replyByAssignedEmpId) {
      this.errMsg = "Only one of Reply By Creator or Reply By Assigned should be filled.";
      return;
    }

    if (this.userRole !== 'ADMIN') {
      const ticket = this.tickets.find(t => t.ticketId === this.reply.ticketId);
      if (ticket) {
        if (ticket.createdByEmpId === this.loggedEmpId) {
          this.reply.replyByCreatorEmpId = this.loggedEmpId;
          this.reply.replyByAssignedEmpId = '';
        } else if (ticket.assignedToEmpId === this.loggedEmpId) {
          this.reply.replyByAssignedEmpId = this.loggedEmpId;
          this.reply.replyByCreatorEmpId = '';
        }
      }
    }

    this.replySvc.addTicketreply(this.reply).subscribe({
      next: () => {
        alert('Reply Added Successfully');
        this.newReply();
        this.loadUserReplies();
      },
      error: (err) => {
        console.error('Error adding reply:', err);
        if (err.status === 400) {
          if (err.error?.includes('FOREIGN KEY constraint')) {
            this.errMsg = 'Ticket or Employee does not exist. Please select valid options.';
          } else if (err.error?.includes('PRIMARY KEY constraint')) {
            this.errMsg = 'Reply ID already exists. Please use a different ID.';
          } else {
            this.errMsg = err.error || 'Invalid data. Please check all fields.';
          }
        } else if (err.status === 401) {
          this.errMsg = 'Unauthorized. Please login again.';
        } else if (err.status === 403) {
          this.errMsg = 'Access denied. You do not have permission to add replies.';
        } else if (err.status === 500) {
          this.errMsg = 'Server error. Please try again later.';
        } else {
          this.errMsg = 'An error occurred. Please try again.';
        }
      }
    });
  }

  updateReply() {
    this.errMsg = '';
    if (this.userRole !== 'ADMIN') {
      const replyToUpdate = this.allReplies.find(r => r.replyId === this.reply.replyId);
      if (!replyToUpdate) {
        this.errMsg = "Reply not found.";
        return;
      }
      
      const ticket = this.tickets.find(t => t.ticketId === replyToUpdate.ticketId);
      if (!ticket || (ticket.createdByEmpId !== this.loggedEmpId && ticket.assignedToEmpId !== this.loggedEmpId)) {
        this.errMsg = "You can only update replies for tickets you created or are assigned to.";
        return;
      }
    }
    
    if (!this.reply.replyId?.trim()) {
      this.errMsg = "Cannot update: Reply ID is required.";
      return;
    }
    if (this.reply.replyId.length !== 6) {
      this.errMsg = "Reply ID must be exactly 6 characters.";
      return;
    }
    
    if (this.reply.ticketId && this.reply.ticketId.length !== 4) {
      this.errMsg = "Ticket ID must be exactly 4 characters.";
      return;
    }
    
    if (this.reply.replyMessage && this.reply.replyMessage.length > 100) {
      this.errMsg = "Reply Message cannot exceed 100 characters.";
      return;
    }
    
    if (this.reply.replyByCreatorEmpId && this.reply.replyByCreatorEmpId.length !== 4) {
      this.errMsg = "Reply By Creator Employee ID must be exactly 4 characters.";
      return;
    }
    
    if (this.reply.replyByAssignedEmpId && this.reply.replyByAssignedEmpId.length !== 4) {
      this.errMsg = "Reply By Assigned Employee ID must be exactly 4 characters.";
      return;
    }

    if (this.reply.replyByCreatorEmpId && this.reply.replyByAssignedEmpId) {
      this.errMsg = "Only one of Reply By Creator or Reply By Assigned should be filled.";
      return;
    }

    this.replySvc.updateTicketreply(this.reply.replyId, this.reply).subscribe({
      next: () => {
        alert('Reply Updated Successfully');
        this.newReply();
        this.loadUserReplies();
      },
      error: (err) => {
        console.error('Error updating reply:', err);
        if (err.status === 400) {
          if (err.error?.includes('FOREIGN KEY constraint')) {
            this.errMsg = 'Ticket or Employee does not exist.';
          } else {
            this.errMsg = err.error || 'Invalid data for update.';
          }
        } else if (err.status === 404) {
          this.errMsg = `Reply ${this.reply.replyId} not found.`;
        } else if (err.status === 401) {
          this.errMsg = 'Unauthorized. Please login again.';
        } else if (err.status === 403) {
          this.errMsg = 'Access denied. You do not have permission to update replies.';
        } else {
          this.errMsg = err.error || 'Error updating reply.';
        }
      }
    });
  }

  deleteReply() {
    this.errMsg = '';
    if (this.userRole !== 'ADMIN') {
      this.errMsg = "Only administrators can delete replies.";
      return;
    }
    
    if (!this.reply.replyId?.trim()) {
      this.errMsg = "Please enter a Reply ID to delete.";
      return;
    }
    if (this.reply.replyId.length !== 6) {
      this.errMsg = "Reply ID must be exactly 6 characters.";
      return;
    }

    if (!confirm(`Are you sure you want to delete reply ${this.reply.replyId}?`)) {
      return;
    }

    this.replySvc.deleteTicketreply(this.reply.replyId).subscribe({
      next: () => {
        alert('Reply Deleted Successfully');
        this.newReply();
        this.loadUserReplies();
      },
      error: (err) => {
        console.error('Error deleting reply:', err);
        if (err.status === 404) {
          this.errMsg = `Reply ${this.reply.replyId} not found.`;
        } else if (err.status === 400) {
          this.errMsg = err.error || 'Cannot delete reply.';
        } else if (err.status === 401) {
          this.errMsg = 'Unauthorized. Please login again.';
        } else if (err.status === 403) {
          this.errMsg = 'Access denied. You do not have permission to delete replies.';
        } else {
          this.errMsg = err.error || 'Error deleting reply.';
        }
      }
    });
  }
}