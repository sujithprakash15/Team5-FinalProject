import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from './models/Ticket';
import { TicketType } from './models/TicketType';
import { Employee } from './models/Employee';

@Injectable({
  providedIn: 'root',
})
export class TicketService {

  http: HttpClient = inject(HttpClient);

  private apiUrl ='https://ticketportalteam5-hggbcggfgudhf8bg.canadacentral-01.azurewebsites.net/api/';

  constructor() {}

  private getHttpOptions() {
    const token = sessionStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };
  }



  getAllTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(
      this.apiUrl + 'ticket',
      this.getHttpOptions()
    );
  }

  getTicket(ticketId: string): Observable<Ticket> {
    return this.http.get<Ticket>(
      this.apiUrl + 'ticket/' + ticketId,
      this.getHttpOptions()
    );
  }

  getTicketsByEmployee(empId: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(
      this.apiUrl + 'ticket/ByEmployee/' + empId,
      this.getHttpOptions()
    );
  }

  getTicketsByAssignedEmployee(empId: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(
      this.apiUrl + 'ticket/ByAssignedEmployee/' + empId,
      this.getHttpOptions()
    );
  }

  getTicketsByTicketType(ticketTypeId: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(
      this.apiUrl + 'ticket/ByTicketType/' + ticketTypeId,
      this.getHttpOptions()
    );
  }

  addTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(
      this.apiUrl + 'ticket',
      ticket,
      this.getHttpOptions()
    );
  }

  updateTicket(ticketId: string, ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(
      this.apiUrl + 'ticket/' + ticketId,
      ticket,
      this.getHttpOptions()
    );
  }

  deleteTicket(ticketId: string): Observable<any> {
    return this.http.delete(
      this.apiUrl + 'ticket/' + ticketId,
      this.getHttpOptions()
    );
  }

  getAllTicketTypes(): Observable<TicketType[]> {
    return this.http.get<TicketType[]>(
      this.apiUrl + 'tickettype',
      this.getHttpOptions()
    );
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      this.apiUrl + 'employee',
      this.getHttpOptions()
    );
  }
}
