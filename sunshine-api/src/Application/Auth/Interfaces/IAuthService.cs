using SunshineApi.Application.Users.DTOs;

namespace SunshineApi.Application.Auth.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto> LoginAsync(LoginDto dto, CancellationToken ct = default);
}
