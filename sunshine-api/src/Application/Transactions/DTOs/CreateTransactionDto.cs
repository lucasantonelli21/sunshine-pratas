using SunshineApi.Domain.Enums;

namespace SunshineApi.Application.Transactions.DTOs;

public record CreateTransactionDto(
    string Description,
    decimal Amount,
    DateTime Date,
    TransactionType Type,
    PaymentMethod? PaymentMethod,
    string? Category,
    string? Notes);
