import { Db, MongoError } from "mongodb"
import { Promise } from "es6-promise"

const insertDocument = (db: Db) => {
  return new Promise<boolean>((resolve, reject) => {

    // Get the documents collection
    const collection = db.collection("fuszenecker");
    // Insert some documents

    var objects = []

    for (let i = 0; i < 100; ++i) {
      objects.push({
        i: "Index " + i,
        value: i,
        created: new Date(),
        createdBy: {
            name: "Fuszenecker Róbert",
            phone: "+36-90-400-400"
        }
      })
    }

    collection.insertMany(objects, (error, result) => {
      if (error) {
        reject(error);
      } else {
        console.log(`Inserted ${result.result.n} documents into the collection`);
        resolve(true);
      }
    })
  });
}


export {
  insertDocument,
}