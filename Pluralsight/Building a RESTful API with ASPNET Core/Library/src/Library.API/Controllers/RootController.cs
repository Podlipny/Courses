using Library.API.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Library.API.Controllers
{
  [Route("api")]
  public class RootController : Controller
  {
    private IUrlHelper _urlHelper;

    public RootController(IUrlHelper urlHelper)
    {
      _urlHelper = urlHelper;
    }

    // generujeme linky pro vsechny akce, ktere je mozne pouzit, ale pouze na ty rootove, ostatni akce by si meli predat linky sami
    // naprikald jako GetAuthors preda linky na get/create books a CreateAuthor preda linky na get/create book a get books
    [HttpGet(Name = "GetRoot")]
    public IActionResult GetRoot([FromHeader(Name = "Accept")] string mediaType)
    {
      if (mediaType == "application/vnd.marvin.hateoas+json")
      {
        var links = new List<LinkDto>();
        links.Add(new LinkDto(_urlHelper.Link("GetRoot", new { }), "self", "GET"));
        links.Add(new LinkDto(_urlHelper.Link("GetAuthors", new { }), "authors", "GET"));
        links.Add(new LinkDto(_urlHelper.Link("CreateAuthor", new { }), "create_author", "POST"));
        return Ok(links);
      }

      return NoContent();
    }
  }
}
