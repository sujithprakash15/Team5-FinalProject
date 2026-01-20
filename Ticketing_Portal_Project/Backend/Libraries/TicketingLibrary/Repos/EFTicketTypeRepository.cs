using System;
using TicketingLibrary.Interfaces;
using TicketingLibrary.Models;

namespace TicketingLibrary.Repos;

public class EFTicketTypeRepository : ITicketTypeRepository
{
    EYTicketPortalContext context = new EYTicketPortalContext();
    public Task AddTicketTypeAsync(TicketType ticketType)
    {
        try{
            await context.TicketTypes.AddAsync(ticketType);
            await context.SaveChangesAsync();
        }
            catch (DbUpdateException ex)
            {
                SqlException sqlException = ex.InnerException as SqlException;
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

    public Task DeleteTicketTypeAsync(string ticketTypeId)
    {
    TicketType ticketTypetodelete = await context.TicketTypes.Include("Tickets").FirstOrDefaultAsync(t=>t.TicketTypeId == ticketTypeId);
    if(ticketTypetodelete == null){
        throw new TicketException("No Such Ticket ID",502);
    }
    if(ticketTypetodelete.TicketTypes.Count==0){
        context.TicketTypes.SaveChangesAsync();
    }
    else{
        throw new TicketException("Cannot delete ticket type because it is assigned to tickets",504);
    }
                              
    }

    public Task<List<TicketType>> GetAllTicketTypesAsync()
    {
        List<TicketType> ticketTypes = await context.TicketReplies.ToListAsync();
        return ticketTypes;
    }

    public Task<List<TicketType>> GetByDepartmentIdAsync(string deptId)
    {
        try
        {
            List<TicketType> ticketTypes = await (from t in context.TicketTypes where t.DeptId == deptId select t).ToListAsync();
            return ticketTypes;
        }
        catch
        {
            throw new TicketException("No Ticket Types Found for Department", 505);
        }
    }

    public Task<List<TicketType>> GetBySlaIdAsync(string slaId)
    {
        try
        {
            List<TicketType> ticketTypes = await (from t in context.TicketTypes where t.SLAId == slaId select t).ToListAsync();
            return ticketTypes;
        }
        catch
        {
            throw new TicketException("No Ticket Types Found for SLA", 506);
        }
    }

    public Task<TicketType> GetTicketTypeAsync(string ticketTypeId)
    {
        try{
            TicketType ticketType = await(from t in context.TicketTypes where t.TicketTypeId == ticketTypeId from t).FirstAsync();
            return ticketType;
        }
       catch
            {
                throw new TicketException("No such Ticket Type ID", 502);
            }
    }

    public Task UpdateTicketTypeAsync(string ticketTypeId, TicketType ticketType)
    {
        try
        {
            TicketType existingTicketType = await GetTicketTypeAsync(ticketTypeId);
            
            existingTicketType.TicketName = ticketType.TicketName;
            existingTicketType.Description = ticketType.Description;
            existingTicketType.SlaId = ticketType.SlaId;
            existingTicketType.DepartmentId = ticketType.DepartmentId;
            
            await context.SaveChangesAsync();
        }
            catch
            {
                throw new TicketException("Unable To Add To DB", 503);
            }
    }
}
