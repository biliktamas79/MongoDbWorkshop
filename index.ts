import { MongoClient, Db } from "mongodb"
import { insertDocument } from "./insert"
import { queryAll } from "./query"

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
            console.log("Connected successfully to server.")

            const db = client.db(dbName)

            insertDocument(db)
            .then(() => queryAll(db))
            .then(() => client.close())
        }
    });