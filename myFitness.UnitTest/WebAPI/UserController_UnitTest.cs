using Moq;
using myFitness.Controllers;
using myFitness.Models;
using myFitness.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using NUnit.Framework;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using myFitness.Utils;

namespace myFitness.UnitTest.WebAPI
{
    [TestFixture]
    public class UserController_UnitTest
    {
        private UserController _controller;
        private Mock<IUserServices> _mockUserServices;
        private IConfiguration _configuration;
        private AuthenticationUtils _authenticationUtils;

        [SetUp]
        public void Setup()
        {
            _mockUserServices = new Mock<IUserServices>();
            // Set up ConfigurationBuilder
            var configBuilder = new ConfigurationBuilder();
            configBuilder.AddJsonFile("appsettings.json");
            _configuration = configBuilder.Build();
            _authenticationUtils = new AuthenticationUtils(_configuration);
            _controller = new UserController(_mockUserServices.Object, _configuration, _authenticationUtils);
        }

        [Test]
        public async Task Get_ReturnsListOfUsers()
        {
            var fakeUsers = new List<User>
            {
                new User { Id = "1", EmailAddress = "testuser1@gmail.com",Password="xx",Name="Test User 1" },
                new User { Id = "2", EmailAddress = "testuser2@gmail.com",Password="xx",Name="Test User 2" }
            };

            _mockUserServices.Setup(s => s.GetAsync()).ReturnsAsync(fakeUsers);

            var result = await _controller.Get();

            Assert.IsNotNull(result);
            Assert.IsInstanceOf<List<User>>(result);
            CollectionAssert.AreEqual(fakeUsers, result);
        }

        [Test]
        public void GetUserByUserId_WithValidId_ReturnsUser()
        {

            string userId = "validUserId";
            var expectedUser = new User { Id = userId, Name = "Test User" };
            _mockUserServices.Setup(services => services.Get(userId)).Returns(expectedUser);


            var result = _controller.GetUserByUserId(userId);

            Assert.IsInstanceOf<User>(result);
            Assert.AreEqual(expectedUser, result);
        }
        [Test]
        public void GetUserByUserId_WithInvalidId_ReturnsNotFound()
        {

            string invalidUserId = "invalidUserId";
            _mockUserServices.Setup(services => services.Get(invalidUserId)).Returns((User)null);

            var result = _controller.GetUserByUserId(invalidUserId);


            Assert.IsNull(result);
        }
    }
}
