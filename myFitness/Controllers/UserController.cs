using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using myFitness.Models;
using myFitness.Services;

namespace myFitness.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserServices _usersServices;
        private readonly IConfiguration _configuration;
        public UserController(IUserServices usersServices, IConfiguration configuration)
        {
            _usersServices = usersServices;
            _configuration = configuration;
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
        [HttpPost("register")]
        public async Task<ActionResult> Register(UserRegisterInput userRegisterInput)
        {
            try
            {
                User newUser = new User
                {
                    EmailAddress = userRegisterInput.email,
                    Password = userRegisterInput.password,
                    Name = userRegisterInput.name,
                    Contact = userRegisterInput.contact,
                };
                await _usersServices.CreateAsync(newUser);
                return Ok("User Created");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }
        [HttpPost("login")]
        public async Task<ActionResult> Login(UserLoginInput userLoginInput)
        {
            try
            {
                User user = await _usersServices.GetbyEmail(userLoginInput.email);
                if (user.Password == userLoginInput.password)
                {
                    return Ok(getJwtToken(user.Id));
                }
                else
                {
                    throw new Exception("Wrong password");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        private string getJwtToken(string id)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim("UserId", id)
            };
            var Sectoken = new JwtSecurityToken(_configuration["Jwt:Issuer"],
              _configuration["Jwt:Issuer"],
              claims,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(Sectoken);
        }

    }
}
