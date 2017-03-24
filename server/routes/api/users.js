const router = require("express").Router();

const User = require("../../models/user");

router.get("/", function (req, res) {
    User.findOne({
        _id: req.user._id
    }).exec(function (err, user) {
            if (err) {
                throw err;
            }

            res.json({
                status: true,
                res: user
            });
        });

});

router.post("/profile", function (req, res) {
    User.findOne({ username: req.body.username }, function (err, user) {
        if (err) {
            return res.json({
                status: false,
                message: "Undefined error, no user found."
            });
        }

        if (!user) {
            return res.json({
                status: false,
                message: "No user found."
            });
        }

        if (!user.validPassword(req.body.oldPassword)) {
            return res.json({
                status: false,
                message: "Oops! Wrong password."
            });
        }

        req.body.password = User.generateHash(req.body.newPassword);

        User.update({
            _id: user._id
        }, {
            $set: req.body
        }, function (err, affected) {
            res.json({
                status: true,
                affected: affected,
                message: "Profile change success."
            });
        });
    });
});

module.exports = router;
