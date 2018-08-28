import { MongoClient, Db } from "mongodb"
import { insertDocument } from "./insert"
import { queryAll, queryFilter2, queryFilter1 } from "./query"
import { deleteAll } from "./delete";
import { createIndex } from "./indexField";

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

            deleteAll(db)
            .then(() => insertDocument(db))
            .then(() => createIndex(db))
            .then(() => queryAll(db))
            .then(() => queryFilter1(db))
            .then(() => queryFilter2(db))
            .then(() => {
                console.log("\n==== Closing connection ====")
                client.close()
            })
        }
    });