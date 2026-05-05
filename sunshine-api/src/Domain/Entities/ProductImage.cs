namespace SunshineApi.Domain.Entities;

public class ProductImage
{
    public Guid Id { get; private set; }
    public string Url { get; private set; } = string.Empty;
    public int Order { get; private set; }

    private ProductImage() { }

    public ProductImage(string url, int order)
    {
        Id = Guid.NewGuid();
        Url = url;
        Order = order;
    }
}
