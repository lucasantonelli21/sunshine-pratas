using SunshineApi.Application.Customers.DTOs;
using SunshineApi.Application.Customers.Interfaces;
using SunshineApi.Domain.Entities;
using SunshineApi.Domain.Exceptions;
using SunshineApi.Domain.Interfaces;
using SunshineApi.Domain.Repositories;
using SunshineApi.Domain.ValueObjects;

namespace SunshineApi.Application.Customers.Services;

public class CustomerService : ICustomerService
{
    private readonly ICustomerRepository _repository;
    private readonly IUnitOfWork _unitOfWork;

    public CustomerService(ICustomerRepository repository, IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task<CustomerDto> CreateAsync(CreateCustomerDto dto, CancellationToken ct = default)
    {
        if (await _repository.ExistsByCpfAsync(dto.Cpf, ct))
            throw new ConflictException("CPF já cadastrado.");

        if (await _repository.ExistsByEmailAsync(dto.Email, ct))
            throw new ConflictException("E-mail já cadastrado.");

        var customer = Customer.Create(dto.Name, new Email(dto.Email), dto.Phone, new Cpf(dto.Cpf));

        await _repository.AddAsync(customer, ct);
        await _unitOfWork.CommitAsync(ct);
        return ToDto(customer);
    }

    public async Task<CustomerDto?> GetByIdAsync(Guid id, CancellationToken ct = default)
    {
        var customer = await _repository.GetByIdAsync(id, ct);
        return customer is null ? null : ToDto(customer);
    }

    public async Task<IEnumerable<CustomerDto>> GetAllAsync(CancellationToken ct = default) =>
        (await _repository.GetAllAsync(ct)).Select(ToDto);

    public async Task<CustomerDto> UpdateAsync(Guid id, UpdateCustomerDto dto, CancellationToken ct = default)
    {
        var customer = await _repository.GetByIdAsync(id, ct)
            ?? throw new NotFoundException("Cliente não encontrado.");

        customer.UpdateName(dto.Name);
        customer.UpdateEmail(new Email(dto.Email));
        customer.UpdatePhone(dto.Phone);

        await _repository.UpdateAsync(customer, ct);
        await _unitOfWork.CommitAsync(ct);
        return ToDto(customer);
    }

    public async Task DeleteAsync(Guid id, CancellationToken ct = default)
    {
        if (await _repository.GetByIdAsync(id, ct) is null)
            throw new NotFoundException("Cliente não encontrado.");

        await _repository.DeleteAsync(id, ct);
        await _unitOfWork.CommitAsync(ct);
    }

    private static CustomerDto ToDto(Customer c) =>
        new(c.Id, c.Name, c.Email.Value, c.Phone, c.Cpf.Formatted, c.CreatedAt);
}
