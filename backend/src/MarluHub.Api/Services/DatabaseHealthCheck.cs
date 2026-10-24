using MarluHub.Api.Data;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace MarluHub.Api.Services;

public sealed class DatabaseHealthCheck : IHealthCheck
{
    private readonly MarluHubContext _context;

    public DatabaseHealthCheck(MarluHubContext context)
    {
        _context = context;
    }

    public async Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context,
        CancellationToken cancellationToken = default)
    {
        try
        {
            var canConnect = await _context.Database.CanConnectAsync(cancellationToken);
            return canConnect
                ? HealthCheckResult.Healthy()
                : HealthCheckResult.Unhealthy("The database is not reachable.");
        }
        catch (Exception exception)
        {
            return HealthCheckResult.Unhealthy("The database health check failed.", exception);
        }
    }
}
