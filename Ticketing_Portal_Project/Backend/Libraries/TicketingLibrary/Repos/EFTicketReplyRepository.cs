using System;
using Microsoft.Data.SqlClient;
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
        catch (DbUpdateException ex)
        {
            SqlException sqlException = ex.InnerException as SqlException;
            int errorNumber = sqlException.Number;

            switch (errorNumber)
            {
                case 2627:
                    throw new TicketException("Ticket Reply ID already exists", 501);
                default:
                    throw new TicketException(sqlException.Message, 599);
            }
        }
    }

    public async Task DeleteReplyAsync(string replyId)
    {

         TicketReply reply2del = await context.TicketReplies
         .Include("Tickets")
         .Include("Employee")
         .FirstOrDefaultAsync(s=>s.ReplyId == replyId);

        if(reply2del == null){
            throw new TicketException("No such Ticket Id to delete", 502);
        }

        else
        {
            throw new TicketException("Can't delete Ticket Reply because it has tickets",504);
        }

    }

    public async Task<List<TicketReply>> GetAllRepliesAsync()
    {
        List<TicketReply> replies = await context.TicketReplies.ToListAsync();
        return replies;
    }

    public async Task<List<TicketReply>> GetRepliesByAssingedEmpId(string assignedempId)
    {
        List<TicketReply> replies = await (from r in context.TicketReplies where r.ReplyByAssignedEmpId == assignedempId select r).ToListAsync();
        return replies;
    }

    public async Task<List<TicketReply>> GetRepliesByEmpId(string empId)
    {
        List<TicketReply> replies = await (from r in context.TicketReplies where r.ReplyByCreatorEmpId == empId select r).ToListAsync();
        return replies;
    }

    public async Task<List<TicketReply>> GetRepliesByTicketId(string ticketId)
    {
        List<TicketReply> replies = await (from r in context.TicketReplies where r.TicketId == ticketId select r).ToListAsync();
        return replies;

    }

    public async Task<TicketReply> GetReplyAsync(string replyId)
    {
        try
        {
            TicketReply reply = await (from r in context.TicketReplies where r.ReplyId == replyId select r).FirstAsync();
            return reply;
        }
        catch
        {
            throw new TicketException("No such Ticket Reply Id", 502);
        }
    }



    public async Task UpdateReplyAsync(string replyId, TicketReply reply)
    {
<<<<<<< HEAD
        throw new NotImplementedException();
    }

    public Task UpdateReplyAsync(string replyId, TicketReply reply)
    {
        try
        {
            TicketType existingTicketType = await GetTicketTypeAsync(ticketTypeId);
            existingTicketType.TypeName = ticketType.TypeName;
            existingTicketType.Description = ticketType.Description;
            // existingTicketType.SLAId = ticketType.SLAId;
            // existingTicketType.DeptId = ticketType.DeptId;
=======
        TicketReply ticketreply2edit = await GetReplyAsync(replyId);
        try
        {
            ticketreply2edit.ReplyMessage = reply.ReplyMessage;
>>>>>>> b3eacf9e40530be53cec3eaeaf9dea38188572fe
            await context.SaveChangesAsync();
        }
        catch
        {
<<<<<<< HEAD
            throw new TicketException("Error Cannot Update Ticket Type", 400);
=======
            throw new TicketException("Unable to update", 503);
>>>>>>> b3eacf9e40530be53cec3eaeaf9dea38188572fe
        }
    }
}
