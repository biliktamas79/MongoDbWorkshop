"use strict";
exports.__esModule = true;
var es6_promise_1 = require("es6-promise");
var queryAll = function (db) {
    return new es6_promise_1.Promise(function (resolve, reject) {
        console.log("\n---- queryAll ----");
        // Get the documents collection
        var collection = db.collection("fuszenecker");
        // Find all
        collection
            .find({})
            .forEach(function (result) {
            console.log("Result: " + JSON.stringify(result));
        }, function (error) {
            if (error && error.message) {
                console.log("Error: " + error.message);
                reject(error.message);
            }
            else {
                resolve(true);
            }
        });
    });
};
exports.queryAll = queryAll;
var queryFilter1 = function (db) {
    return new es6_promise_1.Promise(function (resolve, reject) {
        console.log("\n---- queryFilter1 ----");
        // Get the documents collection
        var collection = db.collection("fuszenecker");
        // Find elements that are greater than 10
        collection
            .find({ value: { $gt: 10 } })
            .sort({ value: -1 /* DESC */ })
            .limit(10)
            .project({ _id: false, i: true, value: true, "createdBy.name": true })
            .forEach(function (result) {
            console.log("Result: " + JSON.stringify(result));
        }, function (error) {
            if (error && error.message) {
                console.log("Error: " + error.message);
                reject(error.message);
            }
            else {
                resolve(true);
            }
        });
    });
};
exports.queryFilter1 = queryFilter1;
var queryFilter2 = function (db) {
    return new es6_promise_1.Promise(function (resolve, reject) {
        console.log("\n---- queryFilter2 ----");
        // Get the documents collection
        var collection = db.collection("fuszenecker");
        var filter = {
            $and: [
                { value: { $gt: 15 } },
                { value: { $lt: 20 } },
            ]
        };
        // Find elements that are greater than 15 and less than 20
        collection
            .find(filter)
            .project({ _id: false, i: true, value: true })
            .forEach(function (result) {
            console.log("Result: " + JSON.stringify(result));
        }, function (error) {
            if (error && error.message) {
                console.log("Error: " + error.message);
                reject(error.message);
            }
            else {
                resolve(true);
            }
        });
    });
};
exports.queryFilter2 = queryFilter2;
