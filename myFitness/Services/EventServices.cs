using Microsoft.Extensions.Options;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using myFitness.Data;
using myFitness.Models;

namespace myFitness.Services
{
    public class EventServices : IEventServices
    {
        private readonly IMongoCollection<Event> _eventCollection;
        private readonly IMongoCollection<User> _userCollection;
        private readonly IMongoCollection<EventRegistration> _registrationCollection;

        // Parameterless constructor
        public EventServices()
        {
            // Default constructor
        }

        // Constructor with IOptions<DatabaseSettings>
        public EventServices(IOptions<DatabaseSettings> settings)
        {
            var mongoClient = new MongoClient(settings.Value.Connection);
            var mongoDb = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _eventCollection = mongoDb.GetCollection<Event>(settings.Value.Events);
            _userCollection = mongoDb.GetCollection<User>(settings.Value.Users);
            _registrationCollection = mongoDb.GetCollection<EventRegistration>(settings.Value.Registration);
        }

        public async Task<List<Event>> GetAsync()
        {
            var events = await _eventCollection.Find(_ => true).ToListAsync();

            foreach (var eventObj in events)
            {
                var registrations =  _registrationCollection.AsQueryable()
                    .Where(r => r.EventId == eventObj.Id)
                    .ToList();

                eventObj.Registrations = registrations;
            }

            return events;
        }

        public async Task<Event> GetAsync(string id) =>
            await _eventCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Event newEvent) =>
            await _eventCollection.InsertOneAsync(newEvent);


        public async Task UpdateAsync(string id, Event updateEvent) =>
            await _eventCollection.ReplaceOneAsync(x=> x.Id == id, updateEvent);

        public async Task RemoveAsync(string id)=>
            await _eventCollection.DeleteOneAsync(x=> x.Id == id);

        public Event GetRegistrationsForEvent(string eventId)
        {
            var eventObj = _eventCollection.Find<Event>(e => e.Id == eventId).FirstOrDefault();

            if (eventObj == null)
            {
                throw new ArgumentException("Event not found");
            }

            // Load registrations for the event with associated user data
            var registrations = _registrationCollection.AsQueryable()
                                                    .Where(r => r.EventId == eventId).ToList();
            eventObj.Registrations = registrations;
            foreach (var registration in registrations)
            {
                registration.User = _userCollection.Find(u => u.Id == registration.UserId).FirstOrDefault();
            }


            return eventObj;
        }

        





    }
}
