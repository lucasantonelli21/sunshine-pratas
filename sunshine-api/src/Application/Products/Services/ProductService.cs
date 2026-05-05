using SunshineApi.Application.Products.DTOs;
using SunshineApi.Application.Products.Interfaces;
using SunshineApi.Domain.Entities;
using SunshineApi.Domain.Exceptions;
using SunshineApi.Domain.Interfaces;
using SunshineApi.Domain.Repositories;

namespace SunshineApi.Application.Products.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _repository;
    private readonly IUnitOfWork _unitOfWork;

    public ProductService(IProductRepository repository, IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task<ProductDto> CreateAsync(CreateProductDto dto, CancellationToken ct = default)
    {
        var product = Product.Create(
            dto.Name,
            dto.Description,
            dto.Price,
            dto.Type,
            dto.Gender,
            dto.Material,
            dto.Stock,
            dto.ImageUrls);

        await _repository.AddAsync(product, ct);
        await _unitOfWork.CommitAsync(ct);
        return ToDto(product);
    }

    public async Task<ProductDto?> GetByIdAsync(Guid id, CancellationToken ct = default)
    {
        var product = await _repository.GetByIdAsync(id, ct);
        return product is null ? null : ToDto(product);
    }

    public async Task<IEnumerable<ProductDto>> GetAllAsync(bool onlyActive = true, CancellationToken ct = default) =>
        (await _repository.GetAllAsync(onlyActive, ct)).Select(ToDto);

    public async Task<ProductDto> UpdateAsync(Guid id, UpdateProductDto dto, CancellationToken ct = default)
    {
        var product = await _repository.GetByIdAsync(id, ct)
            ?? throw new NotFoundException("Produto não encontrado.");

        product.Update(
            dto.Name,
            dto.Description,
            dto.Price,
            dto.Type,
            dto.Gender,
            dto.Material,
            dto.Stock,
            dto.ImageUrls);

        await _repository.UpdateAsync(product, ct);
        await _unitOfWork.CommitAsync(ct);
        return ToDto(product);
    }

    public async Task DeleteAsync(Guid id, CancellationToken ct = default)
    {
        if (await _repository.GetByIdAsync(id, ct) is null)
            throw new NotFoundException("Produto não encontrado.");

        await _repository.DeleteAsync(id, ct);
        await _unitOfWork.CommitAsync(ct);
    }

    public async Task ActivateAsync(Guid id, CancellationToken ct = default)
    {
        var product = await _repository.GetByIdAsync(id, ct)
            ?? throw new NotFoundException("Produto não encontrado.");

        product.Activate();
        await _repository.UpdateAsync(product, ct);
        await _unitOfWork.CommitAsync(ct);
    }

    public async Task DeactivateAsync(Guid id, CancellationToken ct = default)
    {
        var product = await _repository.GetByIdAsync(id, ct)
            ?? throw new NotFoundException("Produto não encontrado.");

        product.Deactivate();
        await _repository.UpdateAsync(product, ct);
        await _unitOfWork.CommitAsync(ct);
    }

    private static ProductDto ToDto(Product p) => new(
        p.Id,
        p.Name,
        p.Description,
        p.Price,
        p.Type.ToString(),
        p.Gender.ToString(),
        p.Material.ToString(),
        p.Stock,
        p.IsActive,
        p.Images.OrderBy(i => i.Order).Select(i => i.Url),
        p.CreatedAt);
}
