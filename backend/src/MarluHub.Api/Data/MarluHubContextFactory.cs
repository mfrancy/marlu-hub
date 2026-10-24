using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace MarluHub.Api.Data;

public sealed class MarluHubContextFactory : IDesignTimeDbContextFactory<MarluHubContext>
{
    public MarluHubContext CreateDbContext(string[] args)
    {
        var connectionString = Environment.GetEnvironmentVariable(
            "ConnectionStrings__DefaultConnection");

        if (string.IsNullOrWhiteSpace(connectionString))
        {
            throw new InvalidOperationException(
                "Set ConnectionStrings__DefaultConnection before running EF Core commands.");
        }

        var optionsBuilder = new DbContextOptionsBuilder<MarluHubContext>();
        optionsBuilder.UseNpgsql(connectionString);

        return new MarluHubContext(optionsBuilder.Options);
    }
}
