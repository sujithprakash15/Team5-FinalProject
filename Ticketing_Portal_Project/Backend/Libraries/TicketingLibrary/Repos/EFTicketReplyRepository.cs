using System;
using Microsoft.EntityFrameworkCore;
using TicketingLibrary.Interfaces;
using TicketingLibrary.Models;

namespace TicketingLibrary.Repos;

public class EFTicketReplyRepository : ITicketReplyRepository
{

    EYTicketPortalContext context = new EYTicketPortalContext();
    public async Task AddReplyAsync(TicketReply reply)
    {
        try
        {
           await context.TicketReplies.AddAsync(reply);
           await context.SaveChangesAsync();
        }
        catch
        {
            throw new TicketException("Ticket Reply ID already Exists",501);
        }
    }

    public async Task DeleteReplyAsync(string replyId)
    {
       
            TicketReply reply = await GetReplyAsync(replyId);
            context.TicketReplies.Remove(reply);
             await context.SaveChangesAsync();
       
    }

    public async Task<List<TicketReply>> GetAllRepliesAsync()
    {
        List<TicketReply> replies = await context.TicketReplies.ToListAsync();
        return replies;
    }

    public async Task<TicketReply> GetReplyAsync(string replyId)
    {
        try
        {
            TicketReply reply = await(from r in context.TicketReplies where r.ReplyId == replyId select r).FirstAsync();
            return reply;
        }
        catch 
        {
            throw new TicketException("No Ticket Reply Id Found",503);
        }
    }

    public Task<TicketReply> GetReplyByAssingedEmpId(string assignedempId)
    {
        throw new NotImplementedException();
    }

    public Task<TicketReply> GetReplyByEmpId(string empId)
    {
        throw new NotImplementedException();
    }

    public Task<TicketReply> GetReplyByTicketId(string ticketId)
    {
        throw new NotImplementedException();
    }

    public Task UpdateReplyAsync(string replyId, TicketReply reply)
    {
        throw new NotImplementedException();
    }
}
