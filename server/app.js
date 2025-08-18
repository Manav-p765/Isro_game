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

// Your own files (make sure to include the .js extension in ES Modules!)
import userRoute from "./routes/user.js";
import User from "./models/user.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));