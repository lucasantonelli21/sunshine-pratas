using Microsoft.AspNetCore.Mvc;
using SunshineApi.Application.Auth.Interfaces;
using SunshineApi.Application.Users.DTOs;

namespace SunshineApi.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService) => _authService = authService;

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto, CancellationToken ct) =>
        Ok(await _authService.LoginAsync(dto, ct));
}
