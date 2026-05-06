using SunshineApi.Application.Suppliers.DTOs;
using SunshineApi.Application.Suppliers.Interfaces;
using SunshineApi.Domain.Entities;
using SunshineApi.Domain.Exceptions;
using SunshineApi.Domain.Interfaces;
using SunshineApi.Domain.Repositories;

namespace SunshineApi.Application.Suppliers.Services;

public class SupplierService : ISupplierService
{
    private readonly ISupplierRepository _repository;
    private readonly IUnitOfWork _unitOfWork;

    public SupplierService(ISupplierRepository repository, IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task<SupplierDto> CreateAsync(CreateSupplierDto dto, CancellationToken ct = default)
    {
        if (await _repository.ExistsByDocumentAsync(dto.Document, ct))
            throw new ConflictException("Documento já cadastrado.");

        var supplier = Supplier.Create(
            dto.Name, dto.Document, dto.DocumentType,
            dto.TradeName, dto.Email, dto.Phone,
            dto.ContactName, dto.ContactEmail, dto.ContactPhone,
            dto.Address?.Street, dto.Address?.Number, dto.Address?.Complement,
            dto.Address?.Neighborhood, dto.Address?.City, dto.Address?.State,
            dto.Address?.ZipCode, dto.Address?.Country,
            dto.PaymentTerms, dto.Notes);

        await _repository.AddAsync(supplier, ct);
        await _unitOfWork.CommitAsync(ct);
        return ToDto(supplier);
    }

    public async Task<SupplierDto?> GetByIdAsync(Guid id, CancellationToken ct = default)
    {
        var s = await _repository.GetByIdAsync(id, ct);
        return s is null ? null : ToDto(s);
    }

    public async Task<IEnumerable<SupplierDto>> GetAllAsync(CancellationToken ct = default) =>
        (await _repository.GetAllAsync(ct)).Select(ToDto);

    public async Task<SupplierDto> UpdateAsync(Guid id, UpdateSupplierDto dto, CancellationToken ct = default)
    {
        var s = await _repository.GetByIdAsync(id, ct)
            ?? throw new NotFoundException("Fornecedor não encontrado.");

        s.Update(
            dto.Name, dto.TradeName, dto.Email, dto.Phone,
            dto.ContactName, dto.ContactEmail, dto.ContactPhone,
            dto.Address?.Street, dto.Address?.Number, dto.Address?.Complement,
            dto.Address?.Neighborhood, dto.Address?.City, dto.Address?.State,
            dto.Address?.ZipCode, dto.Address?.Country,
            dto.PaymentTerms, dto.Notes);

        await _repository.UpdateAsync(s, ct);
        await _unitOfWork.CommitAsync(ct);
        return ToDto(s);
    }

    public async Task DeleteAsync(Guid id, CancellationToken ct = default)
    {
        if (await _repository.GetByIdAsync(id, ct) is null)
            throw new NotFoundException("Fornecedor não encontrado.");

        await _repository.DeleteAsync(id, ct);
        await _unitOfWork.CommitAsync(ct);
    }

    private static SupplierDto ToDto(Supplier s)
    {
        AddressDto? address = null;
        if (s.AddressStreet is not null || s.AddressCity is not null)
        {
            address = new AddressDto(s.AddressStreet, s.AddressNumber, s.AddressComplement,
                s.AddressNeighborhood, s.AddressCity, s.AddressState,
                s.AddressZipCode, s.AddressCountry);
        }

        return new SupplierDto(s.Id, s.Name, s.TradeName, s.Email, s.Phone,
            s.Document, s.DocumentType, s.ContactName, s.ContactEmail, s.ContactPhone,
            address, s.PaymentTerms, s.Notes, s.IsActive, s.CreatedAt);
    }
}
