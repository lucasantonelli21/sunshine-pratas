using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SunshineApi.Application.Users.DTOs;
using SunshineApi.Application.Users.Interfaces;

namespace SunshineApi.Controllers;

[Authorize]
[ApiController]
[Route("api/profile")]
public class ProfileController : ControllerBase
{
    private readonly IUserService _service;

    public ProfileController(IUserService service) => _service = service;

    [HttpGet]
    public async Task<IActionResult> Get(CancellationToken ct)
    {
        var userId = GetUserId();
        if (userId is null) return Unauthorized();

        var user = await _service.GetByIdAsync(userId.Value, ct);
        return user is null ? NotFound() : Ok(user);
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] UpdateUserDto dto, CancellationToken ct)
    {
        var userId = GetUserId();
        if (userId is null) return Unauthorized();

        return Ok(await _service.UpdateAsync(userId.Value, dto, ct));
    }

    private Guid? GetUserId()
    {
        var sub = User.FindFirstValue(ClaimTypes.NameIdentifier)
                  ?? User.FindFirstValue("sub");

        return Guid.TryParse(sub, out var id) ? id : null;
    }
}
