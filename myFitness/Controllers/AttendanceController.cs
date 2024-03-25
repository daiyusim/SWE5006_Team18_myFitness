using Microsoft.AspNetCore.Mvc;
using myFitness.Models;
using myFitness.Services;

namespace myFitness.Controllers
{
    [Route("api/attendance")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        private readonly IAttendanceServices _attendanceServices;

        public AttendanceController(IAttendanceServices attendanceServices)
        {
            _attendanceServices = attendanceServices;
        }


        // GET: api/attendance
        [HttpGet]
        public async Task<List<Attendance>> Get() => await _attendanceServices.GetAsync();

        [HttpPost]
        public async Task<IActionResult> SubmitAttendance(List<Attendance> attendances)
        {
            try
            {
                bool success = await _attendanceServices.SubmitAttendance(attendances);
                if (success)
                    return Ok();
                else
                    return StatusCode(500, "Failed to submit attendance."); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }


    }
}
