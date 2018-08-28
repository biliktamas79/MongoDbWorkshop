import { Db, MongoError } from "mongodb"
import { Promise } from "es6-promise"

const queryAll = (db: Db) => {
    return new Promise<boolean>((resolve, _reject) => {

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
                if (err) console.log("Error: " + err.message) 
            })

        resolve(true);
    });
}

export {
    queryAll
}