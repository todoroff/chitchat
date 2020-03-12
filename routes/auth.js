const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const setSession = require("../utils/setSession");
const Validator = require("validatorjs");
const User = require("../models/User");

module.exports = async function authRouter(
  io,
  socket,
  { method, payload },
  cb
) {
  try {
    switch (method) {
      case "signUp":
        await signUp(io, socket, payload, cb);
        return;
      case "signIn":
        await signIn(io, socket, payload, cb);
        return;
      case "signOut":
        await signOut(io, socket, payload, cb);
        return;
      case "getLoggedInUser":
        await getLoggedInUser(io, socket, payload, cb);
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

async function signUp(io, socket, payload, cb) {
  if (socket.request.session.isLoggedIn) {
    cb({
      error: {
        type: "authenticationError",
        list: { authentication: ["You're already logged in."] }
      }
    });
    return;
  }

  const rules = {
    name: "required",
    email: "required|email",
    password: "min:6",
    password2: "min:6|same:password"
  };

  const validator = new Validator(payload, rules);
  if (validator.fails()) {
    cb({
      error: {
        type: "validationError",
        list: validator.errors.all()
      }
    });
    return;
  }

  const { name, email, password } = payload;

  let user = await User.findOne({ email });

  if (user) {
    cb({
      error: {
        type: "validationError",
        list: { email: ["A user with that email already exists."] }
      }
    });
    return;
  }

  const avatar = gravatar.url(
    email,
    {
      s: "128",
      r: "pg",
      d: "wavatar"
    },
    true
  );

  user = new User({
    name,
    email,
    avatar,
    password
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  await user.save();
  cb();
}

async function signIn(io, socket, payload, cb) {
if (socket.request.session.isLoggedIn) {
    cb({
      error: {
        type: "authenticationError",
        list: { authentication: ["You're already logged in."] }
      }
    });
  }
  const rules = {
    email: "required|email",
    password: "min:6"
  };
  const validator = new Validator(payload, rules);
  if (validator.fails()) {
    cb({
      error: {
        type: "validationError",
        list: validator.errors.all()
      }
    });
    return;
  }

  const { email, password } = payload;

  let user = await User.findOne({ email });

  const authErrorResponse = {
    error: {
      type: "authenticationError",
      list: { authentication: ["Wrong email or password."] }
    }
  };

  if (!user) {
    cb(authErrorResponse);
    return;
  }

  const passMatch = await bcrypt.compare(password, user.password);

  if (!passMatch) {
    cb(authErrorResponse);
    return;
  }

  await setSession(socket.request.session, "isLoggedIn", true);
  await setSession(socket.request.session, "userId", user.id);

  user.status = "Online";
  await user.save();
  cb();
}

async function signOut(io, socket, payload, cb) {
  await User.findOneAndUpdate(
    { _id: socket.request.session.userId },
    { status: "Offline" }
  );

  await new Promise((resolve, reject) => {
    socket.request.session.destroy(function(err) {
      if (!err) {
        resolve();
      } else {
        reject(err);
      }
    });
  });
  cb();
}

async function getLoggedInUser(io, socket, payload, cb) {
  if (socket.request.session.userId && socket.request.session.isLoggedIn) {
    const user = await User.findById(socket.request.session.userId).select(
      "-password"
    );
    cb(user);
  } else {
    cb({
      error: {
        type: "authenticationError",
        list: { authentication: ["Not signed in."] }
      }
    });
  }
}
