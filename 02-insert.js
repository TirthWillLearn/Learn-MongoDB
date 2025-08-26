// 02-insert.js
const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017"; // local MongoDB
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("bookstore");
    const books = db.collection("books");

    // insertOne → simple
    await books.insertOne({
      title: "Clean Code",
      author: "Robert C. Martin",
      price: 500,
    });
    console.log("📘 Inserted one book");

    // insertMany → ordered vs unordered
    // ----------------------------------
    // By default: ordered = true
    // → means: if one insert fails, MongoDB STOPS and doesn’t insert the rest.
    //
    // If ordered = false
    // → means: MongoDB will continue inserting other docs,
    //   even if one fails (e.g. duplicate key).
    //
    // ordered is NOT case-sensitive (must be boolean true/false).
    //
    // Example: here, one doc has no title (will cause error if title was required in schema),
    // but with ordered: false, the other docs will still be inserted.
    // ----------------------------------

    // insertMany case-sensitivity notes
    //
    // - Field names are case-sensitive. Example:
    //   { title: "Clean Code" }  vs  { Title: "Clean Code" }
    //   These are DIFFERENT fields. MongoDB will happily store both,
    //   but it's bad practice → always be consistent.
    //
    // - Collection names are case-sensitive.
    //   db.collection("books") ≠ db.collection("Books").
    //
    // - Database names are case-sensitive too.
    //   client.db("bookstore") ≠ client.db("Bookstore").
    //
    // - Method names (insertOne, insertMany, find, updateOne, close)
    //   are case-sensitive. insertone(), InsertOne() will fail.
    //

    await books.insertMany(
      [
        { title: "Atomic Habits", author: "James Clear", price: 300 },
        {
          title: "Eloquent JavaScript",
          author: "Marijn Haverbeke",
          price: 400,
        },
        { /* missing title field */ author: "No Title Author", price: 250 },
      ],
      { ordered: false } // 👈 change to true and see difference
    );
    console.log("📚 Inserted many books (with ordered:false)");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
    console.log("🔒 Connection closed");
  }
}

run();
