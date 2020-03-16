const User = require("../models/User");

module.exports = async function userRouter(
  io,
  socket,
  { method, payload },
  cb
) {
  try {
    switch (method) {
      case "getUsers":
        await getUsers(io, socket, payload, cb);
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

async function getUsers(io, socket, payload, cb) {
  const users = await User.find().select("-password -email -date");
  cb(users);
}

