using Microsoft.EntityFrameworkCore;
using SunshineApi.Domain.Entities;
using SunshineApi.Domain.Repositories;
using SunshineApi.Infrastructure.Persistence;

namespace SunshineApi.Infrastructure.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _context;

    public ProductRepository(AppDbContext context) => _context = context;

    public async Task<Product?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        await _context.Products
            .Include(p => p.Images)
            .FirstOrDefaultAsync(p => p.Id == id, ct);

    public async Task<IEnumerable<Product>> GetAllAsync(bool onlyActive = true, CancellationToken ct = default) =>
        await _context.Products
            .Include(p => p.Images)
            .Where(p => !onlyActive || p.IsActive)
            .ToListAsync(ct);

    public async Task AddAsync(Product product, CancellationToken ct = default) =>
        await _context.Products.AddAsync(product, ct);

    public Task UpdateAsync(Product product, CancellationToken ct = default)
    {
        _context.Products.Update(product);
        return Task.CompletedTask;
    }

    public async Task DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var product = await _context.Products.FindAsync([id], ct);
        if (product is not null)
            _context.Products.Remove(product);
    }
}
