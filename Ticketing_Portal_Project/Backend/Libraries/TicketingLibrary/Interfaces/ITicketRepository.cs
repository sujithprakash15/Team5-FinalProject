using TicketingLibrary.Models;
 
namespace TicketingLibrary.Interfaces
{
    public interface ITicketRepository
    {
        Task<List<Ticket>> GetAllTicketsAsync();
        Task<Ticket> GetTicketByIdAsync(string ticketId);
        Task<List<Ticket>> GetTicketsByEmployeeAsync(string empId);
        Task<List<Ticket>> GetTicketsByAssignedEmployeeAsync(string empId);
        Task<List<Ticket>> GetTicketsByTicketTypeAsync(string ticketTypeId);
        Task AddTicketAsync(Ticket ticket);
        Task UpdateTicketStatusAsync(string ticketId, string status);
        Task DeleteTicketAsync (string ticketId);
    }
}
 