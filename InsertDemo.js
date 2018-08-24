"use strict";
exports.__esModule = true;
var es6_promise_1 = require("es6-promise");
var insertDocument = function (db) {
    return new es6_promise_1.Promise(function (resolve, reject) {
        // Get the documents collection
        var collection = db.collection("fuszenecker");
        // Insert some documents
        var objects = [];
        for (var i = 0; i < 100; ++i) {
            objects.push({
                i: "Index " + i,
                value: i,
                created: new Date()
            });
        }
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
