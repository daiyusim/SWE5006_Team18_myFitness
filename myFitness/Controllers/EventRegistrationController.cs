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

        // POST api/registration
        [HttpPost]
        public async Task<ActionResult<EventRegistration>> Post(EventRegistration ev)
        {
            await _regisServices.CreateAsync(ev);
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


    }
}
