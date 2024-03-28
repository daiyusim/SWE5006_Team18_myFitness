using Microsoft.AspNetCore.Mvc;
using myFitness.Models;
using myFitness.Services;

namespace myFitness.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserServices _usersServices;

        public UserController(IUserServices usersServices)
        {
            _usersServices = usersServices;
        }


        // GET: api/users
        [HttpGet]
        public async Task<List<User>> Get() => await _usersServices.GetAsync();

        // GET api/users/{id}
        [HttpGet("{id:length(24)}")]
        public User GetUserByUserId(string id)
        {
            User us = _usersServices.Get(id);
  
            return us;
        }
    }
}
