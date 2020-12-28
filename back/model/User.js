const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  admin: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("user", UsersSchema);
