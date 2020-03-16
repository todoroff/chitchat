const mongoose = require("mongoose");
const options = { discriminatorKey: "kind" };

const RoomSchema = new mongoose.Schema({}, options);

const Room = mongoose.model("Room", RoomSchema);

const PublicRoom = Room.discriminator(
  "PublicRoom",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true
      }
    },
    options
  )
);

const DmRoom = Room.discriminator(
  "DmRoom",
  new mongoose.Schema(
    {
      participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
    },
    options
  )
);

module.exports = { Room, PublicRoom, DmRoom };
