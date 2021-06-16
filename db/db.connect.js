const mongoose = require("mongoose");

const mySecret = process.env["DB_KEY"];

async function initializeDBConnection() {
  try {
    await mongoose.connect(
      `mongodb+srv://Danny:${mySecret}@neoG-cluster.vfgje.mongodb.net/inventory?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("connection succesffulll !");
  } catch (err) {
    console.error("mongoose connection failed....");
  }
}

module.exports = { initializeDBConnection };
