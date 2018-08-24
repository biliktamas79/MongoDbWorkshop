namespace MongoDbWorkshop
{
    public static class BsonDocumentDemo
    {
        public static void Insert(IMongoDatabase database)
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

            for (int x = 0; x < 100; x++)
            {
            collection.InsertOne(document);
            }
        }

        public static void Query(IMongoDatabase database)
        {
            var collection = database.GetCollection<BsonDocument>("fuszenecker");

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