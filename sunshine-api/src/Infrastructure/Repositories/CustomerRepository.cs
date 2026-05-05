using Microsoft.EntityFrameworkCore;
using SunshineApi.Domain.Entities;
using SunshineApi.Domain.Repositories;
using SunshineApi.Infrastructure.Persistence;

namespace SunshineApi.Infrastructure.Repositories;

public class CustomerRepository : ICustomerRepository
{
    private readonly AppDbContext _context;

    public CustomerRepository(AppDbContext context) => _context = context;

    public async Task<Customer?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        await _context.Customers.FindAsync([id], ct);

    public async Task<IEnumerable<Customer>> GetAllAsync(CancellationToken ct = default) =>
        await _context.Customers.ToListAsync(ct);

    public async Task AddAsync(Customer customer, CancellationToken ct = default) =>
        await _context.Customers.AddAsync(customer, ct);

    public Task UpdateAsync(Customer customer, CancellationToken ct = default)
    {
        _context.Customers.Update(customer);
        return Task.CompletedTask;
    }

    public async Task DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var customer = await _context.Customers.FindAsync([id], ct);
        if (customer is not null)
            _context.Customers.Remove(customer);
    }

    public async Task<bool> ExistsByCpfAsync(string cpf, CancellationToken ct = default) =>
        await _context.Customers.AnyAsync(c => c.Cpf == cpf, ct);

    public async Task<bool> ExistsByEmailAsync(string email, CancellationToken ct = default) =>
        await _context.Customers.AnyAsync(c => c.Email == email.ToLowerInvariant(), ct);
}
