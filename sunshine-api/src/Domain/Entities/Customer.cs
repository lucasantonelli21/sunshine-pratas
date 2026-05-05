using SunshineApi.Domain.ValueObjects;

namespace SunshineApi.Domain.Entities;

public class Customer
{
    public Guid Id { get; private set; }
    public string Name { get; private set; } = string.Empty;
    public Email Email { get; private set; } = null!;
    public string Phone { get; private set; } = string.Empty;
    public Cpf Cpf { get; private set; } = null!;
    public DateTime CreatedAt { get; private set; }

    private Customer() { }

    public static Customer Create(string name, Email email, string phone, Cpf cpf)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(name);
        ArgumentException.ThrowIfNullOrWhiteSpace(phone);

        return new Customer
        {
            Id = Guid.NewGuid(),
            Name = name.Trim(),
            Email = email,
            Phone = phone.Trim(),
            Cpf = cpf,
            CreatedAt = DateTime.UtcNow
        };
    }

    public void UpdateName(string name)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(name);
        Name = name.Trim();
    }

    public void UpdateEmail(Email email) => Email = email;
    public void UpdatePhone(string phone) => Phone = phone.Trim();
}
