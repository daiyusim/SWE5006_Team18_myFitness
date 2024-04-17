using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using myFitness.Data;
using myFitness.Models;

namespace myFitness.Services
{
    public class EventRegistrationServices : IEventRegistrationServices
    {
        private readonly IMongoCollection<EventRegistration> _registrationCollection;
        private readonly IMongoCollection<Event> _eventCollection;
        private readonly IMongoCollection<Profile> _profileCollection;
        private readonly IEventServices _eventServices;
        public EventRegistrationServices(IOptions<DatabaseSettings> settings, IEventServices eventServices)
        {
            var mongoClient = new MongoClient(settings.Value.Connection);
            var mongoDb = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _registrationCollection = mongoDb.GetCollection<EventRegistration>(settings.Value.Registration);
            _eventCollection = mongoDb.GetCollection<Event>(settings.Value.Events);
            _profileCollection = mongoDb.GetCollection<Profile>(settings.Value.Profile);
            _eventServices = eventServices;
        }

        public async Task<List<EventRegistration>> GetAsync() => await _registrationCollection.Find(_ => true).ToListAsync();

        public async Task<EventRegistration> GetAsync(string id) =>
            await _registrationCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<EventRegistration> GetEventRegistrationByIds(string eventId, string userId) =>
             await _registrationCollection.Find(x => x.UserId == userId && x.EventId == eventId).FirstOrDefaultAsync();
        
        public async Task CreateAsync(EventRegistration newRegistration) =>
            await _registrationCollection.InsertOneAsync(newRegistration);


        public async Task UpdateAsync(string id, EventRegistration updateRegistration) =>
            await _registrationCollection.ReplaceOneAsync(x => x.Id == id, updateRegistration);

        public async Task RemoveAsync(string eventId, string userId)
        {
            var filter = Builders<Event>.Filter.Eq(x => x.Id, eventId);
            var update = Builders<Event>.Update.Inc(x => x.Capacity, +1);

            await _eventCollection.UpdateOneAsync(filter, update);

            var registrationFilter = Builders<EventRegistration>.Filter.And(
                Builders<EventRegistration>.Filter.Eq(x => x.EventId, eventId),
                Builders<EventRegistration>.Filter.Eq(x => x.UserId, userId)
            );

            await _registrationCollection.DeleteOneAsync(registrationFilter);
        }

        public async Task<bool> SubmitAttendance(List<EventRegistration> attendances)
        {
            try
            {
                foreach (var attendance in attendances)
                {
                    await UpdateAsync(attendance.Id, attendance);
                }
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                return false;
            }
        }


        public Task<Dashboard> GetActivitiesByUserId(string userId)
        {
            var attendedEvents = GetEventsForStatus(userId, "Attended");
            var absentEvents = GetEventsForStatus(userId, "Absent");
            var registeredEvents = GetEventsForStatus(userId, "Registered");

            var attendedEventCategories = _registrationCollection
                .AsQueryable()
                .Where(r => r.UserId == userId && r.Status == "Attended")
                .Join(_eventCollection.AsQueryable(),
                      registration => registration.EventId,
                      @event => @event.Id,
                      (registration, @event) => new { Registration = registration, EventCategory = @event.Category })
                .GroupBy(result => result.EventCategory)
                .Select(group => new AttendedEventCategoryViewModel
                {
                    Name = group.Key,
                    Value = group.Count()
                })
                .ToList();

            var dashboard = new Dashboard
            {
                Profile = _profileCollection
                .AsQueryable()
                .Where(r => r.UserId == userId).FirstOrDefault(),
                AttendedEvent = attendedEvents,
                AbsentEvent = absentEvents,
                RegisteredEvent = registeredEvents,
                AttendedEventCategory = attendedEventCategories,
                EventHistory = _registrationCollection
                .AsQueryable()
                .Where(r => r.UserId == userId && r.Status != "Registered")
                .Join(_eventCollection.AsQueryable(),
                      registration => registration.EventId,
                      @event => @event.Id,
                      (registration, @event) => new EventRegistration
                      {
                          Id = registration.Id,
                          UserId = registration.UserId,
                          EventId = registration.EventId,
                          Status = registration.Status,
                          CreatedOn = registration.CreatedOn,
                          IsAttended = registration.IsAttended,
                          Event = @event
                      })
                .ToList()
            };

            return Task.FromResult(dashboard);
        }

        private List<EventRegistration> GetEventsForStatus(string userId, string status)
        {
            return _registrationCollection
                .AsQueryable()
                .Where(r => r.UserId == userId && r.Status == status)
                .Join(_eventCollection.AsQueryable(),
                      registration => registration.EventId,
                      @event => @event.Id,
                      (registration, @event) => new EventRegistration
                      {
                          Id = registration.Id,
                          UserId = registration.UserId,
                          EventId = registration.EventId,
                          Status = registration.Status,
                          CreatedOn = registration.CreatedOn,
                          IsAttended = registration.IsAttended,
                          Event = @event
                      })
                .ToList();
        }

        public async Task RegisterEvent(EventRegistration newRegistration)
        {
            var targetEvent = await _eventServices.GetAsync(newRegistration.EventId);

            if (targetEvent != null)
            {
                bool hasClash = await CheckEventClash(newRegistration.UserId, targetEvent.StartDateTime, targetEvent.EndDateTime);

                if (hasClash)
                {
                    throw new Exception("Sorry, there's a clash with another event");
                }

                try
                {
                    targetEvent.Capacity -= 1;
                    targetEvent.TotalRegistered += 1;
                    await _eventServices.UpdateAsync(targetEvent.Id, targetEvent);
                    await CreateAsync(newRegistration);
                }
                catch (Exception ex)
                {
                    throw new Exception("Failed to register for the event", ex);
                }
            }
            else
            {
                throw new Exception("Event not found");
            }
        }


        public async Task<bool> CheckEventClash(string userId, DateTime eventStartTime, DateTime eventEndTime)
        {
            var registeredEvents = await _registrationCollection.Find(r => r.UserId == userId).ToListAsync();

            foreach (var registration in registeredEvents)
            {
                var eventDetails = await _eventServices.GetAsync(registration.EventId);
                if (eventDetails != null)
                {
                    if ((eventDetails.StartDateTime < eventEndTime && eventDetails.EndDateTime > eventStartTime) ||
                        (eventDetails.StartDateTime >= eventStartTime && eventDetails.StartDateTime < eventEndTime) ||
                        (eventDetails.EndDateTime > eventStartTime && eventDetails.EndDateTime <= eventEndTime))
                    {
                        return true;
                    }
                }
            }

            return false;
        }


    }
}
