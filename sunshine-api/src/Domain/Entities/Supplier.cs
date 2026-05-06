namespace SunshineApi.Domain.Entities;

public class Supplier
{
    public Guid Id { get; private set; }
    public string Name { get; private set; } = string.Empty;
    public string? TradeName { get; private set; }
    public string? Email { get; private set; }
    public string? Phone { get; private set; }
    public string Document { get; private set; } = string.Empty;
    public string DocumentType { get; private set; } = string.Empty;
    public string? ContactName { get; private set; }
    public string? ContactEmail { get; private set; }
    public string? ContactPhone { get; private set; }
    public string? AddressStreet { get; private set; }
    public string? AddressNumber { get; private set; }
    public string? AddressComplement { get; private set; }
    public string? AddressNeighborhood { get; private set; }
    public string? AddressCity { get; private set; }
    public string? AddressState { get; private set; }
    public string? AddressZipCode { get; private set; }
    public string? AddressCountry { get; private set; }
    public string? PaymentTerms { get; private set; }
    public string? Notes { get; private set; }
    public bool IsActive { get; private set; }
    public DateTime CreatedAt { get; private set; }

    private Supplier() { }

    public static Supplier Create(
        string name,
        string document,
        string documentType,
        string? tradeName,
        string? email,
        string? phone,
        string? contactName,
        string? contactEmail,
        string? contactPhone,
        string? addressStreet,
        string? addressNumber,
        string? addressComplement,
        string? addressNeighborhood,
        string? addressCity,
        string? addressState,
        string? addressZipCode,
        string? addressCountry,
        string? paymentTerms,
        string? notes)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(name);
        ArgumentException.ThrowIfNullOrWhiteSpace(document);

        return new Supplier
        {
            Id = Guid.NewGuid(),
            Name = name.Trim(),
            Document = document.Trim(),
            DocumentType = documentType.Trim(),
            TradeName = tradeName?.Trim(),
            Email = email?.Trim(),
            Phone = phone?.Trim(),
            ContactName = contactName?.Trim(),
            ContactEmail = contactEmail?.Trim(),
            ContactPhone = contactPhone?.Trim(),
            AddressStreet = addressStreet?.Trim(),
            AddressNumber = addressNumber?.Trim(),
            AddressComplement = addressComplement?.Trim(),
            AddressNeighborhood = addressNeighborhood?.Trim(),
            AddressCity = addressCity?.Trim(),
            AddressState = addressState?.Trim(),
            AddressZipCode = addressZipCode?.Trim(),
            AddressCountry = addressCountry?.Trim(),
            PaymentTerms = paymentTerms?.Trim(),
            Notes = notes?.Trim(),
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };
    }

    public void Update(
        string name,
        string? tradeName,
        string? email,
        string? phone,
        string? contactName,
        string? contactEmail,
        string? contactPhone,
        string? addressStreet,
        string? addressNumber,
        string? addressComplement,
        string? addressNeighborhood,
        string? addressCity,
        string? addressState,
        string? addressZipCode,
        string? addressCountry,
        string? paymentTerms,
        string? notes)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(name);
        Name = name.Trim();
        TradeName = tradeName?.Trim();
        Email = email?.Trim();
        Phone = phone?.Trim();
        ContactName = contactName?.Trim();
        ContactEmail = contactEmail?.Trim();
        ContactPhone = contactPhone?.Trim();
        AddressStreet = addressStreet?.Trim();
        AddressNumber = addressNumber?.Trim();
        AddressComplement = addressComplement?.Trim();
        AddressNeighborhood = addressNeighborhood?.Trim();
        AddressCity = addressCity?.Trim();
        AddressState = addressState?.Trim();
        AddressZipCode = addressZipCode?.Trim();
        AddressCountry = addressCountry?.Trim();
        PaymentTerms = paymentTerms?.Trim();
        Notes = notes?.Trim();
    }

    public void Deactivate() => IsActive = false;
    public void Activate() => IsActive = true;
}
