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
    public class AttendanceController_UnitTest
    {
        private AttendanceController _controller;
        private Mock<IAttendanceServices> _mockAttendanceServices;

        [SetUp]
        public void Setup()
        {
            _mockAttendanceServices = new Mock<IAttendanceServices>();
            _controller = new AttendanceController(_mockAttendanceServices.Object);
        }

        [Test]
        public async Task Get_ReturnsListOfAttendance()
        {
            var fakeAttendance = new List<Attendance>
            {
                new Attendance { Id = "1", IsAttended=true, UserId="1",EventId="1"},
                new Attendance { Id = "2", IsAttended=false, UserId="2",EventId="1" }
            };

            _mockAttendanceServices.Setup(s => s.GetAsync()).ReturnsAsync(fakeAttendance);

            var result = await _controller.Get();

            Assert.IsNotNull(result);
            Assert.IsInstanceOf<List<Attendance>>(result);
            CollectionAssert.AreEqual(fakeAttendance, result);
        }

        [Test]
        public async Task SubmitAttendance_Success_ReturnsOk()
        {
            // Arrange
            var attendances = new List<Attendance> { new Attendance(), new Attendance() };
            _mockAttendanceServices.Setup(services => services.SubmitAttendance(attendances)).ReturnsAsync(true);

            // Act
            var result = await _controller.SubmitAttendance(attendances);

            // Assert
            Assert.IsInstanceOf<OkResult>(result);
        }

        [Test]
        public async Task SubmitAttendance_Failure_ReturnsStatusCode500()
        {
            var attendances = new List<Attendance> { new Attendance(), new Attendance() };
            _mockAttendanceServices.Setup(services => services.SubmitAttendance(attendances)).ReturnsAsync(false);

            var result = await _controller.SubmitAttendance(attendances);

            Assert.IsInstanceOf<ObjectResult>(result);
            var objectResult = result as ObjectResult;
            Assert.AreEqual(500, objectResult.StatusCode);
        }

        [Test]
        public async Task SubmitAttendance_Exception_ReturnsStatusCode500()
        {
            var attendances = new List<Attendance> { new Attendance(), new Attendance() };
            _mockAttendanceServices.Setup(services => services.SubmitAttendance(attendances)).ThrowsAsync(new Exception("Test exception"));

            var result = await _controller.SubmitAttendance(attendances);

            Assert.IsInstanceOf<ObjectResult>(result);
            var objectResult = result as ObjectResult;
            Assert.AreEqual(500, objectResult.StatusCode);
        }
    }
}
