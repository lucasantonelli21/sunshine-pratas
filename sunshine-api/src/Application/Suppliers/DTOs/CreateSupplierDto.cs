namespace SunshineApi.Application.Suppliers.DTOs;

public record CreateSupplierDto(
    string Name,
    string Document,
    string DocumentType,
    string? TradeName,
    string? Email,
    string? Phone,
    string? ContactName,
    string? ContactEmail,
    string? ContactPhone,
    AddressDto? Address,
    string? PaymentTerms,
    string? Notes);
