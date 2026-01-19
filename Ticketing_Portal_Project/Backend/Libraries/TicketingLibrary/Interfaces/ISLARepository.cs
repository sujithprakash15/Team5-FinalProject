using System;
using TicketingLibrary.Models;

namespace TicketingLibrary.Interfaces;

public interface ISLARepository
{
    Task<List<SLA>> GetAllSLAsAsync();
    Task<SLA> GetSLAAsync(string slaId);
    Task AddSLAAsync (SLA sla);
    Task UpdateSLAAsync (string slaId, SLA sla);
    Task DeleteSLAAsync (string slaId);

}
