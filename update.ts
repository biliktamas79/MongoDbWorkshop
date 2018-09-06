import { Db, MongoError } from "mongodb"
import { Promise } from "es6-promise"

const update1 = (db: Db) => {
    return new Promise<boolean>((resolve, reject) => {
        console.log("\n---- update1 ----")

        // Get the documents collection
        const collection = db.collection("fuszenecker");

        // Find all
        collection
            .updateMany(
                { value: { $gt: 5 }},
                { value: 5 },
                error => { 
                    if (error && error.message) {
                        console.log("Error: " + error.message) 
                        reject(error.message)
                    } else {
                        resolve(true)
                    }
                }
            )
    });
}

export {
    update1,
}

