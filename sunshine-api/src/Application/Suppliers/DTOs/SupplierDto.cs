namespace SunshineApi.Application.Suppliers.DTOs;

public record SupplierDto(
    Guid Id,
    string Name,
    string? TradeName,
    string? Email,
    string? Phone,
    string Document,
    string DocumentType,
    string? ContactName,
    string? ContactEmail,
    string? ContactPhone,
    AddressDto? Address,
    string? PaymentTerms,
    string? Notes,
    bool IsActive,
    DateTime CreatedAt);
