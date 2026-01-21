export class TicketReply {
    public replyId: string;
    public ticketId: string;
    public replybycreatorempId: string;
    public replybyassignedempId: string;
    public replyMessage: string;
    public replyCreatedDate?: Date;


    constructor(replyId: string, ticketId: string, replybycreatorempId: string, replybyassignedempId: string, replyMessage: string, replyCreatedDate?: Date) {
        this.replyId = replyId;
        this.ticketId = ticketId;
        this.replybycreatorempId = replybycreatorempId;
        this.replybyassignedempId = replybyassignedempId;
        this.replyMessage = replyMessage;
        this.replyCreatedDate = replyCreatedDate;
    }
}
 