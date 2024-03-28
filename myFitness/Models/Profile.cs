using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace myFitness.Models
{
    [BsonIgnoreExtraElements]
    public class Profile
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("userId")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; }

        [BsonElement("height")]
        public double Height { get; set; }

        [BsonElement("weight")]
        public double Weight { get; set; }

        [BsonElement("interests")]
        public List<string> Interests { get; set; }

        [BsonElement("gender")]
        public string Gender { get; set; }

        [BsonElement("goals")]
        public string Goals { get; set; }
    }
}
