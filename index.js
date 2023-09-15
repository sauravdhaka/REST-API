const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userRouter = require("./Routes/User");
const { User } = require("./models/User");
const {sanitizeUser} = require('./services/common')
const jwt = require('jsonwebtoken')
const session = require("express-session");

const jwt_sceret = "lalala";

const app = express(); // creating server
app.get("/", (req, res) => {
  res.json("HELLO");
});
app.use(
    session({
      secret: 'keyboard cat',
      resave: false, // don't save session if unmodified
      saveUninitialized: false, // don't create session until something stored
    })
  );
app.use(passport.authenticate("session"));

app.use(express.json()); // body parser


app.use("/user", userRouter.router); // user routes for CURD oprations

passport.use(
  "local",
  new LocalStrategy({ usernameField: "username" }, async function (
    username,
    password,
    done
  ) {
    try {
      const user = await User.findOne({ username: username }).exec();
      if (!user) {
        done(null, false, { message: "invalid credentials" });
      } else if (user.password === password) {
        const token = jwt.sign(sanitizeUser(user), jwt_sceret);

        done(null, { id: user.id, token });
      }
    } catch (err) {
      done(err);
    }
  })
);

// this creates session variable req.user on being called from callbacks
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    console.log("serialized", user);
    return cb(null, { id: user.id });
  });
});

// this changes session variable req.user when called from authorized request

passport.deserializeUser(function (user, cb) {
  console.log("deserialized", user);
  process.nextTick(function () {
    return cb(null, user);
  });
});

// data base connection
async function main() {
  await mongoose.connect(
    "mongodb+srv://sauravdhaka456:saurav19145@cluster0.4jawenj.mongodb.net/"
  );
  console.log("database connected");
}

// calling the function
main().catch((err) => console.log(err));

//listining the server on port 5000
app.listen(5000, () => {
  console.log("server is listing on port : 5000");
});
