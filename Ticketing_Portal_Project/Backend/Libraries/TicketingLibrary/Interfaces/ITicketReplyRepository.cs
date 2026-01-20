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

    Task <List<TicketReply>> GetRepliesByTicketId(string ticketId);  

    Task<List<TicketReply>> GetRepliesByEmpId(string empId);

    Task<List<TicketReply>> GetRepliesByAssingedEmpId(string assignedempId);

}
