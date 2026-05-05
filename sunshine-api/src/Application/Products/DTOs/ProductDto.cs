namespace SunshineApi.Application.Products.DTOs;

public record ProductDto(
    Guid Id,
    string Name,
    string Description,
    decimal Price,
    string Type,
    string Gender,
    string Material,
    int Stock,
    bool IsActive,
    IEnumerable<string> Images,
    DateTime CreatedAt);
