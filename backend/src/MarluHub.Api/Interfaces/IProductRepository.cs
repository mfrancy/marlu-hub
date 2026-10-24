using MarluHub.Api.Entities;

namespace MarluHub.Api.Interfaces;

public interface IProductRepository
{
    IQueryable<Product> Query();
    Task<Product?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task AddAsync(Product product, CancellationToken cancellationToken = default);
    void Remove(Product product);
    Task SaveChangesAsync(CancellationToken cancellationToken = default);
}
