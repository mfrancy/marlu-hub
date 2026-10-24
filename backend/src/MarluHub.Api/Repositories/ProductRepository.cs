using MarluHub.Api.Data;
using MarluHub.Api.Entities;
using MarluHub.Api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MarluHub.Api.Repositories;

public sealed class ProductRepository : IProductRepository
{
    private readonly MarluHubContext _context;

    public ProductRepository(MarluHubContext context)
    {
        _context = context;
    }

    public IQueryable<Product> Query() => _context.Products;

    public Task<Product?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default) =>
        _context.Products.FirstOrDefaultAsync(product => product.Id == id, cancellationToken);

    public Task AddAsync(Product product, CancellationToken cancellationToken = default) =>
        _context.Products.AddAsync(product, cancellationToken).AsTask();

    public void Remove(Product product) => _context.Products.Remove(product);

    public Task SaveChangesAsync(CancellationToken cancellationToken = default) =>
        _context.SaveChangesAsync(cancellationToken);
}
