const router = require("express").Router();
const async = require("async");
const config = require("../../config");
var fs = require("fs");

const User = require("../../models/user");
const Project = require("../../models/project");

var saveImage = function (image, avatar, done) {
    function decodeBase64Image(dataString){
        var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        var response = {};

        if (matches.length !== 3)
            return new Error('Invalid input string');

        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');

        return response;
    }
    if(!image){
        if(avatar && avatar.length){
            var filePath = './resources' + avatar;
            fs.unlinkSync(filePath);
        }
        done(null, '');
        return;
    }

    if(avatar && avatar.length){
        var filePath = './resources' + avatar;
        fs.unlinkSync(filePath);
    }

    var imageTypeRegularExpression = /\/(.*?)$/;

    var crypto = require('crypto');
    var seed = crypto.randomBytes(20);
    var uniqueSHA1String = crypto.createHash('sha1').update(seed).digest('hex');

    var imageBuffer = decodeBase64Image(image);
    var userUploadedFeedMessagesLocation = 'resources/uploads/img/';

    var uniqueRandomImageName = 'image-' + uniqueSHA1String; //uniqueSHA1String;
    var imageTypeDetected = decodeBase64Image(image).type.match(imageTypeRegularExpression);
    var userUploadedImagePath  = userUploadedFeedMessagesLocation + uniqueRandomImageName + '.' + imageTypeDetected[1];
    var clientPath  = '/uploads/img/' + uniqueRandomImageName + '.' + imageTypeDetected[1];

    fs.writeFile(userUploadedImagePath, imageBuffer.data, 'base64', function(err){
        console.log('DEBUG - feed:message: Saved to disk image attached by user:', userUploadedImagePath);
        done(err, clientPath);
    });
};


router.get("/user/:id", function (req, res) {

    var id = (req.params.id === 'undefined') ? req.user._id : req.params.id;

    async.waterfall([
        function (done) {
            User.findOne({ _id: id }, {
                'email' :1,
                'firstName': 1,
                'secondName': 1,
                'created': 1,
                'role': 1,
                'projects': 1,
                'users': 1,
                'active': 1,
                'avatar': 1
            }, function (err, user) {
                if (!user) {
                    done({status: false, message: "No user found."}, null);
                    return;
                }
                done(err, user);
            })
        },
        function (user, done) {
            if(user.role === config.USER_ROLE.SUPER){
                Project.find({}, function (err, projects) {
                    user.projects = projects;
                    done(err, user);
                })
            } else if( user.role === config.USER_ROLE.ADMIN){
                Project.find( {owner: user._id}, function (err, projects) {
                    user.projects = projects;
                    done(err, user);
                })
            } else if( user.role === config.USER_ROLE.USER){
                Project.find( {owner: user.parent}, function (err, projects) {
                    user.projects = projects;
                    done(err, user);
                })
            } else {
                done(null, user);
            }
        },
        function (user, done) {
            User.find((user.role === config.USER_ROLE.SUPER?{}:(user.role === config.USER_ROLE.ADMIN?{$or: [ { parent: user._id }, { _id: user._id }] }:{_id:-1})), {
                'email' :1,
                'firstName': 1,
                'secondName': 1,
                'created': 1,
                'role': 1,
                'projects': 1,
                'users': 1,
                'active': 1,
                'avatar': 1
            }, function (err, users) {
                user.users = users;
                done(err, user);
            });
        }
    ], function (err, user) {

        if (err) {
            if( err.message ){
                return res.json(err);
            } else {
                throw err;
            }
        }

        res.json({
            status: true,
            res: user
        });
    });

});

//update user
router.put("/user", function (req, res) {

    async.waterfall([
        function (done) {
            User.findOne({ _id: req.body._id }, {}, function (err, user) {

                if (err) {
                    done({status: false, message: "Undefined error, no user found."}, null);
                    return;
                }

                if (!user) {
                    done({status: false, message: "No user found."}, null);
                    return;
                }

                //if password changed
                if(req.body.oldPassword) {
                    if (!user.comparePassword(req.body.oldPassword)) {
                        done({status: false, message: "Oops! Wrong password."}, null);
                        return;
                    }
                    user.password = req.body.password;
                    user.save(function (err) {
                        if (err) {
                            done(err, null);
                            return;
                        }
                        done({status: true, message: "Password successfully was changed."}, null);
                        return;
                    });
                } else if (req.body.active !== user.active){
                    //if user deactivated/activated
                    user.active = req.body.active;
                    user.save(function (err, user) {
                        if (err) {
                            done(err, null);
                            return;
                        }

                        done({status: true, message: user.active ? "User successfully was activated." : "User successfully was deactivated."}, null);
                        return;
                    });
                } else if (req.body.email !== user.email){
                    //if email changed
                    User.findOne({ email: req.body.email }, function (err, result) {
                        if(err){
                            done(err, null);
                            return;
                        }

                        if (result) {
                            done({status: false, email: true, message: "That email is already taken."}, null);
                            return;
                        }
                        user.email = req.body.email;

                        done(null, user);
                    });
                } else {
                    done(null, user);
                }

            });

        },
        function (user, done) {
            user.firstName = req.body.firstName || user.firstName;
            user.secondName = req.body.secondName || user.secondName;

            if(req.body.avatar !== user.avatar){
                saveImage(req.body.avatar, user.avatar, function(err, img){
                    user.avatar = img;
                    done(err,user);
                })
            } else {
                done(null,user);
            }
        }

    ], function (err, resUser) {
        if(err){
            if(err.message){
                return res.json(err);
            } else {
                throw err;
            }
        }

        resUser.save(function (err, user) {
            if (err) {
                throw err;
            }
            return res.json({
                status: true,
                res: user,
                message: "User successfully was changed."
            })
        });
    });
});

//create user
router.post("/user", function (req, res) {
    if(req.user.role === 'user' || (req.user.role === 'admin' && req.body.role !== 'user')){
        return res.json({
            status: false,
            message: 'Access denied'
        });
    }else if (!req.body.email || !req.body.password  || !req.body.firstName || !req.body.secondName) {
        return res.json({
            status: false,
            message: "Empty fields."
        });
    }else{
        async.waterfall([
            function (done) {
                User.findOne({ email: req.body.email }, function (err, user) {
                    if(err){
                        return done(err, null);
                        return res.json({
                            status: false,
                            err: err,
                            message: "Error"
                        });
                    }else if (user) {
                        return done({status: false, email: true, message: "That email is already taken."}, null);
                    }else{

                        var newUser = new User({
                            email: req.body.email,
                            password: req.body.password,
                            firstName: req.body.firstName,
                            secondName: req.body.secondName,
                            parent: req.user._id,
                            avatar: req.body.avatar
                        });
                        done(null, newUser);
                    }

                });
            },
            function (user, done) {

                if(user.avatar){
                    saveImage(user.avatar, null, function(err, img){
                        user.avatar = img;
                        done(err, user);
                    })
                } else {
                    done(null, user);
                }

            }
        ],  function (err, user) {
            if (err) {
                return res.json({
                    status: false,
                    err: err,
                    message: "Error."
                })
            }else{
                user.save(function (err, user) {
                    if (err) {
                        return res.json({
                            status: true,
                            err: err,
                            message: "User was unsuccessfully created."
                        })
                    }else{
                        return res.json({
                            status: true,
                            res: user,
                            message: "User was successfully created."
                        });
                    }


                });
            }

        });
    }
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
    }).remove().exec(function (err) {
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
