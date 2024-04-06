using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace myFitness.Models
{
    [BsonIgnoreExtraElements]
    public class EventRegistration
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("userId")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; }

        [BsonElement("eventId")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string EventId { get; set; }

        [BsonElement("status")]
        public string Status { get; set; }

        [BsonElement("createdOn")]
        public DateTime CreatedOn { get; set; }

        [BsonElement("isAttended")]
        public bool? IsAttended { get; set; }
        public User? User { get; set; }

    }
}
