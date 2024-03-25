using myFitness.Models;

namespace myFitness.Services
{
    public interface IEventRatingServices
    {
        Task<List<EventRating>> GetAsync();
        Task<EventRating> GetAsync(string id);
        Task CreateAsync(EventRating newEventRating);
        Task UpdateAsync(string id, EventRating updateEventRating);
        Task RemoveAsync(string id);
    }
}
