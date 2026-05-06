using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SunshineApi.Application.Suppliers.DTOs;
using SunshineApi.Application.Suppliers.Interfaces;

namespace SunshineApi.Controllers;

[Authorize]
[ApiController]
[Route("api/suppliers")]
public class SuppliersController : ControllerBase
{
    private readonly ISupplierService _service;

    public SuppliersController(ISupplierService service) => _service = service;

    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken ct) =>
        Ok(await _service.GetAllAsync(ct));

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id, CancellationToken ct)
    {
        var s = await _service.GetByIdAsync(id, ct);
        return s is null ? NotFound() : Ok(s);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateSupplierDto dto, CancellationToken ct)
    {
        var s = await _service.CreateAsync(dto, ct);
        return CreatedAtAction(nameof(GetById), new { id = s.Id }, s);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateSupplierDto dto, CancellationToken ct) =>
        Ok(await _service.UpdateAsync(id, dto, ct));

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken ct)
    {
        await _service.DeleteAsync(id, ct);
        return NoContent();
    }
}
