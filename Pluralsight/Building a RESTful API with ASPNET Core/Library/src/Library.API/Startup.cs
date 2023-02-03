﻿using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Library.API.Services;
using Library.API.Entities;
using Microsoft.EntityFrameworkCore;
using Library.API.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.AspNetCore.Diagnostics;
using NLog.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Newtonsoft.Json.Serialization;
using System.Linq;
using AspNetCoreRateLimit;

namespace Library.API
{
  public class Startup
  {
    public static IConfiguration Configuration;

    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    // This method gets called by the runtime. Use this method to add services to the container.
    // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddMvc(setupAction =>
      {
        // pokud je to false, tak nam vrati data v podporovanem formatu - JSON
        // pokud `nastavim ena true, tak nam to vyhodi 406 cybu pokud format nepodporujeme
        setupAction.ReturnHttpNotAcceptable = true;
        // nastavime ze pokud nekdo bude vyzadovat XML v headeru, tak mu ho posleme 
        setupAction.OutputFormatters.Add(new XmlDataContractSerializerOutputFormatter());
        // setupAction.InputFormatters.Add(new XmlDataContractSerializerInputFormatter());

        var xmlDataContractSerializerInputFormatter =
        new XmlDataContractSerializerInputFormatter();
        xmlDataContractSerializerInputFormatter.SupportedMediaTypes.Add("application/vnd.marvin.authorwithdateofdeath.full+xml");
        setupAction.InputFormatters.Add(xmlDataContractSerializerInputFormatter);

        var jsonInputFormatter = setupAction.InputFormatters.OfType<JsonInputFormatter>().FirstOrDefault();
        // musime pridat vlastni MetaData type aby jsme ho mohli pouzivat
        // v Header Accept si normalne posleme jeho nazev a jen porovnavame se string/enum
        if (jsonInputFormatter != null)
        {
          jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.marvin.author.full+json");
          jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.marvin.authorwithdateofdeath.full+json");
        }

        var jsonOutputFormatter = setupAction.OutputFormatters.OfType<JsonOutputFormatter>().FirstOrDefault();

        if (jsonOutputFormatter != null)
        {
          jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.marvin.hateoas+json");
        }

      }).AddJsonOptions(options =>
      {
        options.SerializerSettings.ContractResolver =
              new CamelCasePropertyNamesContractResolver();
      });

      // register the DbContext on the container, getting the connection string from
      // appSettings (note: use this during development; in a production environment,
      // it's better to store the connection string in an environment variable)
      var connectionString = Configuration["connectionStrings:libraryDBConnectionString"];
      services.AddDbContext<LibraryContext>(o => o.UseSqlServer(connectionString));

      // register the repository
      services.AddScoped<ILibraryRepository, LibraryRepository>();

      services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();

      services.AddScoped<IUrlHelper>(implementationFactory =>
      {
        var actionContext = implementationFactory.GetService<IActionContextAccessor>()
              .ActionContext;
        return new UrlHelper(actionContext);
      });

      services.AddTransient<IPropertyMappingService, PropertyMappingService>();

      services.AddTransient<ITypeHelperService, TypeHelperService>();
            // pridame URLhealper k tomu abyu jsme mohli vytvaret previsous a next link
            services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();

      services.AddHttpCacheHeaders(
          (expirationModelOptions)
          =>
          {
            expirationModelOptions.MaxAge = 600;
          },
          (validationModelOptions)
          =>
          {
            validationModelOptions.AddMustRevalidate = true;
          });

      services.AddMemoryCache();

      services.Configure<IpRateLimitOptions>((options) =>
      {
        options.GeneralRules = new System.Collections.Generic.List<RateLimitRule>()
          {
                    new RateLimitRule()
                    {
                        Endpoint = "*",
                        Limit = 1000,
                        Period = "5m"
                    },
                    new RateLimitRule()
                    {
                        Endpoint = "*",
                        Limit = 200,
                        Period = "10s"
                    }
          };
      });

      services.AddSingleton<IRateLimitCounterStore, MemoryCacheRateLimitCounterStore>();
      services.AddSingleton<IIpPolicyStore, MemoryCacheIpPolicyStore>();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env,
        ILoggerFactory loggerFactory, LibraryContext libraryContext)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        app.UseExceptionHandler(appBuilder =>
        {
          appBuilder.Run(async context =>
                  {
                    // globalne odchytavame exceptions a pokud je k dispozici exception handle feature - poskytuje informace o exception
                    // tak logujeme pomoci NLog do souboru
                    var exceptionHandlerFeature = context.Features.Get<IExceptionHandlerFeature>();
                    if (exceptionHandlerFeature != null)
                    {
                      var logger = loggerFactory.CreateLogger("Global exception logger");
                      logger.LogError(500, exceptionHandlerFeature.Error, exceptionHandlerFeature.Error.Message);
                    }

                    // na zaver odesleme status code 500 a nasi error message
                    // tyka se vsech neosetrenych chyb
                    context.Response.StatusCode = 500;
                    await context.Response.WriteAsync("An unexpected fault happened. Try again later.");

                  });
        });
      }

      AutoMapper.Mapper.Initialize(cfg =>
      {
        // pokud mame nejake specialni property, ktere jsou vyutvareny dodatecne, tak je namapujeme
        // Name ziskame spojenim FirstName + LastName
        // Age zavolanim matody GetCurrentAge()
        cfg.CreateMap<Entities.Author, Models.AuthorDto>()
           .ForMember(dest => dest.Name, opt => opt.MapFrom(src => $"{src.FirstName} {src.LastName}"))
           .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.GetCurrentAge(src.DateOfDeath)));

        cfg.CreateMap<Entities.Book, Models.BookDto>();

        cfg.CreateMap<Models.AuthorForCreationDto, Entities.Author>();

        cfg.CreateMap<Models.AuthorForCreationWithDateOfDeathDto, Entities.Author>();

        cfg.CreateMap<Models.BookForCreationDto, Entities.Book>();

        cfg.CreateMap<Models.BookForUpdateDto, Entities.Book>();

        cfg.CreateMap<Entities.Book, Models.BookForUpdateDto>();
      });

      libraryContext.EnsureSeedDataForContext();

      app.UseIpRateLimiting();

      app.UseHttpCacheHeaders();

      app.UseMvc();
    }
  }
}