using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using TheWorld.Models;
using TheWorld.Services;
using TheWorld.ViewModels;

namespace TheWorld.Controllers.Web
{
  public class AppController : Controller
  {
    private IMailService _mailService;
    private IConfigurationRoot _config;
    private WorldContext _context;
    private ILogger<AppController> _logger;

    public AppController(IMailService mailService, 
      IConfigurationRoot config,
      WorldContext context,
      ILogger<AppController> logger)
    {
      _mailService = mailService;
      _config = config;
      _context = context;
      _logger = logger;
    }

    public IActionResult Index()
    {
      try
      {
        var data = _context.Trips.ToList();

        return View(data);
      }
      catch (Exception ex)
      {
        _logger.LogError($"Failed to get trips in Index page: {ex.Message}");
        return Redirect("/error");
      }
    }

    public IActionResult Contact()
    {
      return View();
    }

    [HttpPost]
    public IActionResult Contact(ContactViewModel model)
    {
      if (model.Email.Contains("aol.com"))
      {
        ModelState.AddModelError("", "We don't support AOL addresses");
      }

      if (ModelState.IsValid)
      {
        _mailService.SendMail(_config["MailSettings:ToAddress"], model.Email, "From TheWorld", model.Message);

        ModelState.Clear();

        ViewBag.UserMessage = "Message Sent";
      }

      return View();
    }

    public IActionResult About()
    {
      return View();
    }

  }
}
