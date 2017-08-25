using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TheWorld.Models;
using TheWorld.ViewModels;

namespace TheWorld.Controllers.Web
{
  public class AuthController : Controller
  {
    private SignInManager<WorldUser> _signInManager;

    public AuthController(SignInManager<WorldUser> signInManager)
    {
      _signInManager = signInManager;
    }

    public ActionResult Login()
    {
      if (User.Identity.IsAuthenticated)
      {
        return RedirectToAction("Trips", "App");
      }
      return View();
    }

    [HttpPost]
    public async Task<ActionResult> Login(LoginViewModel model)
    {
      if (ModelState.IsValid)
      {
        var signinResult = await _signInManager.PasswordSignInAsync(model.UserName,
                                                                    model.Password,
                                                                    false, false);
        if (signinResult.Succeeded)
        {
          return RedirectToAction("Trips", "App");
        }
      }

      // Just say Login failed on all errors
      ModelState.AddModelError("", "Login Failed");

      return View();
    }

    public async Task<ActionResult> Logout()
    {
      if (User.Identity.IsAuthenticated)
      {
        await _signInManager.SignOutAsync();
      }
      return RedirectToAction("Index", "App");
    }

  }
}
