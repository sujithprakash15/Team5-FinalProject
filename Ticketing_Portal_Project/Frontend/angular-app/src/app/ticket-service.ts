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
  baseUrl: string = "http://localhost:5253/api/ticket/";

  // ✅ token read dynamically
  private getHttpOptions() {
    const token = sessionStorage.getItem("token");

    return {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
  }

  // ===================== TICKETS =====================

  getAllTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(
      this.baseUrl,
      this.getHttpOptions()
    );
  }

  getTicket(ticketId: string): Observable<Ticket> {
    return this.http.get<Ticket>(
      this.baseUrl + ticketId,
      this.getHttpOptions()
    );
  }

  getTicketsByEmployee(empId: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(
      this.baseUrl + "ByEmployee/" + empId,
      this.getHttpOptions()
    );
  }

  getTicketsByAssignedEmployee(empId: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(
      this.baseUrl + "ByAssignedEmployee/" + empId,
      this.getHttpOptions()
    );
  }

  getTicketsByTicketType(ticketTypeId: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(
      this.baseUrl + "ByTicketType/" + ticketTypeId,
      this.getHttpOptions()
    );
  }

  addTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(
      this.baseUrl,
      ticket,
      this.getHttpOptions()
    );
  }

  updateTicket(ticketId: string, ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(
      this.baseUrl + ticketId,
      ticket,
      this.getHttpOptions()
    );
  }

  deleteTicket(ticketId: string): Observable<any> {
    return this.http.delete(
      this.baseUrl + ticketId,
      this.getHttpOptions()
    );
  }

  // ===================== TICKET TYPE =====================

  getAllTicketTypes(): Observable<TicketType[]> {
    return this.http.get<TicketType[]>(
      'http://localhost:5253/api/tickettype',
      this.getHttpOptions()
    );
  }

  // ===================== EMPLOYEE =====================

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      'http://localhost:5253/api/employee',
      this.getHttpOptions()
    );
  }
}
