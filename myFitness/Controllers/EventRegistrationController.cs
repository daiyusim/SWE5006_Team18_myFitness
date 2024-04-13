using Microsoft.AspNetCore.Mvc;
using myFitness.Models;
using myFitness.Services;

namespace myFitness.Controllers
{
    [Route("api/registration")]
    [ApiController]
    public class EventRegistrationController : ControllerBase
    {
        private readonly IEventRegistrationServices _regisServices;

        public EventRegistrationController(IEventRegistrationServices regisServices)
        {
            _regisServices = regisServices;
        }


        // GET: api/registration
        [HttpGet]
        public async Task<List<EventRegistration>> Get() => await _regisServices.GetAsync();


        [HttpGet("activities/{userId:length(24)}")]
        public Task<Dashboard> GetActivitiesByUserId(string userId)
        {
            return _regisServices.GetActivitiesByUserId(userId);
        }

        // POST api/registration
        [HttpPost]
        public async Task<ActionResult<EventRegistration>> Post(EventRegistration ev)
        {
            await _regisServices.RegisterEvent(ev);
            return CreatedAtAction(nameof(Get), new { id = ev.Id }, ev);
        }

        [HttpPut]
        public async Task<IActionResult> SubmitAttendance(List<EventRegistration> registration)
        {
            try
            {
                bool success = await _regisServices.SubmitAttendance(registration);
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

        // DELETE api/registration/{eventid}?userId
        [HttpDelete("{eventId:length(24)}")]
        public async Task<ActionResult> Delete(string eventId, [FromQuery] string userId)
        {
            EventRegistration ev = await _regisServices.GetEventRegistrationByIds(eventId,userId);
            if (ev == null)
            {
                return NotFound();
            }

            await _regisServices.RemoveAsync(eventId, userId);

            return Ok(new { message = "Deleted Successfully" });
        }

    }
}
