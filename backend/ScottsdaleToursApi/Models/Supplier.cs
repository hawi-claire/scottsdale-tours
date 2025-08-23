using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ScottsdaleToursApi.Models
{
    public class Supplier
    {
        [Key]
        public int SupplierId { get; set; }
        
        [Required]
        public string UserId { get; set; } = string.Empty;
        
        [Required]
        [StringLength(200)]
        public string BusinessName { get; set; } = string.Empty;
        
        [StringLength(500)]
        public string Description { get; set; } = string.Empty;
        
        [StringLength(20)]
        public string PhoneNumber { get; set; } = string.Empty;
        
        [StringLength(200)]
        public string Address { get; set; } = string.Empty;
        
        public bool IsApproved { get; set; } = false;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        [ForeignKey("UserId")]
        public virtual User User { get; set; } = null!;
        
        public virtual ICollection<Tour> Tours { get; set; } = new List<Tour>();
    }
}