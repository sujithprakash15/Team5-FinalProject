import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from './models/Ticket';

@Injectable({
  providedIn: 'root',
})
export class TicketService {

  http: HttpClient = inject(HttpClient);
  token;
  baseUrl: string = "http://localhost:5253/api/ticket/";
  httpOptions;

  constructor() {
    this.token = sessionStorage.getItem("token");

    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
      })
    };
  }

  getAllTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.baseUrl, this.httpOptions);
  }

  getTicket(ticketId: string): Observable<Ticket> {
    return this.http.get<Ticket>(this.baseUrl + ticketId, this.httpOptions);
  }

  getTicketsByEmployee(empId: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(
      this.baseUrl + "byemployee/" + empId,
      this.httpOptions
    );
  }

  getTicketsByAssignedEmployee(empId: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(
      this.baseUrl + "byassigned/" + empId,
      this.httpOptions
    );
  }

  getTicketsByTicketType(ticketTypeId: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(
      this.baseUrl + "bytickettype/" + ticketTypeId,
      this.httpOptions
    );
  }

  addTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(
      this.baseUrl,
      ticket,
      this.httpOptions
    );
  }

  updateTicket(ticketId: string, ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(
      this.baseUrl + ticketId,
      ticket,
      this.httpOptions
    );
  }

  deleteTicket(ticketId: string): Observable<any> {
    return this.http.delete(
      this.baseUrl + ticketId,
      this.httpOptions
    );
  }
}
