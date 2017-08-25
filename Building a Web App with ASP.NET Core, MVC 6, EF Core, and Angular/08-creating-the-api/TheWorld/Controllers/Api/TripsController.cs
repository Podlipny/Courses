using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TheWorld.Models;
using TheWorld.ViewModels;

namespace TheWorld.Controllers.Api
{
  [Route("api/trips")]
  public class TripsController : Controller
  {
    private ILogger<TripsController> _logger;
    private IWorldRepository _repository;

    public TripsController(IWorldRepository repository, ILogger<TripsController> logger)
    {
      _repository = repository;
      _logger = logger;
    }

    [HttpGet("")]
    public IActionResult Get()
    {
      try
      {
        var results = _repository.GetAllTrips();

        return Ok(Mapper.Map<IEnumerable<TripViewModel>>(results));
      }
      catch (Exception ex)
      {
        _logger.LogError($"Failed to get All Trips: {ex}");

        return BadRequest("Error occurred");
      }
    }

    [HttpPost("")]
    public async Task<IActionResult> Post([FromBody]TripViewModel theTrip)
    {
      if (ModelState.IsValid)
      {
        // Save to the Database
        var newTrip = Mapper.Map<Trip>(theTrip);
        _repository.AddTrip(newTrip);

        if (await _repository.SaveChangesAsync())
        {
          return Created($"api/trips/{theTrip.Name}", Mapper.Map<TripViewModel>(newTrip));
        }
      }

      return BadRequest("Failed to save the trip");
    }
  }
}
