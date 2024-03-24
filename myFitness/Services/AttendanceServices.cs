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

        public async Task<bool> SubmitAttendance(List<Attendance> attendances)
        {
            try
            {
                foreach (var attendance in attendances)
                {
                    var existingAttendance = await _attendanceCollection.FindOneAndUpdateAsync(
                        Builders<Attendance>.Filter.And(
                            Builders<Attendance>.Filter.Eq(a => a.UserId, attendance.UserId),
                            Builders<Attendance>.Filter.Eq(a => a.EventId, attendance.EventId)
                        ),
                        Builders<Attendance>.Update
                            .Set(a => a.IsAttended, attendance.IsAttended)
                            .Set(a => a.CreatedOn, DateTime.UtcNow),
                        new FindOneAndUpdateOptions<Attendance>
                        {
                            IsUpsert = true,
                            ReturnDocument = ReturnDocument.After
                        });

                    // If there was no existing record, insert a new one
                    if (existingAttendance == null)
                    {
                        attendance.CreatedOn = DateTime.UtcNow;
                        await _attendanceCollection.InsertOneAsync(attendance);
                    }
                }
                return true;
            }
            catch (Exception ex)
            {
                // Log the error
                Console.WriteLine($"An error occurred: {ex.Message}");
                return false;
            }
        }
    }
}
