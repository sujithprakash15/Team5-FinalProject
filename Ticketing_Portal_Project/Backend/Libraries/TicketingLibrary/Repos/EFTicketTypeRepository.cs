using System;
using TicketingLibrary.Interfaces;
using TicketingLibrary.Models;

namespace TicketingLibrary.Repos;

public class EFTicketTypeRepository : ITicketTypeRepository
{
    public Task AddTicketTypeAsync(TicketType ticketType)
    {
        throw new NotImplementedException();
    }

    public Task DeleteTicketTypeAsync(string ticketTypeId)
    {
        throw new NotImplementedException();
    }

    public Task<List<TicketType>> GetAllTicketTypesAsync()
    {
        throw new NotImplementedException();
    }

    public Task<List<TicketType>> GetByDepartmentIdAsync(string departmentId)
    {
        throw new NotImplementedException();
    }

    public Task<List<TicketType>> GetBySlaIdAsync(string slaId)
    {
        throw new NotImplementedException();
    }

    public Task<TicketType> GetTicketTypeAsync()
    {
        throw new NotImplementedException();
    }

    public Task UpdateTicketTypeAsync(string ticketTypeId, TicketType ticketType)
    {
        throw new NotImplementedException();
    }
}
