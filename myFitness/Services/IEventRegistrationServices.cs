using System.Collections.Generic;
using System.Threading.Tasks;
using myFitness.Models;

namespace myFitness.Services
{
    public interface IEventRegistrationServices
    {
        Task<List<EventRegistration>> GetAsync();
        Task<EventRegistration> GetAsync(string id);
        Task CreateAsync(EventRegistration newRegistration);
        Task RegisterEvent(EventRegistration newRegistration);
        Task UpdateAsync(string id, EventRegistration updateRegistration);
        Task RemoveAsync(string eventId, string userId);
        Task<EventRegistration> GetEventRegistrationByIds(string eventId, string userId);
        Task<bool> SubmitAttendance(List<EventRegistration> attendances);

        Task<Dashboard> GetActivitiesByUserId(string userId);
    }
}
