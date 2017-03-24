const passport = require("passport");
const router = require("express").Router();

const User = require("../../models/user");

router.all("/", function (req, res, next) {
    res.json({
        status: true,
        message: "Info about auth."
    });
});

router.post("/login", function (req, res, next) {
    passport.authenticate("local", function (err, user, info) {
        if (err) {
            throw err;
        }

        if (!user) {
            return res.json({
                status: false,
                message: info.message
            });
        }

        req.login(user, function (err) {
            if (err) {
                throw err;
            }

            res.json({
                status: true,
                message: info.message,
                token: user.token
            });
        });
    })(req, res, next);
});

router.post("/signup", function (req, res) {
    if (!req.body.username || !req.body.password) {
        return res.json({
            status: false,
            message: "Empty fields."
        });
    }

    User.findOne({ username: req.body.username }, function (err, user) {
        if (err) {
            throw err;
        }

        if (user) {
            return res.json({
                status: false,
                message: "That username is already taken."
            });
        }

        new User({
            username: req.body.username,
            password: req.body.password
        }).save(function (err, user) {
                if (err) {
                    throw err;
                }

                res.json({
                    status: true,
                    message: "Signup success."
                });
            });
    });
});

router.post("/logout", function (req, res) {
    if (!req.isAuthenticated()) {
        return res.json({
            status: false,
            message: "You are not logged in."
        });
    }

    req.user.token = "";

    req.user.save(function () {
        req.logout();

        res.json({
            status: true,
            message: "Logout success."
        });
    });
});

module.exports = router;
