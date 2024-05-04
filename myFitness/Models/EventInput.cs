namespace myFitness.Models
{
    public class EventInput
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public int Capacity { get; set; }
        public string Status { get; set; }
        public string Category { get; set; }
        public DateTime RegistrationEndDate { get; set; }
        public string CreatedBy { get; set; }
        public string Address { get; set; }
        public double Lat { get; set; }
        public double Long { get; set; }
    }

}
