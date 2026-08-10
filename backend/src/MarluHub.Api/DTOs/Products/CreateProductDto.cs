using System.ComponentModel.DataAnnotations;

namespace MarluHub.Api.DTOs.Products;

public class CreateProductDto
{
    [Required]
    [StringLength(50)]
    public string Code { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [StringLength(500)]
    public string Description { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    public string Brand { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    public string Category { get; set; } = string.Empty;

    [Required]
    public string ImageUrl { get; set; } = string.Empty;
}