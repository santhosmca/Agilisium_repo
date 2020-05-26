var express = require("express");
var router = express.Router();

var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb+srv://root:root@cluster0-9ees9.azure.mongodb.net/test?retryWrites=true&w=majority";

let DBNAME = "wallettracker";
let COLLECTION = "wallet";

router.get("/", function (req, res, next) {
    res.json('My wallet APP is running');
})

//  Get all date Router
router.get("/get", function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(DBNAME);
    dbo
      .collection(COLLECTION)
      .find()
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
        db.close();
      });
  });
});

// Insert Router

router.post("/post", function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(DBNAME);
    dbo.collection(COLLECTION).insertOne(req.body, function (err, result) {
      if (err) throw err;
      res.json(result);
      db.close();
    });
  });
});

// Delete Router
router.delete("/delete/:id", function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(DBNAME);    
    var ids = { transactionId: req.param };
    dbo.collection(COLLECTION).deleteOne(ids, function (err, result) {
      if (err) throw err;
      res.json(result);
      db.close();
    });
  });
});

//  update by id Router
router.put("/update/:id", function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(DBNAME);
    var myquery = { transactionId: req.params.id };
    var newvalues = {
      $set: {
        description: req.body.description,
        paymentMode: req.body.paymentMode,
        date: req.body.date,
        cost: req.body.cost,
      },
    };
    dbo
      .collection(COLLECTION)
      .updateOne(myquery, newvalues, function (err, result) {
        if (err) throw err;
        res.json(result);
        db.close();
      });
  });
});

//  update get single record 
router.get("/getbyid/:id", function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(DBNAME);
    var query = { transactionId: req.params.id };
    dbo
      .collection(COLLECTION)
      .find(query)
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
        db.close();
      });
  });
});

module.exports = router;
