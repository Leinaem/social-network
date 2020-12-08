const mongoose = require("mongoose");

const UserConnectionSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  userId: {
      type: String,
      required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("UserConnection", UserConnectionSchema);
