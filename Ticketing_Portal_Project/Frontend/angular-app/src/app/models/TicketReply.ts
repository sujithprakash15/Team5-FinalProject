export class TicketReply {
    public replyId: string;
    public ticketId: string;
    public replyByCreatorEmpId: string;
    public replyByAssignedEmpId: string;
    public replyMessage: string;


    constructor(replyId: string, ticketId: string, replybycreatorempId: string, replybyassignedempId: string, replyMessage: string) {
        this.replyId = replyId;
        this.ticketId = ticketId;
        this.replyByCreatorEmpId = replybycreatorempId;
        this.replyByAssignedEmpId = replybyassignedempId;
        this.replyMessage = replyMessage;
    }
}
 