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


//update project
router.put("/project", function (req, res) {
    Project.findOne({ _id: req.body._id }, function (err, project) {
        if (err) {
            return res.json({
                status: false,
                message: "Undefined error, no project found."
            });
        }

        if (!project) {
            return res.json({
                status: false,
                message: "No project found."
            });
        }

        //if project deactivated/activated
        if(req.body.published !== project.published){
            project.published = req.body.published;
            project.save(function (err, project) {
                if (err) {
                    throw err;
                }

                res.json({
                    status: true,
                    res: project,
                    message: project.published ? "Project successfully was activated." : "Project successfully was deactivated."
                })
            });
            return;
        }


        project.title = req.body.title || project.title;

        if(req.body.image !== project.image){
            saveImage(req.body.image, project.image, function(err, img){
                if (err) {
                    throw err;
                }
                project.image = img;
                project.save(function (err, project) {
                    if (err) {
                        throw err;
                    }
                    res.json({
                        status: true,
                        res: project,
                        message: "Project successfully was changed."
                    })
                });
            })
        } else {
            project.save(function (err, project) {
                if (err) {
                    throw err;
                }
                res.json({
                    status: true,
                    res: project,
                    message: "Project successfully was changed."
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

            newProject.owner = (req.user.role === 'super') ? null : req.user._id;
            
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
router.delete("/project", function (req, res) {
    Project.findOne({ _id: req.body._id }, function (err, project) {
        if (err) {
            throw err;
        }

        if (!project) {
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
            message: "Project was successfully deleted"
        });
    });
});

module.exports = router;
