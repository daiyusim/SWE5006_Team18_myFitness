using Microsoft.Extensions.Options;
using MongoDB.Driver;
using myFitness.Data;
using myFitness.Models;

namespace myFitness.Services
{
    public class EventRatingServices
    {
        private readonly IMongoCollection<EventRating> _eventRatingCollection;

        public EventRatingServices(IOptions<DatabaseSettings> settings)
        {
           var mongoClient = new MongoClient(settings.Value.Connection);
           var mongoDb = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _eventRatingCollection = mongoDb.GetCollection<EventRating>(settings.Value.Rating);
        }

        public async Task<List<EventRating>> GetAsync() => await _eventRatingCollection.Find(_ => true).ToListAsync();
        
        public async Task<EventRating> GetAsync(string id) =>
            await _eventRatingCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(EventRating newEventRating) =>
            await _eventRatingCollection.InsertOneAsync(newEventRating);


        public async Task UpdateAsync(string id, EventRating updateEventRating) =>
            await _eventRatingCollection.ReplaceOneAsync(x=> x.Id == id, updateEventRating);

        public async Task RemoveAsync(string id)=>
            await _eventRatingCollection.DeleteOneAsync(x=> x.Id == id);
    }
}
