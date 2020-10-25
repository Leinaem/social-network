require('dotenv').config();
const mongoose = require("mongoose");

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(
      process.env.DB_URL,
      {
        useNewUrlParser: true
      }
    );
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;
