using SunshineApi.Domain.Exceptions;

namespace SunshineApi.Domain.ValueObjects;

public sealed record Email
{
    public string Value { get; private init; } = string.Empty;

    private Email() { }

    public Email(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new DomainException("Email não pode ser vazio.");

        var normalized = value.ToLowerInvariant().Trim();

        if (!IsValid(normalized))
            throw new DomainException("Email inválido.");

        Value = normalized;
    }

    private static bool IsValid(string email)
    {
        try { _ = new System.Net.Mail.MailAddress(email); return true; }
        catch { return false; }
    }

    public static implicit operator string(Email email) => email.Value;
    public override string ToString() => Value;
}
