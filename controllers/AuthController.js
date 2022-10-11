const bcrypt = require("bcryptjs");
const User = require("../models/User"); // User model
const Player = require("../models/Player"); // User model
const Joi = require("@hapi/joi");
const { registerSchema, loginSchema } = require("../utils/userValidations");
const defaultAvatar = require("../models/Default Male.json");

exports.isAuth = (req, res, next) => {
    const currSessionUser = req.session.user;
    if (currSessionUser) {
        next();
    } else {
        err = res
            .status(401)
            .json("You Need to Be Logged in to do this. Access Denied ");
        return err;
    }
};

exports.updateUser = (req, res) => {
    // Check for existing user
    User.findOneAndUpdate({ email: req.body.user.email }, { $set: req.body.user }, { upsert: true, new: true },
        function(err, updatedUser) {
            if (err) {
                res.send(err);
            } else if (updatedUser) {
                req.session.user = updatedUser; // Auto saves session data in mongo store
                res.status(200).send(updatedUser); // sends cookie with sessionID automatically in response
            }
        }
    );
};

exports.registerUser = (req, res) => {
    const { name, email, password } = req.body;

    const result = registerSchema.validate({ name, email, password });
    if (!result.error) {
        // Check for existing user
        User.findOne({ email: email }).then((user) => {
            if (user) return res.status(400).json("User already exists");

            //New User created
            const newUser = new User({
                email,
                password,
                name,
            });

            //New Player created with default male avatar and the new user email
            const newPlayer = new Player({
                userEmail: email,
                avatar: defaultAvatar,
            });

            newUser.player = newPlayer;

            //Password hashing
            bcrypt.genSalt(12, (err, salt) =>
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;

                    newUser.password = hash;

                    // Save User
                    newUser
                        .save()
                        .then(res.json("Successfully Registered"))
                        .catch((err) => console.log(err));
                })
            );
        });
    } else {
        res.status(422).json(result.error.details[0].message);
    }
};

exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    // basic validation
    const result = loginSchema.validate({ email, password });
    if (!result.error) {
        //check for existing user
        User.findOne({ email }).then((user) => {
            if (!user) return res.status(400).json("Incorrect Email or Password");

            // Validate password
            bcrypt.compare(password, user.password).then((isMatch) => {
                if (!isMatch)
                    return res.status(400).json("Incorrect Email or Password");

                const currSessionUser = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    player: user.player,
                };
                req.session.user = currSessionUser; // Auto saves session data in mongo store

                res.json(currSessionUser); // sends cookie with sessionID automatically in response
            });
        });
    } else {
        console.log(result.error);
        res.status(422).json(result.error.details[0].message);
    }
};

exports.logoutUser = (req, res) => {
    req.session.destroy((err) => {
        // delete session data from store, using sessionID in cookie
        if (err) throw err;
        res.clearCookie("session-id"); // clears cookie containing expired sessionID
        res.send("Logged out successfully");
    });
};

exports.authChecker = (req, res) => {
    const currSessionUser = req.session.user;
    if (currSessionUser) {
        return res.json(currSessionUser);
    } else {
        return res.status(401).json({ msg: "Unauthorized" });
    }
};