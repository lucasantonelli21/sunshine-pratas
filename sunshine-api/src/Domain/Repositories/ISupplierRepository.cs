using SunshineApi.Domain.Entities;

namespace SunshineApi.Domain.Repositories;

public interface ISupplierRepository
{
    Task<Supplier?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<IEnumerable<Supplier>> GetAllAsync(CancellationToken ct = default);
    Task AddAsync(Supplier supplier, CancellationToken ct = default);
    Task UpdateAsync(Supplier supplier, CancellationToken ct = default);
    Task DeleteAsync(Guid id, CancellationToken ct = default);
    Task<bool> ExistsByDocumentAsync(string document, CancellationToken ct = default);
}
