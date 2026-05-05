using SunshineApi.Domain.Enums;

namespace SunshineApi.Application.Products.DTOs;

public record UpdateProductDto(
    string Name,
    string Description,
    decimal Price,
    ProductType Type,
    ProductGender Gender,
    ProductMaterial Material,
    int Stock,
    List<string> ImageUrls);
