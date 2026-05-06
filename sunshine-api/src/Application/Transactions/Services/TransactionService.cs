using SunshineApi.Application.Transactions.DTOs;
using SunshineApi.Application.Transactions.Interfaces;
using SunshineApi.Domain.Entities;
using SunshineApi.Domain.Exceptions;
using SunshineApi.Domain.Interfaces;
using SunshineApi.Domain.Repositories;

namespace SunshineApi.Application.Transactions.Services;

public class TransactionService : ITransactionService
{
    private readonly ITransactionRepository _repository;
    private readonly IUnitOfWork _unitOfWork;

    public TransactionService(ITransactionRepository repository, IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task<TransactionDto> CreateAsync(CreateTransactionDto dto, Guid userId, CancellationToken ct = default)
    {
        var transaction = Transaction.Create(
            dto.Description,
            dto.Amount,
            dto.Date,
            dto.Type,
            userId,
            dto.PaymentMethod,
            dto.Category,
            dto.Notes);

        await _repository.AddAsync(transaction, ct);
        await _unitOfWork.CommitAsync(ct);
        return ToDto(transaction);
    }

    public async Task<TransactionDto?> GetByIdAsync(Guid id, CancellationToken ct = default)
    {
        var t = await _repository.GetByIdAsync(id, ct);
        return t is null ? null : ToDto(t);
    }

    public async Task<IEnumerable<TransactionDto>> GetAllAsync(CancellationToken ct = default) =>
        (await _repository.GetAllAsync(ct)).Select(ToDto);

    public async Task<TransactionDto> UpdateAsync(Guid id, UpdateTransactionDto dto, CancellationToken ct = default)
    {
        var t = await _repository.GetByIdAsync(id, ct)
            ?? throw new NotFoundException("Transação não encontrada.");

        t.Update(dto.Description, dto.Amount, dto.Date, dto.PaymentMethod, dto.Category, dto.Notes);

        await _repository.UpdateAsync(t, ct);
        await _unitOfWork.CommitAsync(ct);
        return ToDto(t);
    }

    public async Task SettleAsync(Guid id, CancellationToken ct = default)
    {
        var t = await _repository.GetByIdAsync(id, ct)
            ?? throw new NotFoundException("Transação não encontrada.");

        t.Settle();
        await _repository.UpdateAsync(t, ct);
        await _unitOfWork.CommitAsync(ct);
    }

    public async Task DeleteAsync(Guid id, CancellationToken ct = default)
    {
        if (await _repository.GetByIdAsync(id, ct) is null)
            throw new NotFoundException("Transação não encontrada.");

        await _repository.DeleteAsync(id, ct);
        await _unitOfWork.CommitAsync(ct);
    }

    private static TransactionDto ToDto(Transaction t) =>
        new(t.Id, t.Description, t.Amount, t.Date,
            t.Type.ToString(), t.Status.ToString(),
            t.PaymentMethod?.ToString(), t.Category, t.Notes,
            t.UserId, t.CreatedAt);
}
