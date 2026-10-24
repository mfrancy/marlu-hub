using AutoMapper;
using MarluHub.Api.DTOs.Products;
using MarluHub.Api.Entities;
using MarluHub.Api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MarluHub.Api.Services;

public sealed class ProductService : IProductService
{
    private readonly IProductRepository _repository;
    private readonly IMapper _mapper;

    public ProductService(IProductRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<IReadOnlyList<ResponseProductDto>> GetAllAsync(
        int page,
        int pageSize,
        CancellationToken cancellationToken = default)
    {
        if (page < 1 || pageSize is < 1 or > 100)
        {
            throw new ArgumentOutOfRangeException(nameof(pageSize), "Page must be positive and page size must be between 1 and 100.");
        }

        var products = await _repository.Query()
            .AsNoTracking()
            .OrderBy(product => product.Name)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);
        return _mapper.Map<List<ResponseProductDto>>(products);
    }

    public async Task<ResponseProductDto?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        var product = await _repository.GetByIdAsync(id, cancellationToken);

        if (product is null)
        {
            return null;
        }

        return _mapper.Map<ResponseProductDto>(product);
    }

    public async Task<ResponseProductDto> CreateAsync(
        CreateProductDto dto,
        CancellationToken cancellationToken = default)
    {
        var product = _mapper.Map<Product>(dto);

        product.CreatedAt = DateTime.UtcNow;
        product.UpdatedAt = DateTime.UtcNow;

        await _repository.AddAsync(product, cancellationToken);
        await _repository.SaveChangesAsync(cancellationToken);

        return _mapper.Map<ResponseProductDto>(product);

    }

    public async Task<ResponseProductDto?> UpdateAsync(
        Guid id,
        UpdateProductDto dto,
        CancellationToken cancellationToken = default)
    {
        var product = await _repository.GetByIdAsync(id, cancellationToken);

        if (product is null)
        {
            return null;
        }


        _mapper.Map(dto, product);

        product.UpdatedAt = DateTime.UtcNow;
        await _repository.SaveChangesAsync(cancellationToken);

        return _mapper.Map<ResponseProductDto>(product);
    }


    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var product = await _repository.GetByIdAsync(id, cancellationToken);

        if (product is null)
        {
            return false;
        }

        _repository.Remove(product);
        await _repository.SaveChangesAsync(cancellationToken);
        return true;

    }


}
