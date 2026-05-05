using Microsoft.Extensions.DependencyInjection;
using SunshineApi.Application.Auth.Interfaces;
using SunshineApi.Application.Auth.Services;
using SunshineApi.Application.Customers.Interfaces;
using SunshineApi.Application.Customers.Services;
using SunshineApi.Application.Products.Interfaces;
using SunshineApi.Application.Products.Services;
using SunshineApi.Application.Users.Interfaces;
using SunshineApi.Application.Users.Services;

namespace SunshineApi.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<ICustomerService, CustomerService>();
        services.AddScoped<IProductService, ProductService>();
        return services;
    }
}
