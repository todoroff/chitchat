require("dotenv").config();
const fs = require("fs");
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const connectDB = require("./utils/db");
const MongoStore = require("connect-mongo")(session);
const path = require("path");

connectDB();

const httpsOptions = {
  key: fs.readFileSync(path.resolve(process.env.KEY)),
  cert: fs.readFileSync(path.resolve(process.env.CERT))
};
const app = express();
const server = require("https").createServer(httpsOptions, app);
const io = require("socket.io")(server);

app.use(express.json());
const sessionOptions = {
  store: new MongoStore({
    mongooseConnection: mongoose.connection
    //touchAfter: 3600 * 24
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  rolling: true,
  unset: "destroy",
  cookie: {
    path: "/",
    httpOnly: true,
    secure: true,
    maxAge: 604800 * 1000,
    sameSite: "lax"
  }
};
const withSessions = session(sessionOptions);
app.use(withSessions);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
  });
}

//import Socket.IO 'routes'
const authRoute = require("./routes/auth");
const chatRoute = require("./routes/chat");

io.use(function(socket, next) {
  withSessions(socket.request, socket.request.res, next);
});

io.on("connection", function(socket) {
  //pipe events to the proper 'route'
  socket.on("auth", function(request, cb) {
    authRoute(io, socket, request, cb);
  });
  socket.on("chat", function(request) {
    chatRoute(request);
  });
});

const port = process.env.PORT || 8443;

server.listen(port, function() {
  console.log(`listening on ${port}`);
});
