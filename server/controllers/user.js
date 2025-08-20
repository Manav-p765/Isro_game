import User from "../models/user.js";

export const userSignup = async (req, res) => {
    res.render("../clients/views/users/signup.ejs");
};

export const userSignPost = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });

        const registereduser = await User.register(newUser, password);

        req.logIn(registereduser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "welcome to Travelbase");
            res.redirect("/");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};