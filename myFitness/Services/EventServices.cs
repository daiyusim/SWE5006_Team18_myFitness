using Microsoft.Extensions.Options;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using myFitness.Data;
using myFitness.Models;

namespace myFitness.Services
{
    public class EventServices
    {
        private readonly IMongoCollection<Event> _eventCollection;
        private readonly IMongoCollection<User> _userCollection;
        private readonly IMongoCollection<Registration> _registrationCollection;
        private readonly IMongoCollection<Attendance> _attendanceCollection;
        public EventServices(IOptions<DatabaseSettings> settings)
        {
           var mongoClient = new MongoClient(settings.Value.Connection);
           var mongoDb = mongoClient.GetDatabase(settings.Value.DatabaseName);
           _eventCollection = mongoDb.GetCollection<Event>(settings.Value.Events);
            _userCollection = mongoDb.GetCollection<User>(settings.Value.Users);
            _registrationCollection = mongoDb.GetCollection<Registration>(settings.Value.Registration);
            _attendanceCollection = mongoDb.GetCollection<Attendance>(settings.Value.Attendance);
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
                registration.Attendance = _attendanceCollection.Find(u => u.UserId == registration.UserId).FirstOrDefault();
            }


            return eventObj;
        }

        





    }
}
