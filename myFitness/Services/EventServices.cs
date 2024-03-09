using Microsoft.Extensions.Options;
using MongoDB.Driver;
using myFitness.Data;
using myFitness.Models;

namespace myFitness.Services
{
    public class EventServices
    {
        private readonly IMongoCollection<Event> _eventCollection;

        public EventServices(IOptions<DatabaseSettings> settings)
        {
           var mongoClient = new MongoClient(settings.Value.Connection);
           var mongoDb = mongoClient.GetDatabase(settings.Value.DatabaseName);
           _eventCollection = mongoDb.GetCollection<Event>(settings.Value.CollectionName);
        }

        public async Task<List<Event>> GetAsync() => await _eventCollection.Find(_ => true).ToListAsync();
        
        public async Task<Event> GetAsync(string id) =>
            await _eventCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Event newEvent) =>
            await _eventCollection.InsertOneAsync(newEvent);


        public async Task UpdateAsync(string id, Event updateEvent) =>
            await _eventCollection.ReplaceOneAsync(x=> x.Id == id, updateEvent);

        public async Task RemoveAsync(string id)=>
            await _eventCollection.DeleteOneAsync(x=> x.Id == id);
    }
}
