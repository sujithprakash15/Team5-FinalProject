using System;
using TicketingLibrary.Interfaces;
using TicketingLibrary.Models;

namespace TicketingLibrary.Repos;

public class EFTicketRepository : ITicketRepository
{
    public Task AddTicketAsync(Ticket ticket)
    {
        throw new NotImplementedException();
    }

    public Task<List<Ticket>> GetAllTicketsAsync()
    {
        throw new NotImplementedException();
    }

    public Task<Ticket> GetTicketByIdAsync(int ticketId)
    {
        throw new NotImplementedException();
    }

    public Task<List<Ticket>> GetTicketsByAssignedEmployeeAsync(int empId)
    {
        throw new NotImplementedException();
    }

    public Task<List<Ticket>> GetTicketsByEmployeeAsync(int empId)
    {
        throw new NotImplementedException();
    }

    public Task<List<Ticket>> GetTicketsByTicketTypeAsync(int ticketTypeId)
    {
        throw new NotImplementedException();
    }

    public Task UpdateTicketStatusAsync(int ticketId, string status)
    {
        throw new NotImplementedException();
    }
}
