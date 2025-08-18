import express from "express";
import passport from "passport";
import { userSignup, userSignPost } from "../controllers/user.js";

const router = express.Router({ mergeParams: true });


router.get("/signup", userSignup);

router.post("/signup", userSignPost);

export default router;