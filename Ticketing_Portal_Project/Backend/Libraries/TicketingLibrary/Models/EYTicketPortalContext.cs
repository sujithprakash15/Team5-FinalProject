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
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {  
            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.CreatedByEmployee)
                .WithMany(e => e.CreatedTickets)
                .HasForeignKey(t => t.CreatedByEmpId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.AssignedToEmployee)
                .WithMany(e => e.AssignedTickets)
                .HasForeignKey(t => t.AssignedToEmpId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TicketReply>()
                .HasOne(tr => tr.ReplyByCreator)
                .WithMany(e => e.CreatorReplies)
                .HasForeignKey(tr => tr.ReplyByCreatorEmpId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TicketReply>()
                .HasOne(tr => tr.ReplyByAssigned)
                .WithMany(e => e.AssignedReplies)
                .HasForeignKey(tr => tr.ReplyByAssignedEmpId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Ticket>()
                .HasMany(t => t.TicketReplies)
                .WithOne(tr => tr.Ticket)
                .HasForeignKey(tr => tr.TicketId)
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(modelBuilder);
    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
       optionsBuilder.UseSqlServer(
            @"Server=localhost\SQLEXPRESS;
            Database=EYTicketPortalDB3;
            Trusted_Connection=True;
            TrustServerCertificate=True;");
    }

}