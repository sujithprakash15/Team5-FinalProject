import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TicketReply } from './models/TicketReply';
import { Observable } from 'rxjs';
import { tick } from '@angular/core/testing';

@Injectable({
  providedIn: 'root',
})
export class TicketreplyService {

  http: HttpClient = inject(HttpClient);
  token;
  baseUrl: string = "http://localhost:5253/api/TicketReply/";
  httpOptions;
  constructor() {
    this.token = sessionStorage.getItem("token");
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
      })
    };
  }

  showallTicketreplies():Observable<TicketReply[]>{
    return this.http.get<TicketReply[]>(this.baseUrl,this.httpOptions);
  }

  getoneTicketreply(replyId:string):Observable<TicketReply>{
    return this.http.get<TicketReply>(this.baseUrl + replyId,this.httpOptions);
  }

  addTicketreply(ticketreply:TicketReply):Observable<TicketReply>{
    return this.http.post<TicketReply>(this.baseUrl,ticketreply,this.httpOptions);
  }

  updateTicketreply(replyId:string,ticketreply:TicketReply):Observable<TicketReply>{
    return this.http.put<TicketReply>(this.baseUrl + replyId,ticketreply,this.httpOptions);
  }

  deleteTicketreply(replyId:string):Observable<any>{
    return this.http.delete<TicketReply> (this.baseUrl+replyId,this.httpOptions);
  }

  getrepliesbyTicketid(ticketId:string):Observable<TicketReply[]>{
    return this.http.get<TicketReply[]> (this.baseUrl +"ticket/" +ticketId,this.httpOptions);
  }

  getrepliesbyAssignedempid(replybyassignedempId:string):Observable<TicketReply[]>{
    return this.http.get<TicketReply[]> (this.baseUrl +"assigned/"+ replybyassignedempId,this.httpOptions);
  }

  getrepliesbyCreatorempid(replybycreatorempId:string):Observable<TicketReply[]>{
    return this.http.get<TicketReply[]> (this.baseUrl +"emp/"+ replybycreatorempId,this.httpOptions);
  }






}
