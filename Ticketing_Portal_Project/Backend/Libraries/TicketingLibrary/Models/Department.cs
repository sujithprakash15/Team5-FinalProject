using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TicketingLibrary.Models
{
    [Table("Department")]
    public class Department
    {
        [Key]
        [Column(TypeName = "CHAR(4)")]
        public string? DeptId { get; set; }

        [Column(TypeName = "VARCHAR(50)")]
        public string? DeptName { get; set; }

        [Column(TypeName = "VARCHAR(100)")]
        public string? Description { get; set; }

        // [JsonIgnore]
        public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();
        // [JsonIgnore]
        public virtual ICollection<TicketType> TicketTypes { get; set; } = new List<TicketType>();
    }
}