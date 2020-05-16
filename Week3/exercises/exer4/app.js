
const assert = require("assert");
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/";
const dbName = "new_world";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const methodForm = (methodName) => {
  client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    methodName(db, function () {
      client.close();
    });
  });
};


const insertDocuments = function (db, callback) {
  const collection = db.collection("city");

  collection.insertMany(
    [
      {
        name: "Bursa",
      },
      {
        name: "Diyarbakir",
      },
      {
        name: "Mersin",
      },
    ],
    function (err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the city");
      callback(result);
    }
  );
};

const updateDocument = function (db, callback) {
  // Get the documents collection
  const collection = db.collection("city");
  // Update document where a is 2, set b equal to 1
  collection.updateOne(
    {
      name: "Bursa",
    },
    {
      $set: {
        name: "Istanbul",
      },
    },
    function (err, result) {
      assert.equal(err, null);
      assert.equal(0, result.result.n);
      console.log("Updated the document with your wishes");
      callback(result);
    }
  );
};

const removeDocument = function (db, callback) {
  // Get the documents collection
  const collection = db.collection("city");
  // Delete document where a is 3
  collection.deleteOne({ name: "Bursa" }, function (err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Removed the document with your wishes");
    callback(result);
  });
};

methodForm(insertDocuments);
methodForm(updateDocument);
methodForm(removeDocument);
