import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import methodOverride from "method-override";
import ejsmate from "ejs-mate";
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "connect-flash";
import { request } from "http";
import passport from "passport";
import LocalStrategy from "passport-local";
dotenv.config();

// Your own files (make sure to include the .js extension in ES Modules!)
import userRoute from "./routes/user.js";
import User from "./models/user.js";

const dbUrl = process.env.ATLASURL;

//mongoose connection setup
main()
    .then(() => {
        console.log("connection was successful");
    })
    .catch((err) => {
        console.log(err)
    });

async function main() {
    await mongoose.connect(dbUrl);
};


const app = express();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

app.use(cors());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session middleware
app.use(
  session({
    secret: "supersecretkey",   // use a strong secret in production (from .env)
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.ATLASURL,
      touchAfter: 24 * 3600 // reduce writes, update only once in 24h
    }),
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", (req, res) => {
  res.send("ISRO Spacecraft Builder API is running 🚀");
});

//user Routes
app.use("/", userRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
