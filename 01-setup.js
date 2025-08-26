// 01-setup.js
const { MongoClient } = require("mongodb");

// Change this if you use Atlas
const uri = "mongodb://localhost:27017/";

const client = new MongoClient(uri);

(async () => {
  try {
    await client.connect();
    console.log("✅ MongoDB connected!");

    const db = client.db("bookstore");
    console.log("📚 Using database:", db.databaseName);
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
  } finally {
    await client.close();
    console.log("🔒 Connection closed");
  }
})();
