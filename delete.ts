import { Db, MongoError } from "mongodb"
import { Promise } from "es6-promise"

const deleteAll = (db: Db) => {
    return new Promise<boolean>((resolve, _reject) => {
        console.log("\n---- deleteAll ----")

        // Get the documents collection
        const collection = db.collection("fuszenecker");

        // Find all
        collection
            .deleteMany({})
            .then(() => resolve(true))
    });
}

export {
    deleteAll
}