import { Db, MongoError } from "mongodb"
import { Promise } from "es6-promise"

const createIndex = (db: Db) => {
    return new Promise<boolean>((resolve, _reject) => {
        console.log("\n---- createIndex ----")

        // Get the documents collection
        const collection = db.collection("fuszenecker");

        // Create composite index of [id AND createdBy.name]
        collection
            .createIndex({ id: 1, "createdBy.name": 1 })
            .then(result => {
                console.log(`Create Index result: ${result}`)
                resolve(true)
            })
    });
}

export {
    createIndex
}