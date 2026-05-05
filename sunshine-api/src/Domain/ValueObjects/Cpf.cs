using SunshineApi.Domain.Exceptions;

namespace SunshineApi.Domain.ValueObjects;

public sealed record Cpf
{
    public string Value { get; private init; } = string.Empty;

    private Cpf() { }

    public Cpf(string value)
    {
        var digits = new string(value.Where(char.IsDigit).ToArray());

        if (digits.Length != 11 || digits.Distinct().Count() == 1)
            throw new DomainException("CPF inválido.");

        if (!ValidateDigits(digits))
            throw new DomainException("CPF inválido.");

        Value = digits;
    }

    private static bool ValidateDigits(string digits)
    {
        var sum = 0;
        for (var i = 0; i < 9; i++)
            sum += (digits[i] - '0') * (10 - i);

        var first = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        if (first != digits[9] - '0') return false;

        sum = 0;
        for (var i = 0; i < 10; i++)
            sum += (digits[i] - '0') * (11 - i);

        var second = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        return second == digits[10] - '0';
    }

    public string Formatted => $"{Value[..3]}.{Value[3..6]}.{Value[6..9]}-{Value[9..]}";
    public static implicit operator string(Cpf cpf) => cpf.Value;
    public override string ToString() => Formatted;
}
