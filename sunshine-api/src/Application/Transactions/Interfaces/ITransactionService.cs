using SunshineApi.Application.Transactions.DTOs;

namespace SunshineApi.Application.Transactions.Interfaces;

public interface ITransactionService
{
    Task<TransactionDto> CreateAsync(CreateTransactionDto dto, Guid userId, CancellationToken ct = default);
    Task<TransactionDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<IEnumerable<TransactionDto>> GetAllAsync(CancellationToken ct = default);
    Task<TransactionDto> UpdateAsync(Guid id, UpdateTransactionDto dto, CancellationToken ct = default);
    Task SettleAsync(Guid id, CancellationToken ct = default);
    Task DeleteAsync(Guid id, CancellationToken ct = default);
}
