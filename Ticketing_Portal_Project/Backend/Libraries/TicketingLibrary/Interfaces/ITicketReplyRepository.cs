using System;
using TicketingLibrary.Models;

namespace TicketingLibrary.Interfaces;

public interface ITicketReplyRepository
{
    Task AddReplyAsync(TicketReply reply);
    Task DeleteReplyAsync(string replyId);

    Task UpdateReplyAsync(string replyId,TicketReply reply);

    Task<TicketReply> GetReplyAsync(string replyId);

    Task <List<TicketReply>> GetAllRepliesAsync();

    Task <TicketReply> GetReplyByTicketId(string ticketId);  

    Task<TicketReply> GetReplyByEmpId(string empId);

    Task<TicketReply> GetReplyByAssingedEmpId(string assignedempId);

}
