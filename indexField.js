"use strict";
exports.__esModule = true;
var es6_promise_1 = require("es6-promise");
var createIndex = function (db) {
    return new es6_promise_1.Promise(function (resolve, _reject) {
        console.log("\n---- createIndex ----");
        // Get the documents collection
        var collection = db.collection("fuszenecker");
        // Create composite index of [id AND createdBy.name]
        collection
            .createIndex({ id: 1, "createdBy.name": 1 })
            .then(function (result) {
            console.log("Create Index result: " + result);
            resolve(true);
        });
    });
};
exports.createIndex = createIndex;
