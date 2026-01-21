using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TicketingLibrary.Models
{
    [Table("Ticket")]
    public class Ticket
    {
        [Key]
        [Column(TypeName = "CHAR(4)")]
        public string? TicketId { get; set; }

        [Column(TypeName = "CHAR(15)")]
        public string? Title { get; set; }

        [Column(TypeName = "CHAR(100)")]
        public string? Description { get; set; }

        [Column(TypeName = "CHAR(4)")]
        public string? TicketTypeId { get; set; }

        [Column(TypeName = "DATETIME")]
        public DateTime? TicketCreatedDate { get; set; }

        public string? Status { get; set; }

        [Column(TypeName = "CHAR(4)")]
        
        public string? CreatedByEmpId { get; set; }

        [Column(TypeName = "CHAR(4)")]
        
        public string? AssignedToEmpId { get; set; }

        // [JsonIgnore]
        [ForeignKey("TicketTypeId")]
        public virtual TicketType? TicketType { get; set; }

        // [JsonIgnore]
        [ForeignKey("CreatedByEmpId")]
        public virtual Employee? CreatedByEmployee { get; set; }

        // [JsonIgnore]
        [ForeignKey("AssignedToEmpId")]
        public virtual Employee? AssignedToEmployee { get; set; }

        // [JsonIgnore]
        public virtual ICollection<TicketReply> TicketReplies { get; set; } = new List<TicketReply>();
    }
}