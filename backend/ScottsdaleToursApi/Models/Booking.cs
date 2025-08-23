using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ScottsdaleToursApi.Models
{
    public enum BookingStatus
    {
        Pending,
        Confirmed,
        Cancelled,
        Completed
    }

    public class Booking
    {
        [Key]
        public int BookingId { get; set; }
        
        [Required]
        public int TourId { get; set; }
        
        [Required]
        public string CustomerId { get; set; } = string.Empty;
        
        [Required]
        public DateTime BookingDate { get; set; }
        
        [Required]
        public int NumberOfPeople { get; set; }
        
        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal TotalAmount { get; set; }
        
        [Required]
        public BookingStatus Status { get; set; } = BookingStatus.Pending;
        
        [StringLength(500)]
        public string Notes { get; set; } = string.Empty;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        [ForeignKey("TourId")]
        public virtual Tour Tour { get; set; } = null!;
        
        [ForeignKey("CustomerId")]
        public virtual User Customer { get; set; } = null!;
        
        public virtual Payment? Payment { get; set; }
    }
}