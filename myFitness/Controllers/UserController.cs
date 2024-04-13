using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using myFitness.Models;
using myFitness.Services;
using Newtonsoft.Json.Linq;

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
                string password = userRegisterInput.password;
                string encryptedPassword = Encrypt(password, "testing12345678Salt");
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
                if (VerifyPassword(password, userInputPassword, "testing12345678Salt"))
                {
                    return Ok(new { Token = getJwtToken(user.Id, user.RoleType) });

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

        private string getJwtToken(string id, string roleType)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim("UserId", id),
                new Claim("RoleType", roleType)
            };
            var Sectoken = new JwtSecurityToken(
              _configuration["Jwt:Issuer"],
              _configuration["Jwt:Issuer"],
              claims,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(Sectoken);
        }
        private string Encrypt(string plain, string salt)
        {
            string secretKey = _configuration["AuthenticationSecretKey"];
            string combined = plain + salt;
            byte[] combinedBytes = Convert.FromBase64String(combined);
            byte[] secretKeyBytes = Encoding.UTF8.GetBytes(secretKey);
            using (var hmac = new HMACSHA256(secretKeyBytes))
            {
                byte[] hash = hmac.ComputeHash(combinedBytes);
                return Convert.ToBase64String(hash);
            }
        }
        private bool VerifyPassword(string password, string plain, string salt)
        {
            try
            {
                string encryptedPlain = Encrypt(plain, salt);
                if (encryptedPlain == password)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch
            {
                return false;
            }
        }

    }
}
