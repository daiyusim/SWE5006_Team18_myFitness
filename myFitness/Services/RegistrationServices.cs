using Microsoft.Extensions.Options;
using MongoDB.Driver;
using myFitness.Data;
using myFitness.Models;

namespace myFitness.Services
{
    public class RegistrationServices : IRegistrationServices
    {
        private readonly IMongoCollection<Registration> _registrationCollection;

        public RegistrationServices(IOptions<DatabaseSettings> settings)
        {
           var mongoClient = new MongoClient(settings.Value.Connection);
           var mongoDb = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _registrationCollection = mongoDb.GetCollection<Registration>(settings.Value.Registration);
        }

        public async Task<List<Registration>> GetAsync() => await _registrationCollection.Find(_ => true).ToListAsync();
        
        public async Task<Registration> GetAsync(string id) =>
            await _registrationCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Registration newRegistration) =>
            await _registrationCollection.InsertOneAsync(newRegistration);


        public async Task UpdateAsync(string id, Registration updateRegistration) =>
            await _registrationCollection.ReplaceOneAsync(x=> x.Id == id, updateRegistration);

        public async Task RemoveAsync(string id)=>
            await _registrationCollection.DeleteOneAsync(x=> x.Id == id);
    }
}
