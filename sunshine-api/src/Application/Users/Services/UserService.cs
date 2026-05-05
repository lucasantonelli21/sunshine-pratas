using SunshineApi.Application.Users.DTOs;
using SunshineApi.Application.Users.Interfaces;
using SunshineApi.Domain.Entities;
using SunshineApi.Domain.Exceptions;
using SunshineApi.Domain.Interfaces;
using SunshineApi.Domain.Repositories;
using SunshineApi.Domain.ValueObjects;

namespace SunshineApi.Application.Users.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _repository;
    private readonly IPasswordHasher _hasher;
    private readonly IUnitOfWork _unitOfWork;

    public UserService(IUserRepository repository, IPasswordHasher hasher, IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _hasher = hasher;
        _unitOfWork = unitOfWork;
    }

    public async Task<UserDto> CreateAsync(CreateUserDto dto, CancellationToken ct = default)
    {
        if (await _repository.ExistsByEmailAsync(dto.Email, ct))
            throw new ConflictException("E-mail já cadastrado.");

        var user = User.Create(dto.Name, new Email(dto.Email), _hasher.Hash(dto.Password));

        await _repository.AddAsync(user, ct);
        await _unitOfWork.CommitAsync(ct);
        return ToDto(user);
    }

    public async Task<UserDto?> GetByIdAsync(Guid id, CancellationToken ct = default)
    {
        var user = await _repository.GetByIdAsync(id, ct);
        return user is null ? null : ToDto(user);
    }

    public async Task<IEnumerable<UserDto>> GetAllAsync(CancellationToken ct = default) =>
        (await _repository.GetAllAsync(ct)).Select(ToDto);

    public async Task<UserDto> UpdateAsync(Guid id, UpdateUserDto dto, CancellationToken ct = default)
    {
        var user = await _repository.GetByIdAsync(id, ct)
            ?? throw new NotFoundException("Usuário não encontrado.");

        user.UpdateName(dto.Name);
        user.UpdateEmail(new Email(dto.Email));

        await _repository.UpdateAsync(user, ct);
        await _unitOfWork.CommitAsync(ct);
        return ToDto(user);
    }

    public async Task DeleteAsync(Guid id, CancellationToken ct = default)
    {
        if (await _repository.GetByIdAsync(id, ct) is null)
            throw new NotFoundException("Usuário não encontrado.");

        await _repository.DeleteAsync(id, ct);
        await _unitOfWork.CommitAsync(ct);
    }

    private static UserDto ToDto(User user) =>
        new(user.Id, user.Name, user.Email.Value, user.Role.ToString(), user.CreatedAt);
}
