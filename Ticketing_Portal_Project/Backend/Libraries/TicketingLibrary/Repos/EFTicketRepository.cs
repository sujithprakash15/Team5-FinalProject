using System;
using Microsoft.EntityFrameworkCore;
using TicketingLibrary.Models;
using TicketingLibrary.Interfaces;
using TicketingLibrary;

namespace TicketingLibrary.Repos
{
    public class EFTicketRepository : ITicketRepository
    {
        EYTicketPortalContext context = new EYTicketPortalContext();

        // ============================
        // ADD TICKET
        // ============================
        public async Task AddTicketAsync(Ticket ticket)
        {
            try
            {
                if (ticket == null)
                    throw new TicketException("Ticket data cannot be null", 1001);

                if (string.IsNullOrWhiteSpace(ticket.Title))
                    throw new TicketException("Ticket title is required", 1002);

                if (string.IsNullOrWhiteSpace(ticket.Description))
                    throw new TicketException("Ticket description is required", 1003);

                if (string.IsNullOrWhiteSpace(ticket.CreatedByEmpId))
                    throw new TicketException("CreatedByEmpId is required", 1004);

                if (string.IsNullOrWhiteSpace(ticket.TicketTypeId))
                    throw new TicketException("TicketTypeId is required", 1005);

                bool employeeExists =
                    await context.Employees
                    .AnyAsync(e => e.EmpId == ticket.CreatedByEmpId);

                if (!employeeExists)
                    throw new TicketException("Employee not found", 1006);

                bool ticketTypeExists =
                    await context.TicketTypes
                    .AnyAsync(t => t.TicketTypeId == ticket.TicketTypeId);

                if (!ticketTypeExists)
                    throw new TicketException("Ticket type not found", 1007);

                ticket.Status = "Open";
                ticket.TicketCreatedDate = DateTime.Now;

                await context.Tickets.AddAsync(ticket);
                await context.SaveChangesAsync();
            }
            catch (TicketException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new TicketException("Error while adding ticket : " + ex.Message, 1500);
            }
        }

        // ============================
        // GET ALL TICKETS
        // ============================
        public async Task<List<Ticket>> GetAllTicketsAsync()
        {
            try
            {
                return await context.Tickets
                    .Include("TicketType")
                    .Include("CreatedByEmployee")
                    .Include("AssignedToEmployee")
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw new TicketException("Error fetching tickets : " + ex.Message, 1501);
            }
        }

        // ============================
        // GET BY ID
        // ============================
        public async Task<Ticket> GetTicketByIdAsync(string ticketId)
        {
            try
            {
                return await context.Tickets
                    .Where(t => t.TicketId == ticketId)
                    .FirstAsync();
            }
            catch
            {
                throw new TicketException("Ticket not found", 1502);
            }
        }

        // ============================
        // CREATED BY EMPLOYEE
        // ============================
        public async Task<List<Ticket>> GetTicketsByEmployeeAsync(string empId)
        {
            try
            {
                return await context.Tickets
                    .Where(t => t.CreatedByEmpId == empId)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw new TicketException("Error fetching employee tickets : " + ex.Message, 1503);
            }
        }

        // ============================
        // ASSIGNED TO EMPLOYEE
        // ============================
        public async Task<List<Ticket>> GetTicketsByAssignedEmployeeAsync(string empId)
        {
            try
            {
                return await context.Tickets
                    .Where(t => t.AssignedToEmpId == empId)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw new TicketException("Error fetching assigned tickets : " + ex.Message, 1504);
            }
        }

        // ============================
        // BY TICKET TYPE
        // ============================
        public async Task<List<Ticket>> GetTicketsByTicketTypeAsync(string ticketTypeId)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(ticketTypeId))
                    throw new TicketException("Invalid TicketTypeId", 1505);

                return await context.Tickets
                    .Where(t => t.TicketTypeId == ticketTypeId)
                    .ToListAsync();
            }
            catch (TicketException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new TicketException("Error fetching tickets : " + ex.Message, 1506);
            }
        }

        // ============================
        // UPDATE STATUS
        // ============================
        public async Task UpdateTicketStatusAsync(string ticketId, string status)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(status))
                    throw new TicketException("Status cannot be empty", 1507);

                Ticket ticket = await GetTicketByIdAsync(ticketId);
                ticket.Status = status;

                await context.SaveChangesAsync();
            }
            catch (TicketException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new TicketException("Error updating ticket status : " + ex.Message, 1508);
            }
        }
    }
}
