"use strict";
exports.__esModule = true;
var es6_promise_1 = require("es6-promise");
var insertDocument = function (db) {
    return new es6_promise_1.Promise(function (resolve, reject) {
        console.log("\n---- insertDocument ----");
        // Get the documents collection
        var collection = db.collection("fuszenecker");
        // Insert some documents
        var objects = [];
        // Create array of 10 docs
        for (var i = 0; i < 10; ++i) {
            objects.push({
                i: "Index " + i,
                value: i,
                created: new Date(),
                createdBy: {
                    name: "Fuszenecker Róbert",
                    phone: "+36-90-400-400"
                }
            });
        }
        // Bulk insert documents
        collection.insertMany(objects, function (error, result) {
            if (error) {
                reject(error);
            }
            else {
                console.log("Inserted " + result.result.n + " documents into the collection");
                resolve(true);
            }
        });
    });
};
exports.insertDocument = insertDocument;
