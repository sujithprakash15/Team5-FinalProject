import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketType } from './models/TicketType';

@Injectable({
  providedIn: 'root',
})
export class TickettypeService {

  http: HttpClient = inject(HttpClient);
  token;
  baseUrl: string = 'https://ticketportalteam5-hggbcggfgudhf8bg.canadacentral-01.azurewebsites.net/api/TicketType/';
  httpOptions;

  constructor() {
    this.token = sessionStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token,
      }),
    };
  }

  getAllTicketTypes(): Observable<TicketType[]> {
    return this.http.get<TicketType[]>(this.baseUrl, this.httpOptions);
  }

  getTicketType(ticketTypeId: string): Observable<TicketType> {
    return this.http.get<TicketType>(
      this.baseUrl + ticketTypeId,
      this.httpOptions
    );
  }

  getTicketTypesByDepartment(deptId: string): Observable<TicketType[]> {
    return this.http.get<TicketType[]>(
      this.baseUrl + 'ByDepartment/' + deptId,
      this.httpOptions
    );
  }

  getTicketTypesBySla(slaId: string): Observable<TicketType[]> {
    return this.http.get<TicketType[]>(
      this.baseUrl + 'BySla/' + slaId,
      this.httpOptions
    );
  }

  addTicketType(ticketType: TicketType): Observable<TicketType> {
    return this.http.post<TicketType>(
      this.baseUrl,
      ticketType,
      this.httpOptions
    );
  }

  updateTicketType(
    ticketTypeId: string,
    ticketType: TicketType
  ): Observable<TicketType> {
    return this.http.put<TicketType>(
      this.baseUrl + ticketTypeId,
      ticketType,
      this.httpOptions
    );
  }

  deleteTicketType(ticketTypeId: string): Observable<any> {
    return this.http.delete(
      this.baseUrl + ticketTypeId,
      this.httpOptions
    );
  }
}
