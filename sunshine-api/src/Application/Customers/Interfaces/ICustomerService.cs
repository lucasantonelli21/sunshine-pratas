using SunshineApi.Application.Customers.DTOs;

namespace SunshineApi.Application.Customers.Interfaces;

public interface ICustomerService
{
    Task<CustomerDto> CreateAsync(CreateCustomerDto dto, CancellationToken ct = default);
    Task<CustomerDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<IEnumerable<CustomerDto>> GetAllAsync(CancellationToken ct = default);
    Task<CustomerDto> UpdateAsync(Guid id, UpdateCustomerDto dto, CancellationToken ct = default);
    Task DeleteAsync(Guid id, CancellationToken ct = default);
}
