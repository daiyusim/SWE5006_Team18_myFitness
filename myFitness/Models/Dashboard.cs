namespace myFitness.Models
{
    public class Dashboard
    {
        public Profile? Profile { get; set; }
        public List<EventRegistration>? AttendedEvent { get; set; }

        public List<EventRegistration>? AbsentEvent { get; set; }

        public List<EventRegistration>? RegisteredEvent { get; set; }

        public List<EventRegistration>? EventHistory { get; set; }

        public List<AttendedEventCategoryViewModel>? AttendedEventCategory { get; set; }

    }
}
