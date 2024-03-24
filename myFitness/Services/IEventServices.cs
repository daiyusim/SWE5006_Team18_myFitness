using myFitness.Models;

namespace myFitness.Services
{
    public interface IEventServices
    {
        Task<List<Event>> GetAsync();
        Task<Event> GetAsync(string id);
        Task CreateAsync(Event newEvent);
        Task UpdateAsync(string id, Event updateEvent);
        Task RemoveAsync(string id);
        Event GetRegistrationsForEvent(string eventId);
    }
}
