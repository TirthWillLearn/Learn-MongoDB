// 03-find.js
// Reading docs (find)
// --------------------
// - find(): returns a cursor (use .toArray() to get results)
// - findOne(): returns the first matching document or null
// - projection: choose fields (case-sensitive field names!)
// - if no match → find() returns empty array, findOne() returns null

const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected");

    const db = client.db("bookstore");
    const books = db.collection("books");

    // find all (limit to 5 for demo)
    const allBooks = await books.find().limit(5).toArray();
    console.log("📚 All books:", allBooks);

    // findOne by exact match (case-sensitive!)
    // { author: "james clear" } will NOT match { author: "James Clear" }
    const oneBook = await books.findOne({ author: "James Clear" });
    console.log("📘 One book:", oneBook);

    // projection → include only certain fields
    const onlyTitlePrice = await books
      .find({}, { projection: { title: 1, price: 1, _id: 0 } })
      .toArray();
    console.log("🎯 Projection (title+price):", onlyTitlePrice);
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
    console.log("🔒 Closed");
  }
}
run();
