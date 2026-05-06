namespace SunshineApi.Application.Suppliers.DTOs;

public record UpdateSupplierDto(
    string Name,
    string? TradeName,
    string? Email,
    string? Phone,
    string? ContactName,
    string? ContactEmail,
    string? ContactPhone,
    AddressDto? Address,
    string? PaymentTerms,
    string? Notes);
