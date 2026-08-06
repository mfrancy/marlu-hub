using Microsoft.EntityFrameworkCore;

namespace MarluHub.Api.Data;

public class MarluHubContext : DbContext
{

    public MarluHubContext(DbContextOptions<MarluHubContext> options) : base(options) 
    {
        
    }

   

}
