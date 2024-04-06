using Microsoft.Extensions.Options;
using MongoDB.Driver;
using myFitness.Data;
using myFitness.Models;

namespace myFitness.Services
{
    public class EventRegistrationServices : IEventRegistrationServices
    {
        private readonly IMongoCollection<EventRegistration> _registrationCollection;

        public EventRegistrationServices(IOptions<DatabaseSettings> settings)
        {
           var mongoClient = new MongoClient(settings.Value.Connection);
           var mongoDb = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _registrationCollection = mongoDb.GetCollection<EventRegistration>(settings.Value.Registration);
        }

        public async Task<List<EventRegistration>> GetAsync() => await _registrationCollection.Find(_ => true).ToListAsync();
        
        public async Task<EventRegistration> GetAsync(string id) =>
            await _registrationCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(EventRegistration newRegistration) =>
            await _registrationCollection.InsertOneAsync(newRegistration);


        public async Task UpdateAsync(string id, EventRegistration updateRegistration) =>
            await _registrationCollection.ReplaceOneAsync(x=> x.Id == id, updateRegistration);

        public async Task RemoveAsync(string id)=>
            await _registrationCollection.DeleteOneAsync(x=> x.Id == id);

        public async Task<bool> SubmitAttendance(List<EventRegistration> attendances)
        {
            try
            {
                foreach (var attendance in attendances)
                {
                    await UpdateAsync(attendance.Id, attendance);
                }
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                return false;
            }
        }
    }
}
