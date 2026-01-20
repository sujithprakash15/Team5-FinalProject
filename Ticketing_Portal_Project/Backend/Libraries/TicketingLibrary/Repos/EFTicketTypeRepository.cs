using System;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using TicketingLibrary.Interfaces;
using TicketingLibrary.Models;

namespace TicketingLibrary.Repos;

public class EFTicketTypeRepository : ITicketTypeRepository
{
    private readonly EYTicketPortalContext context = new EYTicketPortalContext();

    public async Task AddTicketTypeAsync(TicketType ticketType)
    {
        try
        {
            await context.TicketTypes.AddAsync(ticketType);
            await context.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            SqlException? sqlException = ex.InnerException as SqlException;
            if (sqlException == null)
            {
                throw new TicketException("Database error occurred", 599);
            }

            int errorNumber = sqlException.Number;

            switch (errorNumber)
            {
                case 2627:
                    throw new TicketException("Ticket Type already exists", 501);
                default:
                    throw new TicketException(sqlException.Message, 599);
            }
        }
    }

    public async Task DeleteTicketTypeAsync(string ticketTypeId)
    {
        TicketType? ticketTypetodelete = await context
            .TicketTypes.Include(t => t.Tickets)
            .FirstOrDefaultAsync(t => t.TicketTypeId == ticketTypeId);

        if (ticketTypetodelete == null)
        {
            throw new TicketException("No Such Ticket ID", 502);
        }

        if (ticketTypetodelete.Tickets == null || ticketTypetodelete.Tickets.Count == 0)
        {
            context.TicketTypes.Remove(ticketTypetodelete);
            await context.SaveChangesAsync();
        }
        else
        {
            throw new TicketException(
                "Cannot delete ticket type because it is assigned to tickets",
                504
            );
        }
    }

    public async Task<List<TicketType>> GetAllTicketTypesAsync()
    {
        List<TicketType> ticketTypes = await context.TicketTypes.ToListAsync();
        return ticketTypes;
    }

    public async Task<List<TicketType>> GetByDepartmentIdAsync(string deptId)
    {
            List<TicketType> ticketTypes = await (
                from t in context.TicketTypes
                where t.DeptId == deptId
                select t
            ).ToListAsync();

            if (ticketTypes.Count == 0)
            {
                throw new TicketException("No Ticket Types Found for Department", 505);
            }

            return ticketTypes;
    }

    public async Task<List<TicketType>> GetBySlaIdAsync(string slaId)
    {
            List<TicketType> ticketTypes = await (
                from t in context.TicketTypes
                where t.SLAId == slaId
                select t
            ).ToListAsync();
            if (ticketTypes.Count == 0)
            {
                throw new TicketException("No Ticket Types Found for SLA", 506);
            }
            return ticketTypes;
    }

    public async Task<TicketType> GetTicketTypeAsync(string ticketTypeId)
    {
        try
        {
            TicketType? ticketType = await (
                from t in context.TicketTypes
                where t.TicketTypeId == ticketTypeId
                select t
            ).FirstOrDefaultAsync();
            return ticketType;
        }
        catch
        {
            throw new TicketException("No such Ticket Type ID", 502);
        }
    }

    public async Task UpdateTicketTypeAsync(string ticketTypeId, TicketType ticketType)
    {
        try
        {
            TicketType existingTicketType = await GetTicketTypeAsync(ticketTypeId);
            existingTicketType.TypeName = ticketType.TypeName;
            existingTicketType.Description = ticketType.Description;
            existingTicketType.SLAId = ticketType.SLAId;
            existingTicketType.DeptId = ticketType.DeptId;
            await context.SaveChangesAsync();
        }
        catch
        {
            throw new TicketException("Unable To Update Ticket Type", 503);
        }
    }
}
