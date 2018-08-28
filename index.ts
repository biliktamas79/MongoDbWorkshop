import { MongoClient } from "mongodb"
import { insertDocument } from "./insert"
import { queryAll, queryFilter2, queryFilter1 } from "./query"
import { deleteAll } from "./delete";
import { createIndex } from "./indexField";
import { aggregate, mapreduce, distinct } from "./aggregation";

// Connection URL
const url = "mongodb://bpvdeva2web1.dlgroup.com:27017"

// Database Name
const dbName = "demo"

// Use connect method to connect to the server
MongoClient.connect(url, 
    { useNewUrlParser: true },
    (err, client) => {
        if (err) {
            console.log("Error: " + err.message)
        } else {
            console.log("==== Connected successfully to server. ====")

            const db = client.db(dbName)

            // Clean up the database
            deleteAll(db)

            // Then fill it with test data
            .then(() => insertDocument(db))

            // Create index on them
            .then(() => createIndex(db))

            // Some example query
            .then(() => queryAll(db))
            .then(() => queryFilter1(db))
            .then(() => queryFilter2(db))

            // Aggregation and map-reduce
            .then(() => distinct(db))
            .then(() => aggregate(db))
            .then(() => mapreduce(db))

            // Close the connection
            .then(() => {
                console.log("\n==== Closing connection ====")
                client.close()
            })

            // In case of an error...
            .catch((error) => {
                console.log(`\n==== Closing connection with error: ${error} ====`)
                client.close()
            })
        }
    });