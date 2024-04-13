using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace myFitness.Models
{
    [BsonIgnoreExtraElements]
    public class Event
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("title")]
        public string Title { get; set; }

        [BsonElement("description")]
        public string Description { get; set; }

        [BsonElement("startDateTime")]
        public DateTime StartDateTime { get; set; }

        [BsonElement("endDateTime")]
        public DateTime EndDateTime { get; set; }

        [BsonElement("capacity")]
        public int Capacity { get; set; }

        [BsonElement("totalRegistered")]
        public int TotalRegistered { get; set; }

        [BsonElement("status")]
        public string Status { get; set; }

        [BsonElement("category")]
        public string Category { get; set; }

        [BsonElement("registrationEndDate")]
        public DateTime RegistrationEndDate { get; set; }

        [BsonElement("isDeleted")]
        public bool IsDeleted { get; set; }

        [BsonElement("createdOn")]
        public DateTime CreatedOn { get; set; }

        [BsonElement("createdBy")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string CreatedBy { get; set; }


        [BsonElement("address")]
        public string Address { get; set; }

        [BsonElement("lat")]
        public double Lat { get; set; }

        [BsonElement("long")]
        public double Long { get; set; }
        public List<EventRegistration>? Registrations { get; set; }

        public string? CreatedByName { get; set; }   
    }
}
