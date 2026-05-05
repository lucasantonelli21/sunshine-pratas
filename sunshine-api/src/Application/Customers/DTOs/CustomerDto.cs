namespace SunshineApi.Application.Customers.DTOs;

public record CustomerDto(Guid Id, string Name, string Email, string Phone, string Cpf, DateTime CreatedAt);
