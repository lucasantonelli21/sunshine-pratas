using Microsoft.EntityFrameworkCore;
using SunshineApi.Domain.Entities;
using SunshineApi.Domain.Repositories;
using SunshineApi.Infrastructure.Persistence;

namespace SunshineApi.Infrastructure.Repositories;

public class TransactionRepository : ITransactionRepository
{
    private readonly AppDbContext _context;

    public TransactionRepository(AppDbContext context) => _context = context;

    public async Task<Transaction?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        await _context.Transactions.FindAsync([id], ct);

    public async Task<IEnumerable<Transaction>> GetAllAsync(CancellationToken ct = default) =>
        await _context.Transactions.OrderByDescending(t => t.Date).ToListAsync(ct);

    public async Task AddAsync(Transaction transaction, CancellationToken ct = default) =>
        await _context.Transactions.AddAsync(transaction, ct);

    public Task UpdateAsync(Transaction transaction, CancellationToken ct = default)
    {
        _context.Transactions.Update(transaction);
        return Task.CompletedTask;
    }

    public async Task DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var t = await _context.Transactions.FindAsync([id], ct);
        if (t is not null) _context.Transactions.Remove(t);
    }
}
