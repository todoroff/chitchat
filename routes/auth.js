const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const Validator = require("validatorjs");
const User = require("../models/User");

module.exports = function authRouter(io, socket, { action, payload }, cb) {
  try {
    switch (action) {
      case "signUp":
        signUp(io, socket, payload, cb);
        return;
      case "signIn":
        signIn(io, socket, payload, cb);
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

  const response = {
    user: {
      id: user.id
    }
  };

  await setSession(socket.request.session, "isLoggedIn", true);

  cb(response);
}

async function signIn(io, socket, payload, cb) {
  if (socket.request.session.isLoggedIn) {
    cb({
      error: {
        type: "validationError",
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

  const response = {
    user: {
      id: user.id
    }
  };

  await setSession(socket.request.session, "isLoggedIn", true);

  cb(response);
}

function setSession(session, key, value) {
  session[key] = value;
  session.touch();
  return new Promise((resolve, reject) => {
    session.save(function(err) {
      if (!err) {
        resolve();
      } else {
        reject(err);
      }
    });
  });
}
