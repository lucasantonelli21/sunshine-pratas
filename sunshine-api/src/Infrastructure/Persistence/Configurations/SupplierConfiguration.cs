using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SunshineApi.Domain.Entities;

namespace SunshineApi.Infrastructure.Persistence.Configurations;

public class SupplierConfiguration : IEntityTypeConfiguration<Supplier>
{
    public void Configure(EntityTypeBuilder<Supplier> builder)
    {
        builder.HasKey(s => s.Id);

        builder.Property(s => s.Name).HasMaxLength(150).IsRequired();
        builder.Property(s => s.TradeName).HasMaxLength(150);
        builder.Property(s => s.Email).HasMaxLength(255);
        builder.Property(s => s.Phone).HasMaxLength(20);
        builder.Property(s => s.Document).HasMaxLength(18).IsRequired();
        builder.Property(s => s.DocumentType).HasMaxLength(4).IsRequired();
        builder.Property(s => s.ContactName).HasMaxLength(100);
        builder.Property(s => s.ContactEmail).HasMaxLength(255);
        builder.Property(s => s.ContactPhone).HasMaxLength(20);
        builder.Property(s => s.AddressStreet).HasMaxLength(150);
        builder.Property(s => s.AddressNumber).HasMaxLength(10);
        builder.Property(s => s.AddressComplement).HasMaxLength(100);
        builder.Property(s => s.AddressNeighborhood).HasMaxLength(100);
        builder.Property(s => s.AddressCity).HasMaxLength(100);
        builder.Property(s => s.AddressState).HasMaxLength(2);
        builder.Property(s => s.AddressZipCode).HasMaxLength(9);
        builder.Property(s => s.AddressCountry).HasMaxLength(50);
        builder.Property(s => s.PaymentTerms).HasMaxLength(200);
        builder.Property(s => s.Notes).HasMaxLength(500);
        builder.Property(s => s.IsActive).IsRequired();
        builder.Property(s => s.CreatedAt).IsRequired();

        builder.HasIndex(s => s.Document).IsUnique();
    }
}
