using myFitness.Models;

namespace myFitness.Services
{
    public class EventBuilder
    {
        private Event _event = new Event();

        public EventBuilder WithTitle(string title)
        {
            _event.Title = title;
            return this;
        }

        public EventBuilder WithDescription(string description)
        {
            _event.Description = description;
            return this;
        }

        public EventBuilder WithStartDateTime(DateTime startDateTime)
        {
            _event.StartDateTime = startDateTime;
            return this;
        }

        public EventBuilder WithEndDateTime(DateTime endDateTime)
        {
            _event.EndDateTime = endDateTime;
            return this;
        }

        public EventBuilder WithCapacity(int capacity)
        {
            _event.Capacity = capacity;
            return this;
        }

        public EventBuilder WithStatus(string status)
        {
            _event.Status = status;
            return this;
        }

        public EventBuilder WithCategory(string category)
        {
            _event.Category = category;
            return this;
        }

        public EventBuilder WithRegistrationEndDate(DateTime registrationEndDate)
        {
            _event.RegistrationEndDate = registrationEndDate;
            return this;
        }

        public EventBuilder WithCreatedBy(string createdBy)
        {
            _event.CreatedBy = createdBy;
            return this;
        }

        public EventBuilder WithAddress(string address)
        {
            _event.Address = address;
            return this;
        }

        public EventBuilder WithLat(double lat)
        {
            _event.Lat = lat;
            return this;
        }

        public EventBuilder WithLong(double @long)
        {
            _event.Long = @long;
            return this;
        }

        public Event Build()
        {
            return _event;
        }
    }

}
