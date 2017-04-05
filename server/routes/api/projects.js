const router = require("express").Router();
const async = require("async");
var fs = require("fs");

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
        if(avatar){
            var filePath = './resources' + avatar;
            fs.unlinkSync(filePath);
        }
        done(null, '');
        return;
    }

    if(avatar){
        var filePath = './resources' + avatar;
        fs.unlinkSync(filePath);
    }

    var imageTypeRegularExpression = /\/(.*?)$/;

    var crypto = require('crypto');
    var seed = crypto.randomBytes(20);
    var uniqueSHA1String = crypto.createHash('sha1').update(seed).digest('hex');

    var imageBuffer = decodeBase64Image(image);
    var userUploadedFeedMessagesLocation = 'resources/uploads/img/projects/';

    var uniqueRandomImageName = 'image-' + uniqueSHA1String; //uniqueSHA1String;
    var imageTypeDetected = decodeBase64Image(image).type.match(imageTypeRegularExpression);
    var userUploadedImagePath  = userUploadedFeedMessagesLocation + uniqueRandomImageName + '.' + imageTypeDetected[1];
    var clientPath  = '/uploads/img/projects/' + uniqueRandomImageName + '.' + imageTypeDetected[1];

    fs.writeFile(userUploadedImagePath, imageBuffer.data, 'base64', function(err){
        console.log('DEBUG - feed:message: Saved to disk image attached by user:', userUploadedImagePath);
        done(err, clientPath);
    });
};

router.get("/project", function (req, res) {
    async.waterfall([
        function (done) {
            User.findOne({ _id: req.user._id }, function (err, user) {
                var tempUser = {
                    _id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    secondName: user.secondName,
                    created: user.created,
                    role: user.role,
                    projects: [],
                    active: user.active,
                    avatar: user.avatar
                };

                done(err, tempUser);
            })
        },
        function (user, done) {
            if(user.role === 'super'){
                User.find({}, function (err, users) {
                    user.users = users;
                    done(err, user);
                })
            } else if( user.role === 'admin'){
                User.find( {$or: [ { parent: user._id }, { _id: user._id }] }, function (err, users) {
                    user.users = users;
                    done(err, user);
                })
            } else{
                done(null, user);
            }
        }
    ], function (err, user) {
        if (err) {
            throw err;
        }

        res.json({
            status: true,
            res: user
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
        
        user.firstName = req.body.firstName || user.firstName;
        user.secondName = req.body.secondName || user.secondName;

        if(req.body.avatar !== user.avatar){
            saveImage(req.body.avatar, user.avatar, function(err, img){
                if (err) {
                    throw err;
                }
                user.avatar = img;
                user.save(function (err, user) {
                    if (err) {
                        throw err;
                    }
                    res.json({
                        status: true,
                        res: user,
                        message: "User successfully was changed."
                    })
                });
            })
        } else {
            user.save(function (err, user) {
                if (err) {
                    throw err;
                }
                res.json({
                    status: true,
                    res: user,
                    message: "User successfully was changed."
                })
            });
        }


    });
});

//create project
router.post("/project", function (req, res) {
    if(req.user.role === 'user'){
        return res.json({
            status: false,
            message: 'Access denied'
        });
    }

    if (!req.body.title || !req.body.link) {
        return res.json({
            status: false,
            message: "Empty fields."
        });
    }


    async.waterfall([
        function (done) {
            
            var newProject = new Project({
                title: req.body.title,
                link: req.body.link,
                owner: req.user._id,
                created: req.body.created,
                image: req.body.image,
                published: false
            });

            if(req.user.role === 'super' )
                newProject.owner = null;
            if(req.user.role === 'admin' )
                newProject.owner = req.user._id;
            if(req.user.role === 'user' )
                newProject.owner = req.user.parent;
            
            if(req.body.image){
                saveImage(req.body.image, null, function(err, img){
                    newProject.image = img;
                    done(err, newProject);
                })
            } else {
                done(null, newProject);
            }
        }
    ],  function (err, project) {

        if (err) {
            throw err;
        }

        project.save(function (err, tempProject) {
            if (err) {
                throw err;
            }
            res.json({
                status: true,
                res: tempProject,
                message: "Project was successfully created."
            })
        });

    });

});

//delete user
router.delete("/user", function (req, res) {
    User.findOne({ _id: req.body._id }, function (err, user) {
        return;
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
