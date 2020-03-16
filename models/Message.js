const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  date: {
    type: Date,
    default: Date.now
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room"
  }
});

module.exports = mongoose.model("Message", MessageSchema);
