using SunshineApi.Domain.Enums;

namespace SunshineApi.Domain.Entities;

public class Transaction
{
    public Guid Id { get; private set; }
    public string Description { get; private set; } = string.Empty;
    public decimal Amount { get; private set; }
    public DateTime Date { get; private set; }
    public TransactionType Type { get; private set; }
    public TransactionStatus Status { get; private set; }
    public PaymentMethod? PaymentMethod { get; private set; }
    public string? Category { get; private set; }
    public string? Notes { get; private set; }
    public Guid UserId { get; private set; }
    public DateTime CreatedAt { get; private set; }

    private Transaction() { }

    public static Transaction Create(
        string description,
        decimal amount,
        DateTime date,
        TransactionType type,
        Guid userId,
        PaymentMethod? paymentMethod = null,
        string? category = null,
        string? notes = null)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(description);
        if (amount <= 0) throw new ArgumentException("O valor deve ser positivo.", nameof(amount));

        return new Transaction
        {
            Id = Guid.NewGuid(),
            Description = description.Trim(),
            Amount = amount,
            Date = date,
            Type = type,
            Status = TransactionStatus.Pending,
            PaymentMethod = paymentMethod,
            Category = category?.Trim(),
            Notes = notes?.Trim(),
            UserId = userId,
            CreatedAt = DateTime.UtcNow
        };
    }

    public void Update(string description, decimal amount, DateTime date, PaymentMethod? paymentMethod, string? category, string? notes)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(description);
        if (amount <= 0) throw new ArgumentException("O valor deve ser positivo.", nameof(amount));
        Description = description.Trim();
        Amount = amount;
        Date = date;
        PaymentMethod = paymentMethod;
        Category = category?.Trim();
        Notes = notes?.Trim();
    }

    public void Settle() => Status = TransactionStatus.Settled;
}
