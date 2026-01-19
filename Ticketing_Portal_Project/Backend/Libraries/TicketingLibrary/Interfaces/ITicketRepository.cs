using TicketingLibrary.Models;
 
namespace TicketingLibrary.Interfaces
{
<<<<<<< HEAD
    Task<List<Ticket>> GetAllTicketsAsync();
    Task<Ticket> GetTicketByIdAsync(int ticketId);
    Task<List<Ticket>> GetTicketsByEmployeeAsync(int empId);
    Task<List<Ticket>> GetTicketsByAssignedEmployeeAsync(int empId);
    Task AddTicketAsync(Ticket ticket);
    Task UpdateTicketStatusAsync(int ticketId, string status);
    Task DeleteTicketStatusAsync(int ticketId);
    Task<List<Ticket>> GetTicketsByTicketTypeAsync(int ticketTypeId);
=======
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
>>>>>>> b3eacf9e40530be53cec3eaeaf9dea38188572fe
}
 