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
    public class EventController_UnitTest
    {
        private EventController _controller;
        private Mock<IEventServices> _mockEventServices;

        [SetUp]
        public void Setup()
        {
            _mockEventServices = new Mock<IEventServices>();
            _controller = new EventController(_mockEventServices.Object);
        }

        [Test]
        public async Task Get_ReturnsListOfEvents()
        {
            var fakeEvents = new List<Event>
            {
                new Event { Id = "1", Title = "Event 1" },
                new Event { Id = "2", Title = "Event 2" }
            };

            _mockEventServices.Setup(s => s.GetAsync()).ReturnsAsync(fakeEvents);

            var result = await _controller.Get();

            Assert.IsNotNull(result);
            Assert.IsInstanceOf<List<Event>>(result);
            CollectionAssert.AreEqual(fakeEvents, result);
        }

        [Test]
        public async Task Post_CreatesNewEvent()
        {
            var newEvent = new Event { Id = "3", Title = "New Event" };

            _mockEventServices.Setup(s => s.CreateAsync(It.IsAny<Event>())).Returns(Task.CompletedTask);

            var result = await _controller.Post(newEvent);

            Assert.IsNotNull(result);
            Assert.IsTrue(result.Result is CreatedAtActionResult);
            var createdAtActionResult = (CreatedAtActionResult)result.Result;
            Assert.AreEqual("Get", createdAtActionResult.ActionName);
            Assert.AreEqual(newEvent.Id, createdAtActionResult.RouteValues["id"]);
            Assert.AreEqual(newEvent, createdAtActionResult.Value);
        }

        [Test]
        public async Task Put_UpdatesExistingEvent()
        {
            var existingEventId = "1";
            var updatedEvent = new Event { Id = existingEventId, Title = "Updated Event" };

            _mockEventServices.Setup(s => s.GetAsync(existingEventId)).ReturnsAsync(new Event { Id = existingEventId, Title = "Existing Event" });
            _mockEventServices.Setup(s => s.UpdateAsync(existingEventId, It.IsAny<Event>())).Returns(Task.CompletedTask);

            var result = await _controller.Put(existingEventId, updatedEvent);

            Assert.IsNotNull(result);
            Assert.IsTrue(result is OkObjectResult);
            var okResult = (OkObjectResult)result;
            Assert.AreEqual("Updated Successfully", okResult.Value);
        }

        [Test]
        public async Task Delete_RemovesExistingEvent()
        {
            var existingEventId = "1";

            _mockEventServices.Setup(s => s.GetAsync(existingEventId)).ReturnsAsync(new Event { Id = existingEventId, Title = "Existing Event" });
            _mockEventServices.Setup(s => s.RemoveAsync(existingEventId)).Returns(Task.CompletedTask);

            var result = await _controller.Delete(existingEventId);

            Assert.IsNotNull(result);
            Assert.IsTrue(result is OkObjectResult);
            var okResult = result as OkObjectResult;
            if (okResult.Value is not null && okResult.Value is { })
            {
                Assert.IsTrue(okResult.Value.GetType().GetProperty("message") != null);
                Assert.AreEqual("Deleted Successfully", okResult.Value.GetType().GetProperty("message").GetValue(okResult.Value));
            }
            else
            {
                Assert.Fail("Result value is null or not of expected type.");
            }
        }
    }
}
