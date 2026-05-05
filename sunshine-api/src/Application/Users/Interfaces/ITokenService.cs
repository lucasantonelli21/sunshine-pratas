using SunshineApi.Domain.Entities;

namespace SunshineApi.Application.Users.Interfaces;

public interface ITokenService
{
    string GenerateToken(User user);
}
