using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ScottsdaleToursApi.Models
{
    public class Tour
    {
        [Key]
        public int TourId { get; set; }
        
        [Required]
        public int SupplierId { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        [StringLength(1000)]
        public string Description { get; set; } = string.Empty;
        
        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Price { get; set; }
        
        [Required]
        public int Capacity { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Location { get; set; } = string.Empty;
        
        public int DurationMinutes { get; set; }
        
        [StringLength(500)]
        public string ImageUrl { get; set; } = string.Empty;
        
        public bool IsActive { get; set; } = true;
        
        public bool IsApproved { get; set; } = false;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        [ForeignKey("SupplierId")]
        public virtual Supplier Supplier { get; set; } = null!;
        
        public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();
        public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
    }
}