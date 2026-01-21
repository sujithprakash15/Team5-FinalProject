import { TicketType } from './TicketType';
import { Employee } from './Employee';

export class Ticket {
  public ticketId: string;
  public title: string;
  public description: string;
  public ticketTypeId: string;
  public ticketCreatedDate: Date;
  public status: string;
  public createdByEmpId: string;
  public assignedToEmpId: string;

  constructor(ticketId: string, title: string, description: string,ticketTypeId: string,ticketCreatedDate: Date,status: string,createdByEmpId: string,assignedToEmpId: string
  ) {
    this.ticketId = ticketId;
    this.title = title;
    this.description = description;
    this.ticketTypeId = ticketTypeId;
    this.ticketCreatedDate = ticketCreatedDate;
    this.status = status;
    this.createdByEmpId = createdByEmpId;
    this.assignedToEmpId = assignedToEmpId;
  }
}
