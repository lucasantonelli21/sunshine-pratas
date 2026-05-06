using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SunshineApi.Domain.Entities;
using SunshineApi.Domain.Enums;

namespace SunshineApi.Infrastructure.Persistence.Configurations;

public class TransactionConfiguration : IEntityTypeConfiguration<Transaction>
{
    public void Configure(EntityTypeBuilder<Transaction> builder)
    {
        builder.HasKey(t => t.Id);

        builder.Property(t => t.Description).HasMaxLength(200).IsRequired();
        builder.Property(t => t.Amount).HasColumnType("decimal(18,2)").IsRequired();
        builder.Property(t => t.Date).IsRequired();
        builder.Property(t => t.Type).HasConversion<string>().HasMaxLength(20).IsRequired();
        builder.Property(t => t.Status).HasConversion<string>().HasMaxLength(20).IsRequired();
        builder.Property(t => t.PaymentMethod).HasConversion<string>().HasMaxLength(30);
        builder.Property(t => t.Category).HasMaxLength(100);
        builder.Property(t => t.Notes).HasMaxLength(500);
        builder.Property(t => t.UserId).IsRequired();
        builder.Property(t => t.CreatedAt).IsRequired();
    }
}
