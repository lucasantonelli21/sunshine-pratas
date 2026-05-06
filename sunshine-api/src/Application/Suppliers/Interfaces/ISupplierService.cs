using SunshineApi.Application.Suppliers.DTOs;

namespace SunshineApi.Application.Suppliers.Interfaces;

public interface ISupplierService
{
    Task<SupplierDto> CreateAsync(CreateSupplierDto dto, CancellationToken ct = default);
    Task<SupplierDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<IEnumerable<SupplierDto>> GetAllAsync(CancellationToken ct = default);
    Task<SupplierDto> UpdateAsync(Guid id, UpdateSupplierDto dto, CancellationToken ct = default);
    Task DeleteAsync(Guid id, CancellationToken ct = default);
}
