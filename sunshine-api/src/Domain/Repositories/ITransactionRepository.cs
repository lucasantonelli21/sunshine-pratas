using SunshineApi.Domain.Entities;

namespace SunshineApi.Domain.Repositories;

public interface ITransactionRepository
{
    Task<Transaction?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<IEnumerable<Transaction>> GetAllAsync(CancellationToken ct = default);
    Task AddAsync(Transaction transaction, CancellationToken ct = default);
    Task UpdateAsync(Transaction transaction, CancellationToken ct = default);
    Task DeleteAsync(Guid id, CancellationToken ct = default);
}
