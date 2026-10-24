using MarluHub.Api.DTOs.Products;

namespace MarluHub.Api.Interfaces;

public interface IProductService
{
    Task<IReadOnlyList<ResponseProductDto>> GetAllAsync(
        int page,
        int pageSize,
        CancellationToken cancellationToken = default);
    Task<ResponseProductDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<ResponseProductDto> CreateAsync(CreateProductDto dto, CancellationToken cancellationToken = default);
    Task<ResponseProductDto?> UpdateAsync(
        Guid id,
        UpdateProductDto dto,
        CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
}
