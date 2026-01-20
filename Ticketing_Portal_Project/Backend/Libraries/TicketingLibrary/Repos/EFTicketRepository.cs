using System;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using TicketingLibrary.Interfaces;
using TicketingLibrary.Models;
 
namespace TicketingLibrary.Repos
{
    public class EFTicketRepository : ITicketRepository
    {
        EYTicketPortalContext context = new EYTicketPortalContext();
 
       
        public async Task<List<Ticket>> GetAllTicketsAsync()
        {
            List<Ticket> tickets =
                await context.Tickets
                .Include("TicketType")
                .Include("CreatedByEmployee")
                .Include("AssignedToEmployee")
                .ToListAsync();
 
            return tickets;
        }
 
        public async Task<Ticket> GetTicketByIdAsync(string ticketId)
        {
            try
            {
                Ticket ticket = await (from t in context.Tickets where t.TicketId == ticketId select t).FirstAsync();
                return ticket;
            }
            catch
            {
                throw new TicketException("No such Ticket ID", 502);
            }
        }
 
 
        public async Task<List<Ticket>> GetTicketsByEmployeeAsync(string empId)
        {
            try
            {
                List<Ticket> tickets = await (from t in context.Tickets where t.CreatedByEmpId == empId select t).ToListAsync();
                return tickets;
            }
            catch (Exception ex)
            {
                throw new TicketException(ex.Message, 500);
            }
        }
 
 
        public async Task<List<Ticket>> GetTicketsByAssignedEmployeeAsync(string empId)
        {
            try
            {
                List<Ticket> tickets = await (from t in context.Tickets where t.AssignedToEmpId == empId select t).ToListAsync();
                return tickets;
            }
            catch (Exception ex)
            {
                throw new TicketException(ex.Message, 501);
            }
        }
 
 
        public async Task<List<Ticket>> GetTicketsByTicketTypeAsync(string ticketTypeId)
        {
            try
            {
                List<Ticket> tickets = await (from t in context.Tickets where t.TicketTypeId == ticketTypeId select t).ToListAsync();
                return tickets;
            }
            catch (Exception ex)
            {
                throw new TicketException(ex.Message, 503);
            }
        }
 
 
        public async Task AddTicketAsync(Ticket ticket)
        {
            try
            {
                ticket.Status = "Open";
                ticket.TicketCreatedDate = DateTime.Now;
 
                await context.Tickets.AddAsync(ticket);
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                SqlException sqlException = ex.InnerException as SqlException;
                int errorNumber = sqlException.Number;
 
                switch (errorNumber)
                {
                    case 2627:
                        throw new TicketException("Ticket ID already exists", 501);
 
                    case 547:
                        throw new TicketException(
                            "Invalid Employee or Ticket Type reference", 506);
 
                    default:
                        throw new TicketException(sqlException.Message, 599);
                }
            }
        }
 
 
        public async Task UpdateTicketStatusAsync(string ticketId, string status)
        {
            try
            {
                Ticket ticket = await GetTicketByIdAsync(ticketId);
                ticket.Status = status;
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new TicketException(ex.Message, 503);
            }
        }
 
 
        public async Task DeleteTicketAsync(string ticketId)
        {
                Ticket ticketToDelete = await context.Tickets.Include("TicketReplies").FirstOrDefaultAsync(t => t.TicketId == ticketId);
 
                if (ticketToDelete == null)
                    throw new TicketException("No such Ticket ID", 502);
 
                if (ticketToDelete.TicketReplies.Count == 0)
                {
                    context.Tickets.Remove(ticketToDelete);
                    await context.SaveChangesAsync();
                }
                else
                {
                    throw new TicketException("Cannot delete ticket because it contains replies", 504);
                }
           
        }
 
    }
}
 
 