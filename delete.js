"use strict";
exports.__esModule = true;
var es6_promise_1 = require("es6-promise");
var deleteAll = function (db) {
    return new es6_promise_1.Promise(function (resolve, _reject) {
        console.log("\n---- deleteAll ----");
        // Get the documents collection
        var collection = db.collection("fuszenecker");
        // Find all
        collection
            .deleteMany({})
            .then(function () { return resolve(true); });
    });
};
exports.deleteAll = deleteAll;
