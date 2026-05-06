using SunshineApi.Domain.Enums;

namespace SunshineApi.Application.Transactions.DTOs;

public record UpdateTransactionDto(
    string Description,
    decimal Amount,
    DateTime Date,
    PaymentMethod? PaymentMethod,
    string? Category,
    string? Notes);
