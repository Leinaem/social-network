const mongoose = require("mongoose");
const dbUrl = 'mongodb+srv://root:root@cluster0.lug3q.mongodb.net/superchat?retryWrites=true&w=majority';

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;
