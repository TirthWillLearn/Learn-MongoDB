// 03-find.js
const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017"; // local MongoDB
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("bookstore");
    const books = db.collection("books");

    // find all books
    const allBooks = await books.find().toArray();
    console.log("📚 All books:", allBooks);

    // find one book by author
    const oneBook = await books.findOne({ author: "James Clear" });
    console.log("📘 One book:", oneBook);

    // projection: show only title & price
    const projection = await books
      .find({}, { projection: { title: 1, price: 1, _id: 0 } })
      .toArray();
    console.log("🎯 Projection (title+price):", projection);
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
    console.log("🔒 Connection closed");
  }
}

run();
