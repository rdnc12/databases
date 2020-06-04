const assert = require("assert");
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/";
const dbName = "new_world";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDb = async (query) => {
  try {
    await client.connect();
    const db = await client.db(dbName);

    await query(db, async () => {
      await client.close();
    });
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

const insertDocuments =  (db, callback) => {
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
     (err, result)=> {
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
  collection.deleteOne({ name: "Bursa" }, function (err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Removed the document with your wishes");
    callback(result);
  });
};

seedDb(insertDocuments);
seedDb(updateDocument);
seedDb(removeDocument);
