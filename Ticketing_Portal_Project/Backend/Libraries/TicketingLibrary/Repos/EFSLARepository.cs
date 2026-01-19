using System;
using TicketingLibrary.Interfaces;
using TicketingLibrary.Models;

namespace TicketingLibrary.Repos;

public class EFSLARepository : ISLARepository
{
    public Task AddSLAAsync(SLA sla)
    {
        throw new NotImplementedException();
    }

    public Task DeleteSLAAsync(string slaId)
    {
        throw new NotImplementedException();
    }

    public Task<List<SLA>> GetAllSLAsAsync()
    {
        throw new NotImplementedException();
    }

    public Task<SLA> GetSLAAsync(string slaId)
    {
        throw new NotImplementedException();
    }

    public Task UpdateSLAAsync(string slaId, SLA sla)
    {
        throw new NotImplementedException();
    }
}
