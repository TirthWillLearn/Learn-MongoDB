// 01-setup.js
const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

(async () => {
  try {
    await client.connect(); // case-sensitive: must be .connect(), not .Connect()
    console.log("✅ Connected to MongoDB");

    const db = client.db("bookstore"); // "bookstore" is case-sensitive
    console.log("📚 Using database:", db.databaseName);
  } catch (err) {
    console.error("❌ Error connecting:", err);
  } finally {
    await client.close(); // also case-sensitive: must be .close()
    console.log("🔒 Connection closed");
  }
})();
