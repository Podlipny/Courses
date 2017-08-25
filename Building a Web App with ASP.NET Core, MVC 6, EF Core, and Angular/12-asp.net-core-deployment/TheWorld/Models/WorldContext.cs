using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace TheWorld.Models
{
  public class WorldContext : IdentityDbContext<WorldUser>
  {
    private IConfigurationRoot _config;

    public WorldContext(IConfigurationRoot config, DbContextOptions options) 
      : base(options)
    {
      _config = config;
    }

    public DbSet<Trip> Trips { get; set; }
    public DbSet<Stop> Stops { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      base.OnConfiguring(optionsBuilder);

      optionsBuilder.UseSqlServer(_config["ConnectionStrings:WorldContextConnection"]);
    }
  }
}
