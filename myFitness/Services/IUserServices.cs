using System.Collections.Generic;
using System.Threading.Tasks;
using myFitness.Models;

namespace myFitness.Services
{
    public interface IUserServices
    {
        Task<List<User>> GetAsync();
        Task<User> GetAsync(string id);
        Task CreateAsync(User newUser);
        Task UpdateAsync(string id, User updateUser);
        Task RemoveAsync(string id);
    }
}
