const passport = require("passport");
const router = require("express").Router();
var jwt = require("jwt-simple");

var config = require("../../config");

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
                message: "Email or password is incorrect."
            });
        }

        req.login(user, function (err) {
            if (err) {
                throw err;
            }

            res.json({
                status: true,
                message: "Login success.",
                token: user.token
            });
        });
    })(req, res, next);
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

//create superuser
router.post("/superuser", function (req, res) {
    User.remove({ email: req.body.email }, function (err) {
        if (err) {
            throw err;
        }
    });

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) dd='0'+dd
    if(mm<10) mm='0'+mm
    today = dd+'.'+mm+'.'+yyyy;

    var tempUser = {
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        avatar: req.body.avatar || '',
        status: 'superuser',
        created: today,
        active: true,
        projects: [],
        users: []
    };

    new User(tempUser).save(function (err, user) {
        if (err) {
            throw err;
        }

        User.find({_id: { $ne: user._id }}, function (err, users) {
            user.users = users;
            user.token = "JWT " + jwt.encode({_id: user._id, email: user.email}, config.security.secret);

            user.save(function (err, user) {
                if (err) {
                    throw err;
                }

                req.login(user, function (err) {
                    if (err) {
                        throw err;
                    }

                    res.json({
                        status: true,
                        message: "Signup success.",
                        res: user
                    });
                });
            });
        });

    });
});

module.exports = router;
