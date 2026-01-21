import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TicketreplyService } from '../ticketreply-service';
import { TicketReply } from '../models/TicketReply';
import { TicketService } from '../ticket-service';
import { Ticket } from '../models/Ticket';

@Component({
  selector: 'app-ticketreply-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './ticketreply-component.html',
  styleUrl: './ticketreply-component.css',
})
export class TicketreplyComponent {

  ticketreplySvc: TicketreplyService = inject(TicketreplyService);
  ticketSvc:TicketService = inject(TicketService);
  tickets:Ticket [] = [];
  ticketreplies:TicketReply [] = [];
  ticketreply: TicketReply;
  ticketId: string;
  empId: string;
  errMsg: string;
  // creator : any = sessionStorage.getItem("empId");

  constructor() {

    this.ticketreplies = [];
    this.ticketreply = new TicketReply("", "", "", "", "");
    this.ticketId="";
    this.empId="";
    this.errMsg = "";
    this.showAllTicketreplies();
  }

  showAllTickets(){
    this.ticketSvc.getAllTickets().subscribe({
      next:(response:any)=>{
        this.tickets=response;
        this.errMsg="";
      },
      error: (err) => this.errMsg = err.error
  });
  }
 
  showAllTicketreplies() {
    this.ticketreplySvc.showallTicketreplies().subscribe({
      next: (response: any) => {
        console.log(response);
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

  showRepliesByTicketId(){
    this.ticketreplySvc.getrepliesbyTicketid(this.ticketId).subscribe({
      next: (response: any) => {
        this.ticketreplies = response;
        this.errMsg = "";
      }
      ,
      error: (err) => this.errMsg = err.error
    });
  }

  showRepliesByCreatorEmpId(){
    this.ticketreplySvc.getrepliesbyCreatorempid(this.empId).subscribe({
      next: (response: any) => {
        this.ticketreplies = response;
        this.errMsg = "";
      }
      ,
      error: (err) => this.errMsg = err.error
    });
  }

  showRepliesbyAssignedEmpId(){
    this.ticketreplySvc.getrepliesbyAssignedempid(this.empId).subscribe({
      next: (response: any) => {
        this.ticketreplies = response;
        this.errMsg = "";
      },
      error: (err) => this.errMsg = err.error
    });
  }


}
