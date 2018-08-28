import { Db, MongoError } from "mongodb"
import { Promise } from "es6-promise"

const queryAll = (db: Db) => {
    return new Promise<boolean>((resolve, _reject) => {
        console.log("\n---- queryAll ----")

        // Get the documents collection
        const collection = db.collection("fuszenecker");

        // Find all
        collection
            .find({})
            .limit(10)
            .project({ _id: false, i: true })
            .forEach((result) => {
                console.log(`Result: ${JSON.stringify(result)}`)
            }, (err) => { 
                if (err && err.message) console.log("Error: " + err.message) 
                resolve(true)
            })

    });
}

const queryFilter = (db: Db) => {
    return new Promise<boolean>((resolve, _reject) => {
        console.log("\n---- queryFilter ----")

        // Get the documents collection
        const collection = db.collection("fuszenecker");

        // Find all
        collection
            .find({ value: { $gt: 5}})
            .forEach((result) => {
                console.log(`Result: ${JSON.stringify(result)}`)
            }, (err) => { 
                if (err && err.message) console.log("Error: " + err.message) 
                resolve(true);
            })
    });
}

export {
    queryAll,
    queryFilter
}