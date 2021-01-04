const mongoose = require("mongoose");

const MessagesSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  edited: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("messages", MessagesSchema);
