using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using myFitness.Data;
using myFitness.Models;

namespace myFitness.Services
{
    public class UserServices : IUserServices
    {
        private readonly IMongoCollection<User> _userCollection;

        private readonly IMongoCollection<Profile> _profileCollection;

        public UserServices(IOptions<DatabaseSettings> settings)
        {
            var mongoClient = new MongoClient(settings.Value.Connection);
            var mongoDb = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _userCollection = mongoDb.GetCollection<User>(settings.Value.Users);
            // Create the unique index on the field
            var indexOptions = new CreateIndexOptions { Unique = true };
            var indexModelEmail = new CreateIndexModel<User>("{ emailAddress : 1 }", indexOptions);
            var indexModelContact = new CreateIndexModel<User>("{ contact : 1 }", indexOptions);
            _userCollection.Indexes.CreateOne(indexModelEmail);
            _userCollection.Indexes.CreateOne(indexModelContact);
            _profileCollection = mongoDb.GetCollection<Profile>(settings.Value.Profile);
        }

        public async Task<List<User>> GetAsync() => await _userCollection.Find(_ => true).ToListAsync();

        public User Get(string id)
        {
            var userObj = _userCollection.Find<User>(e => e.Id == id).FirstOrDefault();

            if (userObj == null)
            {
                throw new ArgumentException("User not found");
            }

            var profile = _profileCollection.Find<Profile>(e => e.UserId == id).FirstOrDefault();

            userObj.Profile = profile;
            return userObj;
        }
        public async Task<User> GetbyEmail(string email)
        {
            var userObj = await _userCollection.Find<User>(e => e.EmailAddress == email).FirstOrDefaultAsync();

            if (userObj == null)
            {
                throw new ArgumentException("User not found");
            }
            return userObj;

        }
        public async Task CreateAsync(User newUser) =>
            await _userCollection.InsertOneAsync(newUser);


        public async Task UpdateAsync(string id, User updateUser) =>
              await _userCollection.ReplaceOneAsync(x => x.Id == id, updateUser);

        public async Task RemoveAsync(string id) =>
            await _userCollection.DeleteOneAsync(x => x.Id == id);
    }
}
