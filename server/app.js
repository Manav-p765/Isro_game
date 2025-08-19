import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import methodOverride from "method-override";
import ejsmate from "ejs-mate";
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "connect-flash";
import passport from "passport";
import LocalStrategy from "passport-local";
import path from "path";
import { fileURLToPath } from "url";

import userRoute from "./routes/user.js";
import User from "./models/user.js";

// const dbUrl = process.env.ATLASURL;

// async function main() {
//     await mongoose.connect(dbUrl);
// }
// main()
//     .then(() => console.log("connection was successful"))
//     .catch((err) => console.log(err));

const app = express();

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Views setup (pointing to clients/views)
app.engine("ejs", ejsmate); // optional, gives layout/partials support
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../clients/views"));

// Passport (commented for now until you configure it)
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("users/login");
});

app.get("/signup", (req, res) => {
  res.render("users/signup");
});

// user Routes
app.use("/", userRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
