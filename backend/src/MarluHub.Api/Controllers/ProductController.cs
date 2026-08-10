using MarluHub.Api.DTOs.Products;
using MarluHub.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace MarluHub.Api.Controllers;

[ApiController]
[Route("api/products")]
public class ProductController : ControllerBase
{
    private readonly ProductService _productService;

    public ProductController(ProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllProducts(int page = 1, int pageSize = 10)
    {
        var products = await _productService.GetAllAsync(page, pageSize);
        return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProductById(Guid id)
    {
        var product = await _productService.GetByIdAsync(id);

        if (product is null)
        {
            return NotFound(id);
        }

        return Ok(product);

    }

    [HttpPost]
    public async Task<IActionResult> CreateProduct([FromBody] CreateProductDto dto)
    {
        var product = await _productService.CreateAsync(dto);

        return Ok(product);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProduct(Guid id, [FromBody] CreateProductDto dto)
    {
        var product = await _productService.UpdateAsync(id, dto);

        if (product is null)
        {
            return NotFound();
        }

        return Ok(product);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(Guid id)
    {
        var product = await _productService.DeleteAsync(id);

        if (!product)
        {
            return NotFound();
        }

        return NoContent();


    }


}

    
