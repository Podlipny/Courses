using Microsoft.EntityFrameworkCore;
using SamuraiApp.Domain;

namespace SamuraiApp.Data
{
  public class SamuraiContext : DbContext
  {
    public SamuraiContext(DbContextOptions<SamuraiContext> options)
      : base(options)
    {
    }

    public DbSet<SamuraiApp.Domain.Samurai> Samurais { get; set; }
    public DbSet<SamuraiApp.Domain.Quote> Quotes { get; set; }
    public DbSet<SamuraiApp.Domain.Battle> Battles { get; set; }

    //mapujeme non-conventional naming
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      //rikame ze ma FK key
      modelBuilder.Entity<SamuraiBattle>()
        .HasKey(s => new {s.BattleId, s.SamuraiId});
      base.OnModelCreating(modelBuilder);
    }

    //DBContext normane pridavame v Startup.cs
    //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    //{
    //    optionsBuilder.UseSqlServer(
    //         "Server = (localdb)\\mssqllocaldb; Database = SamuraiAppData; Trusted_Connection = True; ");
    //}
  }
}
