using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using GeoLib.Business.Managers;
using Autofac;
using Autofac.Integration.Wcf;
using Autofac.Core;
using GeoLib.Data;

namespace GeoLib.ConsoleHost
{
    class Program
    {
        static void Main(string[] args)
        {
            IContainer container = null;
            ContainerBuilder builder = new ContainerBuilder();

            builder.RegisterAssemblyTypes(typeof(ZipCodeRepository).Assembly)
                .Where(t => t.Name.EndsWith("Repository"))
                .As(t => t.GetInterfaces().FirstOrDefault(
                    i => i.Name == "I" + t.Name)); 
            
            builder.RegisterType<GeoManager>();

            container = builder.Build();
            
            ServiceHost hostGeoManager = new ServiceHost(typeof(GeoManager));

            hostGeoManager.AddDependencyInjectionBehavior(typeof(GeoManager), container);

            hostGeoManager.Open();

            Console.WriteLine("Services started. Press [Enter] to exit.");
            Console.ReadLine();

            hostGeoManager.Close();
        }
    }
}
