using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ScottsdaleToursApi.Models
{
    public class Review
    {
        [Key]
        public int ReviewId { get; set; }
        
        [Required]
        public int TourId { get; set; }
        
        [Required]
        public string CustomerId { get; set; } = string.Empty;
        
        [Required]
        [Range(1, 5)]
        public int Rating { get; set; }
        
        [StringLength(1000)]
        public string Comment { get; set; } = string.Empty;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        [ForeignKey("TourId")]
        public virtual Tour Tour { get; set; } = null!;
        
        [ForeignKey("CustomerId")]
        public virtual User Customer { get; set; } = null!;
    }
}