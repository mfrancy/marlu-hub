using AutoMapper;
using MarluHub.Api.DTOs.Products;
using MarluHub.Api.Entities;

namespace MarluHub.Api.Mapping;

public class ProductProfile : Profile
{
    public ProductProfile()
    {
        CreateMap<CreateProductDto, Product>();
        CreateMap<Product, CreateProductDto>();
        CreateMap<Product, ResponseProductDto>();

    }
}
