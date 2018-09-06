import { Db, MongoError } from "mongodb"
import { Promise } from "es6-promise"

const queryAll = (db: Db) => {
    return new Promise<boolean>((resolve, reject) => {
        console.log("\n---- queryAll ----")

        // Get the documents collection
        const collection = db.collection("fuszenecker");

        // Find all
        collection
            .find({})

            .forEach(result => {
                console.log(`Result: ${JSON.stringify(result)}`)
            }, error => { 
                if (error && error.message) {
                    console.log("Error: " + error.message) 
                    reject(error.message)
                } else {
                    resolve(true)
                }
            })
    });
}

const queryFilter1 = (db: Db) => {
    return new Promise<boolean>((resolve, reject) => {
        console.log("\n---- queryFilter1 ----")

        // Get the documents collection
        const collection = db.collection("fuszenecker");

        // Find elements that are greater than 10
        collection
            .find({ value: { $gt: 10}})
            .sort({ value: -1 /* DESC */})
            .limit(10)
            .project({ _id: false, i: true, value: true, "createdBy.name": true })

            .forEach(result => {
                console.log(`Result: ${JSON.stringify(result)}`)
            }, error => { 
                if (error && error.message) {
                    console.log("Error: " + error.message) 
                    reject(error.message)
                } else {
                    resolve(true)
                }
            })
    });
}

const queryFilter2 = (db: Db) => {
    return new Promise<boolean>((resolve, reject) => {
        console.log("\n---- queryFilter2 ----")

        // Get the documents collection
        const collection = db.collection("fuszenecker");

        const filter = {
            $and: [
                { value: { $gt: 15}},
                { value: { $lt: 20}},
            ]
        }
        

        // Find elements that are greater than 15 and less than 20
        collection
            .find(filter)
            .project({ _id: false, i: true, value: true })

            .forEach(result => {
                console.log(`Result: ${JSON.stringify(result)}`)
            }, error => { 
                if (error && error.message) {
                    console.log("Error: " + error.message) 
                    reject(error.message)
                } else {
                    resolve(true)
                }
            })
    });
}


export {
    queryAll,
    queryFilter1,
    queryFilter2
}