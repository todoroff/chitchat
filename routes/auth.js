const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const Validator = require("validatorjs");
const User = require("../models/User");

module.exports = function authRouter(io, socket, { action, payload }, cb) {
  switch (action) {
    case "signUp":
      signUp(io, socket, payload, cb);
      return;
  }
};

async function signUp(io, socket, payload, cb) {
  var response;
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
        content: validator.errors.all()
      }
    });
    return;
  }

  const { name, email, password } = payload;

  try {
    let user = await User.findOne({ email });

    if (user) {
      cb({
        error: {
          type: "validationError",
          content: { email: ["A user with that email already exists."] }
        }
      });
      return;
    }

    const avatar = gravatar.url(email, {
      s: "128",
      r: "pg",
      d: "wavatar"
    }, true);

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

    //set logged in session
    socket.request.session.isLoggedIn = true;
    socket.request.session.touch();
    socket.request.session.save(function(err) {
      if (!err) {
        if (cb) {
          cb(response);
        }
      } else {
        cb({
          error: {
            type: "serverError",
            content: { server: [err] }
          }
        });
      }
    });
  } catch (err) {
    console.error(err.message);
    cb({
      error: {
        type: "serverError",
        content: { server: ["A user with that email already exists."] }
      }
    });
  }
}
