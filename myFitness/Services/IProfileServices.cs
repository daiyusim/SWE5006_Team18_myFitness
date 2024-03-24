using System.Collections.Generic;
using System.Threading.Tasks;
using myFitness.Models;

namespace myFitness.Services
{
    public interface IProfileServices
    {
        Task<List<Profile>> GetAsync();
        Task<Profile> GetAsync(string id);
        Task CreateAsync(Profile newProfile);
        Task UpdateAsync(string id, Profile updateProfile);
        Task RemoveAsync(string id);
    }
}
