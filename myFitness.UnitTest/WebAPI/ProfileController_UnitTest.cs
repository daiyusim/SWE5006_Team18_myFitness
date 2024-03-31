using Moq;
using myFitness.Controllers;
using myFitness.Models;
using myFitness.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using NUnit.Framework;
using Microsoft.AspNetCore.Mvc;

namespace myFitness.UnitTest.WebAPI
{
    [TestFixture]
    public class ProfileController_UnitTest
    {
        private ProfileController _controller;
        private Mock<IProfileServices> _mockProfileServices;

        [SetUp]
        public void Setup()
        {
            _mockProfileServices = new Mock<IProfileServices>();
            _controller = new ProfileController(_mockProfileServices.Object);
        }

        [Test]
        public async Task Get_ReturnsListOfProfiles()
        {
            var profiles = new List<Profile>
    {
        new Profile { Id = "1", UserId = "1"},
        new Profile { Id = "2", UserId = "2" }
    };

            _mockProfileServices.Setup(s => s.GetAsync()).ReturnsAsync(profiles);

            var result = await _controller.Get();

            Assert.IsNotNull(result);
            Assert.That(result.Count, Is.EqualTo(profiles.Count));
            Assert.IsInstanceOf<List<Profile>>(result);
            CollectionAssert.AreEqual(profiles, result);
        }
        [Test]
        public async Task Get_ReturnsSpecificProfile()
        {
            string userId = "1";
            var expectedProfile = new Profile { Id = "1", UserId = "1" };
            _mockProfileServices.Setup(x => x.GetAsync(userId)).ReturnsAsync(expectedProfile);

            var result = await _controller.Get(userId);

            Assert.IsNotNull(result);
            Assert.IsInstanceOf<ActionResult<Profile>>(result);
            Assert.That(result.Value, Is.EqualTo(expectedProfile));
        }

        [Test]
        public async Task Post_CreateNewProfiles()
        {
            var profile = new Profile { Id = "1", UserId = "1" };
            _mockProfileServices.Setup(x => x.CreateAsync(profile)).Returns(Task.CompletedTask);

            var result = await _controller.Post(profile);

            Assert.IsNotNull(result);
            Assert.IsInstanceOf<CreatedAtActionResult>(result.Result);
            var createdAtActionResult = (CreatedAtActionResult)result.Result;
            Assert.AreEqual(nameof(ProfileController.Get), createdAtActionResult.ActionName);
            Assert.AreEqual(profile.UserId, createdAtActionResult.RouteValues["userId"]);
            Assert.AreEqual(profile, createdAtActionResult.Value);
        }
        [Test]
        public async Task Put_UpdateExistingProfile()
        {
            string profileId = "1";
            var profile = new Profile { Id = "1", UserId = "1" };
            var existingProfile = new Profile { /* existing profile data */ };

            _mockProfileServices.Setup(s => s.GetAsync(profileId)).ReturnsAsync(new Profile { Id = profileId, UserId = "1" });
            _mockProfileServices.Setup(s => s.UpdateAsync(profileId, It.IsAny<Profile>())).Returns(Task.CompletedTask);

            var result = await _controller.Put(profileId, profile);

            Assert.IsNotNull(result);
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okObjectResult = (OkObjectResult)result;
            Assert.AreEqual("Updated Successfully", okObjectResult.Value);
        }






    }
}
