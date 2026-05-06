namespace SunshineApi.Application.Transactions.DTOs;

public record TransactionDto(
    Guid Id,
    string Description,
    decimal Amount,
    DateTime Date,
    string Type,
    string Status,
    string? PaymentMethod,
    string? Category,
    string? Notes,
    Guid UserId,
    DateTime CreatedAt);
