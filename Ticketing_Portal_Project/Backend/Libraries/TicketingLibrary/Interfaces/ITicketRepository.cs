using System;
using TicketingLibrary.Models;
namespace TicketingLibrary.Interfaces;

public interface ITicketRepository
{
    Task<List<Ticket>> GetAllTicketsAsync();
    Task<Ticket> GetTicketByIdAsync(int ticketId);
    Task<List<Ticket>> GetTicketsByEmployeeAsync(int empId);
    Task<List<Ticket>> GetTicketsByAssignedEmployeeAsync(int empId);
    Task AddTicketAsync(Ticket ticket);
    Task UpdateTicketStatusAsync(int ticketId, string status);
    Task<List<Ticket>> GetTicketsByTicketTypeAsync(int ticketTypeId);
}

