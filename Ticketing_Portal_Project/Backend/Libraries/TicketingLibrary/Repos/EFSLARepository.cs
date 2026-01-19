using System;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using TicketingLibrary.Interfaces;
using TicketingLibrary.Models;

namespace TicketingLibrary.Repositories
{
    public class EFSLARepository : ISLARepository
    {
        EYTicketPortalContext context = new EYTicketPortalContext();

        public async Task<List<SLA>> GetAllSLAsAsync()
        {
            return await context.SLAs.ToListAsync();
        }
        public async Task<SLA> GetSLAAsync(string slaId)
        {
            try
            {
                SLA sla = await context.SLAs
                .FirstAsync(s => s.SLAId == slaId);
                return sla;
            }
            catch
            {
                throw new TicketException("No such SLA ID", 502);
            }
        }
        public async Task AddSLAAsync(SLA sla)
        {
            try
            {
                await context.SLAs.AddAsync(sla);
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                SqlException sqlException = ex.InnerException as SqlException;
                int errorNumber = sqlException.Number;

                switch (errorNumber)
                {
                    case 2627:
                        throw new TicketException("SLA ID already exists", 501);
                    default:
                        throw new TicketException(sqlException.Message, 599);
                }
            }
        }
        public async Task UpdateSLAAsync(string slaId, SLA sla)
        {
              SLA slaToEdit = await GetSLAAsync(slaId);

            try
            {
              
                slaToEdit.SLAName = sla.SLAName;
                slaToEdit.Priority = sla.Priority;
                slaToEdit.ResponseTime = sla.ResponseTime;
                slaToEdit.ResolutionHours = sla.ResolutionHours;

                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new TicketException(ex.Message, 503);
            }
        }
        public async Task DeleteSLAAsync(string slaId)
        {
            SLA slaToDelete = await context.SLAs
                .Include("TicketTypes")
                .FirstOrDefaultAsync(s => s.SLAId == slaId);

            if (slaToDelete == null)
            {
                throw new TicketException("No such SLA ID", 502);
            }

            if (slaToDelete.TicketTypes.Count == 0)
            {
                context.SLAs.Remove(slaToDelete);
                await context.SaveChangesAsync();
            }
            else
            {
                throw new TicketException(
                    "Cannot delete SLA because it is assigned to Ticket Types", 504);
            }
        }
    }
}
