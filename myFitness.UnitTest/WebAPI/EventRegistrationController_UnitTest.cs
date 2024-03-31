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
    public class EventRegistrationController_UnitTest
    {
        private EventRegistrationController _controller;
        private Mock<IEventRegistrationServices> _mockEventRegistrationServices;

        [SetUp]
        public void Setup()
        {
            _mockEventRegistrationServices = new Mock<IEventRegistrationServices>();
            _controller = new EventRegistrationController(_mockEventRegistrationServices.Object);
        }

        [Test]
        public async Task Get_ReturnsListOfEventRegistrations()
        {
            var eventRegistration = new List<EventRegistration>
    {
        new EventRegistration { Id = "1", UserId = "1", EventId = "1"},
        new EventRegistration { Id = "2", UserId = "2", EventId = "1" }
    };

            _mockEventRegistrationServices.Setup(s => s.GetAsync()).ReturnsAsync(eventRegistration);

            var result = await _controller.Get();

            Assert.IsNotNull(result);
            Assert.That(result.Count, Is.EqualTo(eventRegistration.Count));
            Assert.IsInstanceOf<List<EventRegistration>>(result);
            CollectionAssert.AreEqual(eventRegistration, result);
        }

        [Test]
        public async Task Post_CreateNewEventRegistration()
        {
            var eventRegistration = new EventRegistration { Id = "1", UserId = "1", EventId = "1" };
            _mockEventRegistrationServices.Setup(x => x.CreateAsync(eventRegistration)).Returns(Task.CompletedTask);

            var result = await _controller.Post(eventRegistration);

            Assert.IsNotNull(result);
            Assert.IsInstanceOf<CreatedAtActionResult>(result.Result);

            var createdAtActionResult = (CreatedAtActionResult)result.Result;
            Assert.AreEqual(nameof(EventRegistrationController.Get), createdAtActionResult.ActionName);
            Assert.AreEqual(eventRegistration.Id, createdAtActionResult.RouteValues["id"]);
            Assert.AreEqual(eventRegistration, createdAtActionResult.Value);
        }

    }
}
