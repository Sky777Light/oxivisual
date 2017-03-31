const router = require("express").Router();

const User = require("../../models/user");

router.get("/user", function (req, res) {
    User.findOne({
        _id: req.user._id
    })
    .populate({
        path: "users"
    })
    .populate({
        path: "projects"
    })
    .exec(function (err, user) {
        if (err) {
            throw err;
        }
        var tempUser = {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            secondName: user.secondName,
            created: user.created,
            projects: user.projects,
            users: user.users,
            status: user.status,
            active: user.active,
            avatar: user.avatar
        };

        res.json({
            status: true,
            res: tempUser
        });
    });

});

//update user
router.put("/user", function (req, res) {
    User.findOne({ _id: req.body._id }, function (err, user) {
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

        //if password changed
        if(req.body.oldPassword) {
            if (!user.comparePassword(req.body.oldPassword)) {
                return res.json({
                    status: false,
                    message: "Oops! Wrong password."
                });
            }
            user.password = req.body.password;
            user.save(function (err, user) {
                if (err) {
                    throw err;
                }

            return res.json({
                    status: true,
                    message: "Password successfully was changed."
                });
            });
        }

        //if email changed
        if(req.body.email !== user.email){
            User.findOne({ email: req.body.email }, function (err, result) {
                if (err) {
                    throw err;
                }

                if (result) {
                    return res.json({
                        status: false,
                        message: "That email is already taken."
                    });
                }
                user.email = req.body.email;

                user.save(function (err) {
                    if (err) {
                        throw err;
                    }
                });
            });
        }
        //if user deactivated/activated
        if(req.body.active !== user.active){
            user.active = req.body.active;
            user.save(function (err, user) {
                if (err) {
                    throw err;
                }

                res.json({
                    status: true,
                    message: user.active ? "User successfully was activated." : "User successfully was deactivated."
                })
            });
            return;
        }
        
        user.firstName = req.body.firstName || user.firstName;
        user.secondName = req.body.secondName || user.secondName;
        user.avatar = req.body.avatar || user.avatar;

        user.save(function (err, user) {
            if (err) {
                throw err;
            }
            res.json({
                status: true,
                message: "User successfully was changed."
            })
        });
    });
});

//create user
router.post("/user", function (req, res) {

    if (!req.body.email || !req.body.password || !req.body.status || !req.body.firstName || !req.body.secondName) {
        return res.json({
            status: false,
            message: "Empty fields."
        });
    }
    
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            throw err;
        }

        if (user) {
            return res.json({
                status: false,
                message: "That email is already taken."
            });
        }

        if(!req.body.created){
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();

            if(dd<10) {
                dd='0'+dd
            }

            if(mm<10) {
                mm='0'+mm
            }

            today = dd+'.'+mm+'.'+yyyy;
        }

        new User({
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            secondName: req.body.secondName,
            avatar: req.body.avatar || '',
            status: req.body.status,
            created: req.body.created || today,
            active: req.body.active || true,
            projects: [],
            users: []
        }).save(function (err, user) {
            if (err) {
                throw err;
            }

            User.find({status: 'superuser'}, function (err, users) {
                for(var i = 0; i < users.length; i++){
                    users[i].users.push(user);
                    users[i].save(function (err) {
                        if (err) throw err;
                    });
                }
            });
            return res.json({
                status: true,
                res: user,
                message: "User was successfully created."
            });
        });

    });
});

//delete user
router.delete("/user", function (req, res) {
    User.findOne({ _id: req.body._id }, function (err, user) {
        if (err) {
            throw err;
        }

        if (!user) {
            return res.json({
                status: false,
                message: "No user found"
            });
        }
    }).remove().exec(function (err, user) {
        if (err) {
            throw err;
        }

        res.json({
            status: true,
            message: "User was successfully deleted"
        });
    });
});

module.exports = router;
