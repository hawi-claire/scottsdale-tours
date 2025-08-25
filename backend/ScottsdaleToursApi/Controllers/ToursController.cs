using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ScottsdaleToursApi.Data;
using ScottsdaleToursApi.Models;

namespace ScottsdaleToursApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ToursController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ToursController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Tours
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetTours()
        {
            var tours = await _context.Tours
                .Include(t => t.Supplier)
                .ThenInclude(s => s.User)
                .Where(t => t.IsActive && t.IsApproved)
                .Select(t => new
                {
                    t.TourId,
                    t.Title,
                    t.Description,
                    t.Price,
                    t.Location,
                    t.DurationMinutes,
                    t.ImageUrl,
                    t.Capacity,
                    SupplierName = t.Supplier.BusinessName,
                    AverageRating = t.Reviews.Any() ? t.Reviews.Average(r => r.Rating) : 0,
                    ReviewCount = t.Reviews.Count(),
                    t.CreatedAt
                })
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();

            return Ok(tours);
        }

        // GET: api/Tours/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetTour(int id)
        {
            var tour = await _context.Tours
                .Include(t => t.Supplier)
                .ThenInclude(s => s.User)
                .Include(t => t.Reviews)
                .ThenInclude(r => r.Customer)
                .Where(t => t.TourId == id && t.IsActive && t.IsApproved)
                .Select(t => new
                {
                    t.TourId,
                    t.Title,
                    t.Description,
                    t.Price,
                    t.Location,
                    t.DurationMinutes,
                    t.ImageUrl,
                    t.Capacity,
                    Supplier = new
                    {
                        t.Supplier.BusinessName,
                        t.Supplier.Description,
                        t.Supplier.PhoneNumber
                    },
                    Reviews = t.Reviews.Select(r => new
                    {
                        r.ReviewId,
                        r.Rating,
                        r.Comment,
                        r.CreatedAt,
                        CustomerName = $"{r.Customer.FirstName} {r.Customer.LastName[0]}."
                    }).ToList(),
                    AverageRating = t.Reviews.Any() ? t.Reviews.Average(r => r.Rating) : 0,
                    ReviewCount = t.Reviews.Count()
                })
                .FirstOrDefaultAsync();

            if (tour == null)
            {
                return NotFound();
            }

            return Ok(tour);
        }

        // GET: api/Tours/search
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<object>>> SearchTours(
            [FromQuery] string? location = null,
            [FromQuery] decimal? minPrice = null,
            [FromQuery] decimal? maxPrice = null,
            [FromQuery] int? minRating = null)
        {
            var query = _context.Tours
                .Include(t => t.Supplier)
                .ThenInclude(s => s.User)
                .Where(t => t.IsActive && t.IsApproved);

            if (!string.IsNullOrEmpty(location))
            {
                query = query.Where(t => t.Location.Contains(location));
            }

            if (minPrice.HasValue)
            {
                query = query.Where(t => t.Price >= minPrice.Value);
            }

            if (maxPrice.HasValue)
            {
                query = query.Where(t => t.Price <= maxPrice.Value);
            }

            var tours = await query
                .Select(t => new
                {
                    t.TourId,
                    t.Title,
                    t.Description,
                    t.Price,
                    t.Location,
                    t.DurationMinutes,
                    t.ImageUrl,
                    t.Capacity,
                    SupplierName = t.Supplier.BusinessName,
                    AverageRating = t.Reviews.Any() ? t.Reviews.Average(r => r.Rating) : 0,
                    ReviewCount = t.Reviews.Count()
                })
                .ToListAsync();

            // Filter by rating if specified (done after database query due to calculated field)
            if (minRating.HasValue)
            {
                tours = tours.Where(t => t.AverageRating >= minRating.Value).ToList();
            }

            return Ok(tours.OrderByDescending(t => t.AverageRating));
        }
    }
}