"use strict";
exports.__esModule = true;
var es6_promise_1 = require("es6-promise");
var queryAll = function (db) {
    return new es6_promise_1.Promise(function (resolve, _reject) {
        // Get the documents collection
        var collection = db.collection("fuszenecker");
        // Find all
        collection
            .find({})
            .limit(10)
            .project({ _id: false, i: true })
            .forEach(function (result) {
            console.log("Result: " + JSON.stringify(result));
        }, function (err) { return console.log("Error: " + err.message); });
        resolve(true);
    });
};
exports.queryAll = queryAll;
