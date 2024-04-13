using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace myFitness.Utils
{
    public class AuthenticationUtils
    {
        private IConfiguration _configuration;
        public AuthenticationUtils(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public string getJwtToken(string id)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim("UserId", id),
            };
            var Sectoken = new JwtSecurityToken(
              _configuration["Jwt:Issuer"],
              _configuration["Jwt:Issuer"],
              claims,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(Sectoken);
        }
        public string Encrypt(string plain, string salt)
        {
            string secretKey = _configuration["AuthenticationSecretKey"];
            string combined = plain + salt;
            byte[] combinedBytes = Encoding.UTF8.GetBytes(combined);
            byte[] secretKeyBytes = Encoding.UTF8.GetBytes(secretKey);
            using (var hmac = new HMACSHA256(secretKeyBytes))
            {
                byte[] hash = hmac.ComputeHash(combinedBytes);
                return Convert.ToBase64String(hash);
            }
        }
        public bool VerifyPassword(string password, string plain, string salt)
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