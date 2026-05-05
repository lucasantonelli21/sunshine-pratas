using SunshineApi.Domain.Enums;
using SunshineApi.Domain.Exceptions;

namespace SunshineApi.Domain.Entities;

public class Product
{
    public Guid Id { get; private set; }
    public string Name { get; private set; } = string.Empty;
    public string Description { get; private set; } = string.Empty;
    public decimal Price { get; private set; }
    public ProductType Type { get; private set; }
    public ProductGender Gender { get; private set; }
    public ProductMaterial Material { get; private set; }
    public int Stock { get; private set; }
    public bool IsActive { get; private set; }
    public DateTime CreatedAt { get; private set; }

    private List<ProductImage> _images = [];
    public IReadOnlyCollection<ProductImage> Images => _images.AsReadOnly();

    private Product() { }

    public static Product Create(
        string name,
        string description,
        decimal price,
        ProductType type,
        ProductGender gender,
        ProductMaterial material,
        int stock,
        IEnumerable<string> imageUrls)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(name);
        ArgumentException.ThrowIfNullOrWhiteSpace(description);

        if (price <= 0)
            throw new DomainException("O preço deve ser maior que zero.");

        if (stock < 0)
            throw new DomainException("O estoque não pode ser negativo.");

        var product = new Product
        {
            Id = Guid.NewGuid(),
            Name = name.Trim(),
            Description = description.Trim(),
            Price = price,
            Type = type,
            Gender = gender,
            Material = material,
            Stock = stock,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        var urls = imageUrls.ToList();
        for (var i = 0; i < urls.Count; i++)
            product._images.Add(new ProductImage(urls[i], i + 1));

        return product;
    }

    public void Update(
        string name,
        string description,
        decimal price,
        ProductType type,
        ProductGender gender,
        ProductMaterial material,
        int stock,
        IEnumerable<string> imageUrls)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(name);
        ArgumentException.ThrowIfNullOrWhiteSpace(description);

        if (price <= 0)
            throw new DomainException("O preço deve ser maior que zero.");

        if (stock < 0)
            throw new DomainException("O estoque não pode ser negativo.");

        Name = name.Trim();
        Description = description.Trim();
        Price = price;
        Type = type;
        Gender = gender;
        Material = material;
        Stock = stock;

        _images.Clear();
        var urls = imageUrls.ToList();
        for (var i = 0; i < urls.Count; i++)
            _images.Add(new ProductImage(urls[i], i + 1));
    }

    public void Activate() => IsActive = true;
    public void Deactivate() => IsActive = false;
    public void AddStock(int quantity) => Stock += quantity;
    public void RemoveStock(int quantity)
    {
        if (quantity > Stock)
            throw new DomainException("Estoque insuficiente.");
        Stock -= quantity;
    }
}
