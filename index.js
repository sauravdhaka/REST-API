const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userRouter = require("./Routes/User");
const { User } = require("./models/User");
const {sanitizeUser , cookieExtractor} = require('./services/common')
const jwt = require('jsonwebtoken')
const session = require("express-session");
const JwtStrategy = require("passport-jwt").Strategy;
const cookieParser = require('cookie-parser');



const jwt_sceret = "lalala";

const opts = {};
opts.jwtFromRequest = cookieExtractor
opts.secretOrKey = jwt_sceret; 

const app = express(); // creating server
app.get("/", (req, res) => {
  res.json("HELLO");
});
app.use(cookieParser())
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

passport.use(
    "jwt",
    new JwtStrategy(opts, async function (jwt_payload, done) {
      console.log({ jwt_payload });
      try {
        const user = await User.findById(jwt_payload.id);
        if (user) {
          return done(null, sanitizeUser(user)); // This calls the serializer
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
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
