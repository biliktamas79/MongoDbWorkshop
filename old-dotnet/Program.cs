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

            BsonDocumentDemo.Insert(database);
        }
    }
}
