using AutoMapper;
using MarluHub.Api.Data;
using MarluHub.Api.DTOs.Products;
using MarluHub.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace MarluHub.Api.Services;

public class ProductService
{
    private readonly MarluHubContext _context;
    private readonly IMapper _mapper;

    public ProductService(MarluHubContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<ResponseProductDto>> GetAllAsync(int page, int pageSize)
    {
        var products = await _context.Products.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
        return _mapper.Map<List<ResponseProductDto>>(products);
    }

    public async Task<ResponseProductDto?> GetByIdAsync(Guid id)
    {
        var product = await _context.Products.FindAsync(id);

        if (product is null)
        {
            return null;
        }

        return _mapper.Map<ResponseProductDto>(product);
    }

    public async Task<ResponseProductDto> CreateAsync(CreateProductDto dto)
    {
        var product = _mapper.Map<Product>(dto);

        product.CreatedAt = DateTime.UtcNow;
        product.UpdatedAt = DateTime.UtcNow;

        _context.Add(product);
        await _context.SaveChangesAsync();

        return _mapper.Map<ResponseProductDto>(product);

    }

    public async Task<ResponseProductDto?> UpdateAsync(Guid id, CreateProductDto dto)
    {
        var product = await _context.Products.FindAsync(id);

        if (product is null)
        {
            return null;
        }


        _mapper.Map(dto, product);

        product.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        return _mapper.Map<ResponseProductDto>(product);
    }


    public async Task<bool> DeleteAsync(Guid id)
    {
        var product = await _context.Products.FindAsync(id);

        if (product is null)
        {
            return false;
        }

        _context.Remove(product);
        await _context.SaveChangesAsync();
        return true;

    }


}
