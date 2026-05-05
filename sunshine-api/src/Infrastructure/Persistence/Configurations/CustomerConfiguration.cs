using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SunshineApi.Domain.Entities;
using SunshineApi.Domain.ValueObjects;

namespace SunshineApi.Infrastructure.Persistence.Configurations;

public class CustomerConfiguration : IEntityTypeConfiguration<Customer>
{
    public void Configure(EntityTypeBuilder<Customer> builder)
    {
        builder.HasKey(c => c.Id);

        builder.Property(c => c.Name)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(c => c.Email)
            .HasConversion(
                e => e.Value,
                v => new Email(v))
            .HasColumnName("Email")
            .HasMaxLength(255)
            .IsRequired();

        builder.HasIndex(c => c.Email).IsUnique();

        builder.Property(c => c.Phone)
            .HasMaxLength(20)
            .IsRequired();

        builder.Property(c => c.Cpf)
            .HasConversion(
                c => c.Value,
                v => new Cpf(v))
            .HasColumnName("Cpf")
            .HasMaxLength(11)
            .IsRequired();

        builder.HasIndex(c => c.Cpf).IsUnique();

        builder.Property(c => c.CreatedAt).IsRequired();
    }
}
