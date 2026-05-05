using SunshineApi.Application.Users.DTOs;

namespace SunshineApi.Application.Users.Interfaces;

public interface IUserService
{
    Task<UserDto> CreateAsync(CreateUserDto dto, CancellationToken ct = default);
    Task<UserDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<IEnumerable<UserDto>> GetAllAsync(CancellationToken ct = default);
    Task<UserDto> UpdateAsync(Guid id, UpdateUserDto dto, CancellationToken ct = default);
    Task DeleteAsync(Guid id, CancellationToken ct = default);
}
