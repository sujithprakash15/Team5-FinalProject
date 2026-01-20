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

            if (tickets.Count == 0)
                throw new TicketException("No tickets available", 505);

            return tickets;
        }

        public async Task<Ticket> GetTicketByIdAsync(string ticketId)
        {
            try
            {
                Ticket ticket =
                    await (from t in context.Tickets
                           where t.TicketId == ticketId
                           select t).FirstAsync();

                return ticket;
            }
            catch
            {
                throw new TicketException("No such Ticket ID", 502);
            }
        }

        public async Task<List<Ticket>> GetTicketsByEmployeeAsync(string empId)
        {
            List<Ticket> tickets =
                await (from t in context.Tickets
                       where t.CreatedByEmpId == empId
                       select t).ToListAsync();

            if (tickets.Count == 0)
                throw new TicketException("No tickets raised by employee", 506);

            return tickets;
        }

        public async Task<List<Ticket>> GetTicketsByAssignedEmployeeAsync(string empId)
        {
            List<Ticket> tickets =
                await (from t in context.Tickets
                       where t.AssignedToEmpId == empId
                       select t).ToListAsync();

            if (tickets.Count == 0)
                throw new TicketException("No tickets assigned to employee", 507);

            return tickets;
        }

        public async Task<List<Ticket>> GetTicketsByTicketTypeAsync(string ticketTypeId)
        {
            List<Ticket> tickets =
                await (from t in context.Tickets
                       where t.TicketTypeId == ticketTypeId
                       select t).ToListAsync();

            if (tickets.Count == 0)
                throw new TicketException("No tickets for this ticket type", 508);

            return tickets;
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

                switch (sqlException.Number)
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

        public async Task UpdateTicketAsync(string ticketId, Ticket ticket)
        {
            try
            {
                Ticket ticketToEdit =
                    await (from t in context.Tickets
                           where t.TicketId == ticketId
                           select t).FirstAsync();

                ticketToEdit.Title = ticket.Title;
                ticketToEdit.Description = ticket.Description;
                ticketToEdit.TicketTypeId = ticket.TicketTypeId;
                ticketToEdit.AssignedToEmpId = ticket.AssignedToEmpId;
                ticketToEdit.Status = ticket.Status;

                await context.SaveChangesAsync();
            }
            catch
            {
                throw new TicketException("Unable to update ticket", 503);
            }
        }

        public async Task DeleteTicketAsync(string ticketId)
        {
            Ticket ticketToDelete =
                await context.Tickets
                    .Include("TicketReplies")
                    .FirstOrDefaultAsync(t => t.TicketId == ticketId);

            if (ticketToDelete == null)
                throw new TicketException("No such Ticket ID", 502);

            if (ticketToDelete.TicketReplies.Count > 0)
                throw new TicketException(
                    "Cannot delete ticket because it contains replies", 504);

            context.Tickets.Remove(ticketToDelete);
            await context.SaveChangesAsync();
        }
    }
}
