using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using GeoLib.Business.Entities;
using GeoLib.Core;

namespace GeoLib.Data
{
    public class GeoLibDbContext : DbContext
    {
        public GeoLibDbContext()
            : base("name=main")
        {
            Database.SetInitializer<GeoLibDbContext>(null);
        }

        public DbSet<ZipCode> ZipCodeSet { get; set; }
        public DbSet<State> StateSet { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Ignore<IIdentifiableEntity>();

            modelBuilder.Entity<ZipCode>().HasKey<int>(e => e.ZipCodeId).Ignore(e => e.EntityId)
                .HasRequired(e => e.State).WithMany().HasForeignKey(e => e.StateId);

            modelBuilder.Entity<State>().HasKey<int>(e => e.StateId).Ignore(e => e.EntityId);
        }
    }
}
