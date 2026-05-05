using SunshineApi.Domain.Enums;
using SunshineApi.Domain.ValueObjects;

namespace SunshineApi.Domain.Entities;

public class User
{
    public Guid Id { get; private set; }
    public string Name { get; private set; } = string.Empty;
    public Email Email { get; private set; } = null!;
    public string PasswordHash { get; private set; } = string.Empty;
    public UserRole Role { get; private set; }
    public DateTime CreatedAt { get; private set; }

    private User() { }

    public static User Create(string name, Email email, string passwordHash, UserRole role = UserRole.User)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(name);

        return new User
        {
            Id = Guid.NewGuid(),
            Name = name.Trim(),
            Email = email,
            PasswordHash = passwordHash,
            Role = role,
            CreatedAt = DateTime.UtcNow
        };
    }

    public void UpdateName(string name)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(name);
        Name = name.Trim();
    }

    public void UpdateEmail(Email email) => Email = email;

    public void UpdatePasswordHash(string passwordHash) => PasswordHash = passwordHash;
}
