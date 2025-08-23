using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ScottsdaleToursApi.Models
{
    public enum PaymentMethod
    {
        Stripe,
        PayPal,
        Cash
    }

    public enum PaymentStatus
    {
        Pending,
        Completed,
        Failed,
        Refunded
    }

    public class Payment
    {
        [Key]
        public int PaymentId { get; set; }
        
        [Required]
        public int BookingId { get; set; }
        
        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Amount { get; set; }
        
        [Required]
        public PaymentMethod Method { get; set; }
        
        [Required]
        public PaymentStatus Status { get; set; } = PaymentStatus.Pending;
        
        [StringLength(100)]
        public string TransactionId { get; set; } = string.Empty;
        
        [StringLength(100)]
        public string StripePaymentIntentId { get; set; } = string.Empty;
        
        public DateTime ProcessedAt { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        [ForeignKey("BookingId")]
        public virtual Booking Booking { get; set; } = null!;
    }
}