using Microsoft.Extensions.Options;
using MongoDB.Driver;
using myFitness.Data;
using myFitness.Models;

namespace myFitness.Services
{
    public class AttendanceServices
    {
        private readonly IMongoCollection<Attendance> _attendanceCollection;

        public AttendanceServices(IOptions<DatabaseSettings> settings)
        {
           var mongoClient = new MongoClient(settings.Value.Connection);
           var mongoDb = mongoClient.GetDatabase(settings.Value.DatabaseName);
           _attendanceCollection = mongoDb.GetCollection<Attendance>(settings.Value.Attendance);
        }

        public async Task<List<Attendance>> GetAsync() => await _attendanceCollection.Find(_ => true).ToListAsync();
        
        public async Task<Attendance> GetAsync(string id) =>
            await _attendanceCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Attendance newAttendance) =>
            await _attendanceCollection.InsertOneAsync(newAttendance);


        public async Task UpdateAsync(string id, Attendance updateAttendance) =>
            await _attendanceCollection.ReplaceOneAsync(x=> x.Id == id, updateAttendance);

        public async Task RemoveAsync(string id)=>
            await _attendanceCollection.DeleteOneAsync(x=> x.Id == id);
    }
}
