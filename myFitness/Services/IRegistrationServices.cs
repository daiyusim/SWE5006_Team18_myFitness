using System.Collections.Generic;
using System.Threading.Tasks;
using myFitness.Models;

namespace myFitness.Services
{
    public interface IRegistrationServices
    {
        Task<List<Registration>> GetAsync();
        Task<Registration> GetAsync(string id);
        Task CreateAsync(Registration newRegistration);
        Task UpdateAsync(string id, Registration updateRegistration);
        Task RemoveAsync(string id);
    }
}
