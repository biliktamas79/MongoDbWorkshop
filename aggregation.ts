import { Db } from "mongodb"
import { Promise } from "es6-promise"

// See also: https://docs.mongodb.com/manual/reference/sql-aggregation-comparison/

const distinct = (db: Db) => {
    return new Promise<boolean>((resolve, reject) => {
        console.log("\n---- distinct ----")

        // Get the documents collection
        const collection = db.collection("fuszenecker");

        // Select distinct value of creator
        collection
            .distinct("createdBy.name", {})
            .then(value => {
                console.log(`Result: ${value}`)
                resolve(true)
            })
            .catch(error => reject(error))
    });
}

const aggregate = (db: Db) => {
    return new Promise<boolean>((resolve, reject) => {
        console.log("\n---- aggregate ----")

        // Get the documents collection
        const collection = db.collection("fuszenecker");

        // Summarize the values of *.value
        collection
            .aggregate([
                { $group: { _id: "Summa summarum", total: { $sum: "$value" }}}
            ])
            .on("close", () => resolve(true))
            .on("error", error => reject(error))
            .each((_error, data) => {
                if (data) console.log(`Result: ${JSON.stringify(data)}`)
            })
    });
}

declare function emit(k, v);

const mapreduce = (db: Db) => {
    return new Promise<boolean>((resolve, reject) => {
        console.log("\n---- mapreduce ----")

        // Get the documents collection
        const collection = db.collection("fuszenecker");

        // Do some map-reduce
        // { "i": "Index 17", "value": 17, ... }
        // { "i": "Index 16", "value": 16, ... }
        // { "i": "Index 18", "value": 18, ... }
        // { "i": "Index 15", "value": 15, ... }

        collection
            .mapReduce(
                // Map
                function() {
                    emit(this.i, this.value * 100)
                },
                // Reduce
                (key, values) => values.reduce((accumulator, current) => accumulator + current),
                { out: "fuszenecker-reduced" }
            )
            .then(() => {
                console.log("Collection 'fuszenecker-reduced' created.")
                resolve(true)
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
    });
}

export {
    distinct,
    aggregate,
    mapreduce
}