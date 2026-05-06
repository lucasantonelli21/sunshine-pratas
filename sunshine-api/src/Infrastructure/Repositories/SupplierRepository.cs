using Microsoft.EntityFrameworkCore;
using SunshineApi.Domain.Entities;
using SunshineApi.Domain.Repositories;
using SunshineApi.Infrastructure.Persistence;

namespace SunshineApi.Infrastructure.Repositories;

public class SupplierRepository : ISupplierRepository
{
    private readonly AppDbContext _context;

    public SupplierRepository(AppDbContext context) => _context = context;

    public async Task<Supplier?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        await _context.Suppliers.FindAsync([id], ct);

    public async Task<IEnumerable<Supplier>> GetAllAsync(CancellationToken ct = default) =>
        await _context.Suppliers.OrderBy(s => s.Name).ToListAsync(ct);

    public async Task AddAsync(Supplier supplier, CancellationToken ct = default) =>
        await _context.Suppliers.AddAsync(supplier, ct);

    public Task UpdateAsync(Supplier supplier, CancellationToken ct = default)
    {
        _context.Suppliers.Update(supplier);
        return Task.CompletedTask;
    }

    public async Task DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var s = await _context.Suppliers.FindAsync([id], ct);
        if (s is not null) _context.Suppliers.Remove(s);
    }

    public async Task<bool> ExistsByDocumentAsync(string document, CancellationToken ct = default) =>
        await _context.Suppliers.AnyAsync(s => s.Document == document.Trim(), ct);
}
