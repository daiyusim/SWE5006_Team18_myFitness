using Microsoft.AspNetCore.Mvc;
using myFitness.Models;
using myFitness.Services;

namespace myFitness.Controllers
{
    [Route("api/registration")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly IRegistrationServices _regisServices;

        public RegistrationController(IRegistrationServices regisServices)
        {
            _regisServices = regisServices;
        }


        // GET: api/registration
        [HttpGet]
        public async Task<List<Registration>> Get() => await _regisServices.GetAsync();

        // POST api/registration
        [HttpPost]
        public async Task<ActionResult<Registration>> Post(Registration ev)
        {
            await _regisServices.CreateAsync(ev);
            return CreatedAtAction(nameof(Get), new { id = ev.Id }, ev);
        }


    }
}
