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
  imports: [FormsModule, CommonModule],
  templateUrl: './ticketreply-component.html',
  styleUrl: './ticketreply-component.css',
})
export class TicketReplyComponent {
 
  replySvc: TicketreplyService = inject(TicketreplyService);
  ticketSvc: TicketService = inject(TicketService);
  employeeSvc : EmployeeService = inject(EmployeeService)
  tickets: Ticket[];
  replier: string;
  createIdStore : string
  assignIdStore : string
  ticket: Ticket;
  reply: TicketReply;
  replies: TicketReply[] = [];
  errMsg: string = '';
 
  ticketId: string = '';
  empId: string = '';
  creator: any = sessionStorage.getItem("empId");
  constructor() {
    this.tickets = [];
    this.createIdStore = ""
    this.assignIdStore = ""
    this.ticket = new Ticket("", "", "", "", new Date(), "", "", "")
    this.replier = "";
    this.reply = new TicketReply('', '', '', this.ticket.createdByEmpId, this.ticket.assignedToEmpId);
    this.newReply();
    this.showAllReplies();
    this.showAllTickets();
 
  }
 
 
  onReplierChange(value: string) {
    if (value === 'creator') {
      console.log("value : " + value);
       this.reply.replyByAssignedEmpId = "";
     
    }
    else {
      console.log("value : " + value);
      this.reply.replyByCreatorEmpId = "";
 
    }
  }
 
 
  onTicketIdChange(ticketId: string) {
 
    this.ticketSvc.getTicket(ticketId).subscribe({
      next: (response: Ticket) => {
        this.ticket = response;
        this.reply.replyByAssignedEmpId = this.ticket.assignedToEmpId;
        this.reply.replyByCreatorEmpId = this.ticket.createdByEmpId
        // console.log(this.ticket);
        // console.log(this.ticket.createdByEmpId);
       
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
    });
    // this.newReply()
 
  }
  newReply() {
    this.reply = new TicketReply('', "", '', "", "");
 
  }
  showAllTickets(): void {
    this.ticketSvc.getAllTickets().subscribe({
      next: (response: Ticket[]) => {
        this.tickets = response;
 
        this.errMsg = '';
      },
      error: (err) => {
        this.errMsg = err.error;
        console.log(err);
      }
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
        this.onTicketIdChange(this.reply.ticketId)
        this.reply = res;
        this.errMsg = '';
      },
      error: (err) => this.errMsg = err.error
    });
  }
 
  getRepliesByTicket() {
    this.replySvc.getrepliesbyTicketid(this.ticketId).subscribe({
      next: (res) => {
        this.replies = res;
        this.errMsg = '';
      },
      error: (err) => this.errMsg = err.error
    });
  }
 
  getRepliesByCreator() {
    this.replySvc.getrepliesbyCreatorempid(this.empId).subscribe({
      next: (res) => {
        this.replies = res;
        this.errMsg = '';
      },
      error: (err) => this.errMsg = err.error
    });
  }
 
  getRepliesByAssigned() {
    this.replySvc.getrepliesbyAssignedempid(this.empId).subscribe({
      next: (res) => {
        this.replies = res;
        this.errMsg = '';
      },
      error: (err) => this.errMsg = err.error
    });
  }
 

 
 
  addReply() {
    if(this.reply.replyId == ""){
      this.errMsg = "Enter reply id";
      return;
    }
    this.replySvc.addTicketreply(this.reply).subscribe({
     
      
      next: () => {
        console.log(this.reply);
 
        alert('Reply Added Successfully!');
        this.showAllReplies();
        this.newReply();
      },
      error: (err) => this.errMsg = err.error
    });
  }
 
 
  updateReply() {
    this.replySvc.updateTicketreply(this.reply.replyId, this.reply).subscribe({
      next: () => {
        alert('Reply Updated Successfully!');
        this.showAllReplies();
        this.newReply();
      },
      error: (err) => this.errMsg = err.error
    });
  }
 
 
  deleteReply() {
    this.replySvc.deleteTicketreply(this.reply.replyId).subscribe({
      next: () => {
        alert('Reply Deleted Successfully!');
        this.showAllReplies();
        this.newReply();
      },
      error: (err) => this.errMsg = err.error
    });
  }
}
 