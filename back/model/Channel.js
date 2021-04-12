const mongoose = require("mongoose");

const ChannelSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  editable: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("channel", ChannelSchema);
