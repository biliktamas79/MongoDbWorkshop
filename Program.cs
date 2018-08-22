using System;
using MongoDB.Bson;
using MongoDB.Driver;

namespace MongoDbWorkshop
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");

            var client = new MongoClient("mongodb://bpvdeva2web1:27017");
            var database = client.GetDatabase("demo");

            BsonDocumentDemo(database).Wait();
        }

        private static void BsonDocumentDemo(IMongoDatabase database)
        {
            var collection = database.GetCollection<BsonDocument>("fuszenecker");

            var document = new BsonDocument
            {
                { "name", "MongoDB" },
                { "type", "Database" },
                { "count", 1 },
                { "info", new BsonDocument
                    {
                        { "x", 203 },
                        { "y", 102 }
                    }}
            };

            collection.InsertOneAsync(document);

            var result = collection.Find(new BsonDocument()).FirstOrDefault();
            Console.WriteLine(result.ToString());

            var cursor = collection.Find(new BsonDocument()).ToCursor();
            foreach (var item in cursor.ToEnumerable())
            {
                Console.WriteLine(item);
            }

            var filter = Builders<BsonDocument>.Filter.Eq("i", 71);
            var cursor2 = collection
                .Find(filter)
                .Sort(Builders<BsonDocument>.Sort.Descending("i"))
                .ToCursor();
                
            foreach (var item in cursor2.ToEnumerable())
            {
                Console.WriteLine(item);
            }
        }
    }
}
