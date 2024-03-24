using myFitness.Models;

namespace myFitness.Services
{
    public interface IAttendanceServices
    {
        Task<List<Attendance>> GetAsync();
        Task<Attendance> GetAsync(string id);
        Task CreateAsync(Attendance newAttendance);
        Task UpdateAsync(string id, Attendance updateAttendance);
        Task RemoveAsync(string id);
        Task<bool> SubmitAttendance(List<Attendance> attendances);
    }
}
