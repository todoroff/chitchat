const User = require("../models/User");
const { Room, PublicRoom, DmRoom } = require("../models/Room");
const Message = require("../models/Message");

module.exports = async function chatRouter(
  io,
  socket,
  { method, payload },
  cb
) {
  try {
    switch (method) {
      case "sendMessage":
        await sendMessage(io, socket, payload, cb);
        return;
      case "getRoom":
        await getRoom(io, socket, payload, cb);
        return;
      case "getRooms":
        await getRooms(io, socket, payload, cb);
        return;
      case "getMessages":
        await getMessages(io, socket, payload, cb);
        return;
    }
  } catch (err) {
    console.error(err);
    cb({
      error: {
        type: "serverError",
        list: { server: ["Internal server error"] }
      }
    });
  }
};

async function sendMessage(io, socket, payload, cb) {
  // socket.join(payload.room);
  const newMsg = new Message({
    text: payload.text,
    sender: socket.request.session.userId,
    room: payload.room
  });
  const message = await newMsg.save();
  io.to("chitchat").emit("message", message);
  cb();
}

async function getRoom(io, socket, payload, cb) {
  const room = await PublicRoom.findOne({ name: payload.name });
  if (!room) {
    cb({
      error: {
        type: "notFoundError",
        list: { notFound: [`Room "${payload.name}" not found.`] }
      }
    });
    return;
  }
  cb(room);
}

async function getRooms(io, socket, payload, cb) {
  const rooms = await PublicRoom.find();
  cb(rooms);
}

async function getMessages(io, socket, payload, cb) {
  const room = await Room.findById(payload.room);
  const messages = await Message.find({ room: payload.room });
  cb(messages);
}
