using SunshineApi.Application.Auth.Interfaces;
using SunshineApi.Application.Users.DTOs;
using SunshineApi.Application.Users.Interfaces;
using SunshineApi.Domain.Exceptions;
using SunshineApi.Domain.Repositories;

namespace SunshineApi.Application.Auth.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _repository;
    private readonly IPasswordHasher _hasher;
    private readonly ITokenService _tokenService;

    public AuthService(IUserRepository repository, IPasswordHasher hasher, ITokenService tokenService)
    {
        _repository = repository;
        _hasher = hasher;
        _tokenService = tokenService;
    }

    public async Task<AuthResponseDto> LoginAsync(LoginDto dto, CancellationToken ct = default)
    {
        var user = await _repository.GetByEmailAsync(dto.Email, ct)
            ?? throw new DomainException("Credenciais inválidas.");

        if (!_hasher.Verify(dto.Password, user.PasswordHash))
            throw new DomainException("Credenciais inválidas.");

        var token = _tokenService.GenerateToken(user);
        return new AuthResponseDto(token, new UserDto(user.Id, user.Name, user.Email.Value, user.Role.ToString(), user.CreatedAt));
    }
}
