using AutoMapper;
using CityInfo.API.Models;
using CityInfo.API.Services;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CityInfo.API.Controllers
{
  [Route("api/cities")]
  public class PointsOfInterestController : Controller
  {
    private ILogger<PointsOfInterestController> _logger;
    private IMailService _mailService;
    private ICityInfoRepository _cityInfoRepository;

    public ILogger<PointsOfInterestController> Logger
    {
      get => _logger;
      set => _logger = value;
    }

    public IMailService MailService
    {
      get => _mailService;
      set => _mailService = value;
    }

    public ICityInfoRepository CityInfoRepository
    {
      get => _cityInfoRepository;
      set => _cityInfoRepository = value;
    }

    public PointsOfInterestController(ILogger<PointsOfInterestController> logger, IMailService mailService,
      ICityInfoRepository cityInfoRepository)
    {
      Logger = logger;
      MailService = mailService;
      CityInfoRepository = cityInfoRepository;
    }

    [HttpGet("{cityId}/pointsofinterest")]
    public IActionResult GetPointsOfInterest(int cityId)
    {
      try
      {
        if (!CityInfoRepository.CityExists(cityId))
        {
          Logger.LogInformation($"City with id {cityId} wasn't found when accessing points of interest.");
          return NotFound();
        }

        var pointsOfInterestForCity = CityInfoRepository.GetPointsOfInterestForCity(cityId);
        var pointsOfInterestForCityResults = Mapper.Map<IEnumerable<PointOfInterestDto>>(pointsOfInterestForCity);
        return Ok(pointsOfInterestForCityResults);
      }
      catch (Exception ex)
      {
        Logger.LogCritical($"Exception while getting points of interest for city with id {cityId}.", ex);
        return StatusCode(500, "A problem happened while handling your request.");
      }
    }

    [HttpGet("{cityId}/pointsofinterest/{id}", Name = "GetPointOfInterest")]
    public IActionResult GetPointOfInterest(int cityId, int id)
    {
      if (!CityInfoRepository.CityExists(cityId))
      {
        return NotFound();
      }

      var pointOfInterest = CityInfoRepository.GetPointOfInterestForCity(cityId, id);
      if (pointOfInterest == null)
      {
        return NotFound();
      }

      var pointOfInterestResult = Mapper.Map<PointOfInterestDto>(pointOfInterest);
      return Ok(pointOfInterestResult);
    }

    [HttpPost("{cityId}/pointsofinterest")]
    public IActionResult CreatePointOfInterest(int cityId, [FromBody] PointOfInterestForCreationDto pointOfInterest)
    {
      if (pointOfInterest == null)
      {
        return BadRequest();
      }

      if (pointOfInterest.Description == pointOfInterest.Name)
      {
        ModelState.AddModelError("Description", "The provided description should be different from the name.");
      }

      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      if (!CityInfoRepository.CityExists(cityId))
      {
        return NotFound();
      }

      var finalPointOfInterest = Mapper.Map<Entities.PointOfInterest>(pointOfInterest);
      CityInfoRepository.AddPointOfInterestForCity(cityId, finalPointOfInterest);
      if (!CityInfoRepository.Save())
      {
        return StatusCode(500, "A problem happened while handling your request.");
      }

      var createdPointOfInterestToReturn = Mapper.Map<Models.PointOfInterestDto>(finalPointOfInterest);
      return CreatedAtRoute("GetPointOfInterest", new {cityId = cityId, id = createdPointOfInterestToReturn.Id},
        createdPointOfInterestToReturn);
    }

    [HttpPut("{cityId}/pointsofinterest/{id}")]
    public IActionResult UpdatePointOfInterest(int cityId, int id,
      [FromBody] PointOfInterestForUpdateDto pointOfInterest)
    {
      if (pointOfInterest == null)
      {
        return BadRequest();
      }

      if (pointOfInterest.Description == pointOfInterest.Name)
      {
        ModelState.AddModelError("Description", "The provided description should be different from the name.");
      }

      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      if (!CityInfoRepository.CityExists(cityId))
      {
        return NotFound();
      }

      var pointOfInterestEntity = CityInfoRepository.GetPointOfInterestForCity(cityId, id);
      if (pointOfInterestEntity == null)
      {
        return NotFound();
      }

      Mapper.Map(pointOfInterest, pointOfInterestEntity);
      if (!CityInfoRepository.Save())
      {
        return StatusCode(500, "A problem happened while handling your request.");
      }

      return NoContent();
    }

    [HttpPatch("{cityId}/pointsofinterest/{id}")]
    public IActionResult PartiallyUpdatePointOfInterest(int cityId, int id,
      [FromBody] JsonPatchDocument<PointOfInterestForUpdateDto> patchDoc)
    {
      if (patchDoc == null)
      {
        return BadRequest();
      }

      if (!CityInfoRepository.CityExists(cityId))
      {
        return NotFound();
      }

      var pointOfInterestEntity = CityInfoRepository.GetPointOfInterestForCity(cityId, id);
      if (pointOfInterestEntity == null)
      {
        return NotFound();
      }

      var pointOfInterestToPatch = Mapper.Map<PointOfInterestForUpdateDto>(pointOfInterestEntity);

      // predame original (pointOfInterestToPatch)
      patchDoc.ApplyTo(pointOfInterestToPatch, ModelState);
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      if (pointOfInterestToPatch.Description == pointOfInterestToPatch.Name)
      {
        ModelState.AddModelError("Description", "The provided description should be different from the name.");
      }

      TryValidateModel(pointOfInterestToPatch);
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      Mapper.Map(pointOfInterestToPatch, pointOfInterestEntity);
      if (!CityInfoRepository.Save())
      {
        return StatusCode(500, "A problem happened while handling your request.");
      }

      return NoContent();
    }

    [HttpDelete("{cityId}/pointsofinterest/{id}")]
    public IActionResult DeletePointOfInterest(int cityId, int id)
    {
      if (!CityInfoRepository.CityExists(cityId))
      {
        return NotFound();
      }

      var pointOfInterestEntity = CityInfoRepository.GetPointOfInterestForCity(cityId, id);
      if (pointOfInterestEntity == null)
      {
        return NotFound();
      }

      CityInfoRepository.DeletePointOfInterest(pointOfInterestEntity);
      if (!CityInfoRepository.Save())
      {
        return StatusCode(500, "A problem happened while handling your request.");
      }

      MailService.Send("Point of interest deleted.",
        $"Point of interest {pointOfInterestEntity.Name} with id {pointOfInterestEntity.Id} was deleted.");
      return NoContent();
    }
  }
}
