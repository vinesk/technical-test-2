const mongoose = require("mongoose");
const { MONGO_URL } = require("./config.js");

async function connectToMongoDB() {
  try {
    if (!MONGO_URL) {
      throw new Error("MongoDB URL is not defined");
    }

    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("CONNECTED OK");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit process with failure
  }
}

mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
  process.exit(1);
});

// Initialize connection
connectToMongoDB();

module.exports = db;
