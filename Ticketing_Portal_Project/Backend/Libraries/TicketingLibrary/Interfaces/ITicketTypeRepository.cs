using System;
using TicketingLibrary.Models;

namespace TicketingLibrary.Interfaces;

public interface ITicketTypeRepository
{
    Task<List<TicketType>> GetAllTicketTypesAsync();
    Task<TicketType> GetTicketTypeAsync();
    Task AddTicketTypeAsync(TicketType ticketType);
    Task UpdateTicketTypeAsync(string ticketTypeId,TicketType ticketType);
    Task DeleteTicketTypeAsync(string ticketTypeId);
    Task<List<TicketType>> GetByDepartmentIdAsync(string departmentId);
    Task<List<TicketType>> GetBySlaIdAsync(string slaId);
}
