using Microsoft.AspNetCore.Mvc;
using myFitness.Models;
using myFitness.Services;

namespace myFitness.Controllers
{
    [Route("api/event")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventServices _eventServices;

        public EventController(IEventServices eventServices)
        {
            _eventServices = eventServices;
        }


        // GET: api/event
        [HttpGet]
        public async Task<List<Event>> Get() => await _eventServices.GetAsync();

        // GET api/event/{id}
        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Event>> Get(string id)
        {
            Event ev = await _eventServices.GetAsync(id);
            if(ev == null)
            {
                return NotFound();
            }

            return ev;
        }

        // POST api/event
        [HttpPost]
        public async Task<ActionResult<Event>> Post(Event ev)
        {
            await _eventServices.CreateAsync(ev);
            return CreatedAtAction(nameof(Get), new {id = ev.Id}, ev);
        }

        // PUT api/event/{id}
        [HttpPut("{id:length(24)}")]
        public async Task<ActionResult> Put(string id, Event ev)
        {
            Event db_ev = await _eventServices.GetAsync(id);
            if(db_ev == null)
            {
                return NotFound();
            }

            db_ev.Id = ev.Id;

            await _eventServices.UpdateAsync(id, ev);

            return Ok("Updated Successfully");
        }

        // DELETE api/event/{id}
        [HttpDelete("{id:length(24)}")]
        public async Task<ActionResult> Delete(string id)
        {
            Event ev = await _eventServices.GetAsync(id);
            if (ev == null)
            {
                return NotFound();
            }

            await _eventServices.RemoveAsync(id);

            return Ok(new { message = "Deleted Successfully" });
        }

        // GET api/event/registrations/{id}
        [HttpGet("registrations/{id:length(24)}")]
        public Event GetRegistrationsForEvent(string id)
        {
            return _eventServices.GetRegistrationsForEvent(id);
        }


    }
}
