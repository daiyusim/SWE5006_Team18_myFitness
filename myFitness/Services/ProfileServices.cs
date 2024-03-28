using Microsoft.Extensions.Options;
using MongoDB.Driver;
using myFitness.Data;
using myFitness.Models;

namespace myFitness.Services
{
    public class ProfileServices : IProfileServices
    {
        private readonly IMongoCollection<Profile> _profileCollection;

        public ProfileServices(IOptions<DatabaseSettings> settings)
        {
           var mongoClient = new MongoClient(settings.Value.Connection);
           var mongoDb = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _profileCollection = mongoDb.GetCollection<Profile>(settings.Value.Profile);
        }

        public async Task<List<Profile>> GetAsync() => await _profileCollection.Find(_ => true).ToListAsync();
        
        public async Task<Profile> GetAsync(string userId) =>
            await _profileCollection.Find(x => x.UserId == userId).FirstOrDefaultAsync();

        public async Task CreateAsync(Profile newProfile) =>
            await _profileCollection.InsertOneAsync(newProfile);


        public async Task UpdateAsync(string userId, Profile updateProfile) =>
            await _profileCollection.ReplaceOneAsync(x=> x.UserId == userId, updateProfile);

        public async Task RemoveAsync(string userId) =>
            await _profileCollection.DeleteOneAsync(x=> x.UserId == userId);
    }
}
