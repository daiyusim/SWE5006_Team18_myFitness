using Microsoft.AspNetCore.Mvc;
using myFitness.Models;
using myFitness.Services;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace myFitness.Controllers
{
    [Route("api/profile")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileServices _profileServices;

        public ProfileController(IProfileServices profileServices)
        {
            _profileServices = profileServices;
        }


        // GET: api/profile
        [HttpGet]
        public async Task<List<Profile>> Get() => await _profileServices.GetAsync();

        // GET api/profile/{userId}
        [HttpGet("{userId:length(24)}")]
        public async Task<ActionResult<Profile>> Get(string userId)
        {
            Profile pf = await _profileServices.GetAsync(userId);
            if (pf == null)
            {
                return NotFound();
            }
            return pf;
        }

        // POST api/profile
        [HttpPost]
        public async Task<ActionResult<Profile>> Post(Profile pf)
        {
            await _profileServices.CreateAsync(pf);

            return CreatedAtAction(nameof(Get), new { userId = pf.UserId}, pf);
        }

        // PUT api/profile/{userId}
        [HttpPut("{userId:length(24)}")]
        public async Task<ActionResult> Put(string userId, Profile pf)
        {
            Profile db_pf = await _profileServices.GetAsync(userId);
            if(db_pf == null)
            {
                return NotFound();
            }

            db_pf.Id = pf.Id;
            await _profileServices.UpdateAsync(userId, pf);

            return Ok("Updated Successfully");
        }



    }
}
