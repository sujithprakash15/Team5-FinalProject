using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TicketingLibrary.Models
{
    [Table("TicketType")]
    public class TicketType
    {
        [Key]
        [Column(TypeName = "CHAR(4)")]
        public string? TicketTypeId { get; set; }

        [Column(TypeName = "VARCHAR(30)")]
        public string? TypeName { get; set; }

        [Column(TypeName = "VARCHAR(100)")]
        public string? Description { get; set; }

        [Column(TypeName = "CHAR(4)")]
        public string? SLAId { get; set; }

        [Column(TypeName = "CHAR(4)")]
        public string? DeptId { get; set; }
        
        // [JsonIgnore]
        [ForeignKey("SLAId")]
        public virtual SLA? SLA { get; set; }

        [ForeignKey("DeptId")]
        // [JsonIgnore]
        public virtual Department? Department { get; set; }

        [JsonIgnore]
        public virtual ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
    }
}