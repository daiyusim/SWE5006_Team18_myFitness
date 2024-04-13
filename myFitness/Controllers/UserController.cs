using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using myFitness.Models;
using myFitness.Services;
using myFitness.Utils;
using Newtonsoft.Json.Linq;

namespace myFitness.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserServices _usersServices;
        private readonly IConfiguration _configuration;
        private readonly AuthenticationUtils _authenticationUtils;
        public UserController(IUserServices usersServices, IConfiguration configuration, AuthenticationUtils authenticationUtils)
        {
            _usersServices = usersServices;
            _configuration = configuration;
            _authenticationUtils = authenticationUtils;
        }


        // GET: api/users
        [HttpGet]
        [Authorize]
        public async Task<List<User>> Get() => await _usersServices.GetAsync();

        // GET api/users/{id}
        [HttpGet("{id:length(24)}")]
        [Authorize]
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
                string password = userRegisterInput.password;
                string encryptedPassword = _authenticationUtils.Encrypt(password, "testing12345678Salt");
                User newUser = new User
                {
                    EmailAddress = userRegisterInput.email,
                    Password = encryptedPassword,
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
                string password = user.Password;
                string userInputPassword = userLoginInput.password;
                if (_authenticationUtils.VerifyPassword(password, userInputPassword, "testing12345678Salt"))
                {
                    return Ok(new { Token = _authenticationUtils.getJwtToken(user.Id) });

                }
                else
                {
                    return Unauthorized("Unauthorized");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("verifyJWT")]
        public async Task<ActionResult> VerifyJWT(UserVerifyJWTInput userVerifyJWTInput)
        {
            string jwt = userVerifyJWTInput.jwt;
            var tokenHandler = new JwtSecurityTokenHandler();
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = securityKey,
                ValidateIssuer = false,
                ValidateAudience = false,
                RequireExpirationTime = true,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            SecurityToken validatedToken;
            try
            {
                tokenHandler.ValidateToken(jwt, validationParameters, out validatedToken);
                return Ok(true);
            }
            catch (SecurityTokenException)
            {
                // Token validation failed
                return Unauthorized(false);
            }

        }

    }
}
