using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ScottsdaleToursApi.Models;

namespace ScottsdaleToursApi.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Tour> Tours { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Review> Reviews { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Configure relationships
            builder.Entity<Supplier>()
                .HasOne(s => s.User)
                .WithOne(u => u.Supplier)
                .HasForeignKey<Supplier>(s => s.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Tour>()
                .HasOne(t => t.Supplier)
                .WithMany(s => s.Tours)
                .HasForeignKey(t => t.SupplierId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Booking>()
                .HasOne(b => b.Tour)
                .WithMany(t => t.Bookings)
                .HasForeignKey(b => b.TourId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Booking>()
                .HasOne(b => b.Customer)
                .WithMany(u => u.Bookings)
                .HasForeignKey(b => b.CustomerId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Payment>()
                .HasOne(p => p.Booking)
                .WithOne(b => b.Payment)
                .HasForeignKey<Payment>(p => p.BookingId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Review>()
                .HasOne(r => r.Tour)
                .WithMany(t => t.Reviews)
                .HasForeignKey(r => r.TourId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Review>()
                .HasOne(r => r.Customer)
                .WithMany(u => u.Reviews)
                .HasForeignKey(r => r.CustomerId)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure decimal precision
            builder.Entity<Tour>()
                .Property(t => t.Price)
                .HasColumnType("decimal(10,2)");

            builder.Entity<Booking>()
                .Property(b => b.TotalAmount)
                .HasColumnType("decimal(10,2)");

            builder.Entity<Payment>()
                .Property(p => p.Amount)
                .HasColumnType("decimal(10,2)");

            // Add indexes for better performance
            builder.Entity<Tour>()
                .HasIndex(t => t.Location);

            builder.Entity<Tour>()
                .HasIndex(t => t.IsActive);

            builder.Entity<Booking>()
                .HasIndex(b => b.BookingDate);

            builder.Entity<Booking>()
                .HasIndex(b => b.Status);
        }
    }
}