using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace myFitness.Models
{
    [BsonIgnoreExtraElements]
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("emailAddress")]
        public string EmailAddress { get; set; }

        [BsonElement("password")]
        public string Password { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("contact")]
        public string Contact { get; set; }

        [BsonElement("createdBy")]
        public int CreatedBy { get; set; }

        [BsonElement("createdOn")]
        public DateTime CreatedOn { get; set; }
        public Profile? Profile { get; set; }


        public User()
        {
            CreatedBy = 1;
            CreatedOn = DateTime.Now;
        }
    }
}
