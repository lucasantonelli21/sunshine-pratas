using SunshineApi.Application.Products.DTOs;

namespace SunshineApi.Application.Products.Interfaces;

public interface IProductService
{
    Task<ProductDto> CreateAsync(CreateProductDto dto, CancellationToken ct = default);
    Task<ProductDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<IEnumerable<ProductDto>> GetAllAsync(bool onlyActive = true, CancellationToken ct = default);
    Task<ProductDto> UpdateAsync(Guid id, UpdateProductDto dto, CancellationToken ct = default);
    Task DeleteAsync(Guid id, CancellationToken ct = default);
    Task ActivateAsync(Guid id, CancellationToken ct = default);
    Task DeactivateAsync(Guid id, CancellationToken ct = default);
}
