using Microsoft.Extensions.Options;
using MongoDB.Driver;
using myFitness.Data;
using myFitness.Models;

namespace myFitness.Services
{
    public class UserServices
    {
        private readonly IMongoCollection<User> _userCollection;

        public UserServices(IOptions<DatabaseSettings> settings)
        {
           var mongoClient = new MongoClient(settings.Value.Connection);
           var mongoDb = mongoClient.GetDatabase(settings.Value.DatabaseName);
           _userCollection = mongoDb.GetCollection<User>(settings.Value.Users);
        }

        public async Task<List<User>> GetAsync() => await _userCollection.Find(_ => true).ToListAsync();
        
        public async Task<User> GetAsync(string id) =>
            await _userCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(User newUser) =>
            await _userCollection.InsertOneAsync(newUser);


        public async Task UpdateAsync(string id, User updateUser) =>
              await _userCollection.ReplaceOneAsync(x => x.Id == id, updateUser);

        public async Task RemoveAsync(string id)=>
            await _userCollection.DeleteOneAsync(x=> x.Id == id);
    }
}
