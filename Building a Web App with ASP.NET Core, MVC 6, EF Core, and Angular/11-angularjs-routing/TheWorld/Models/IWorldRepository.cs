using System.Collections.Generic;
using System.Threading.Tasks;

namespace TheWorld.Models
{
  public interface IWorldRepository
  {
    IEnumerable<Trip> GetAllTrips();
    Trip GetTripByName(string tripName, string username);

    void AddTrip(Trip trip);
    void AddStop(string tripName, string username, Stop newStop);

    Task<bool> SaveChangesAsync();
    object GetTripsByUsername(string name);
  }
}