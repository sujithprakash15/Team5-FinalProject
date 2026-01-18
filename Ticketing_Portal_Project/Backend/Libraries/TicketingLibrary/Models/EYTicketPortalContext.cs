using System;
using Microsoft.EntityFrameworkCore;

namespace TicketingLibrary.Models;

public class EYTicketPortalContext : DbContext
{
    public EYTicketPortalContext()
    {

    }
    public EYTicketPortalContext(DbContextOptions<EYTicketPortalContext> options) : base(options)
    {

    }

    public virtual DbSet<Employee> Employees { get; set; }
    public virtual DbSet<Department> Departments { get; set; }
    public virtual DbSet<SLA> SLAs { get; set; }
    public virtual DbSet<TicketReply> TicketReplies { get; set; }
    public virtual DbSet<Ticket> Tickets { get; set; }
    public virtual DbSet<TicketType> TicketTypes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(@"data source=localhost\SQLEXPRESS; database=EYTicketPortalDB; user id=sa; password=User%2025; Trust Server Certificate=true");
    }

}