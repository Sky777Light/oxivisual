const router = require("express").Router();
const async = require("async");
const fs = require("fs");
const config = require("./config");

const Project = require("../../models/project");

var saveImage = function (image, avatar, done) {
    function decodeBase64Image(dataString) {
        var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        var response = {};

        if (matches.length !== 3)
            return new Error('Invalid input string');

        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');

        return response;
    }

    if (!image) {
        if (avatar) {
            var filePath = './resources' + avatar;
            fs.unlinkSync(filePath);
        }
        done(null, '');
        return;
    }

    if (avatar) {
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
    var userUploadedImagePath = userUploadedFeedMessagesLocation + uniqueRandomImageName + '.' + imageTypeDetected[1];
    var clientPath = '/uploads/img/projects/' + uniqueRandomImageName + '.' + imageTypeDetected[1];

    fs.writeFile(userUploadedImagePath, imageBuffer.data, 'base64', function (err) {
        console.log('DEBUG - feed:message: Saved to disk image attached by user:', userUploadedImagePath);
        done(err, clientPath);
    });
};
function randomString(l) {

    var length_ = l || 25,
        chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
    if (typeof length_ !== "number") {
        length_ = Math.floor(Math.random() * chars.length_);
    }
    var str = '';
    for (var i = 0; i < length_; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str + Date.now().toString(32);
}

//update project
router.put("/project", function (req, res) {
    Project.findOne({_id: req.body._id}, function (err, project) {
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


        var needToYpdateImg = req.body.image !== project.image,
            updateProj = function (fields) {
                Object.assign(project, req.body);
                if(fields)for(var f in fields){
                    project[f] = fields[f];
                }

                project.save(function (err, project) {
                    if (err) {
                        return res.json({
                            status: false,
                            res: project,
                            message: err
                        })
                    }
                    res.json({
                        status: true,
                        res: project,
                        message: "Project successfully was changed."
                    })
                });
            };


        if (needToYpdateImg) {
            saveImage(req.body.image, project.image, function (err, img) {
                if (err) {
                    return res.json({
                        status: false,
                        res: project,
                        message: err
                    })
                }
                updateProj({image:img});
            })
        } else {
            updateProj();
        }


    });
});

//create project
router.post("/project", function (req, res) {
    if (req.user.role === 'user') {
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
                image: req.body.image,
                published: false
            });

            newProject.owner = (req.user.role === 'super') ? null : req.user._id;

            if (req.body.image) {
                saveImage(req.body.image, null, function (err, img) {
                    newProject.image = img;
                    done(err, newProject);
                })
            } else {
                done(null, newProject);
            }
        }
    ], function (err, project) {

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


router.post("/project/model/create", function (req, res) {
    var modelName = req.body.name,
        id_project = req.body.id_project;
    if (!modelName || !modelName || !req.files['model[]'] || !req.files['frames[]']) {
        return res.json({
            status: false,
            message: "something got incorect!!!"
        });
    } else {
        var matches = config.FILE_UPLOAD_EXT.concat([]),
            area = {
                name:modelName,
                projFilesDirname:modelName + "_" + randomString(),
                frames:0,
                created:Date.now(),
                images:[]
            },
            modelDir = config.DIR.UPLOADS+config.DIR.PROJECTS+ area.projFilesDirname,
            imageDir = modelDir + config.DIR.IMAGES,
            mode = parseInt("0777", 8);

        if (!fs.existsSync(modelDir)) {
            fs.mkdirSync(modelDir, mode);
        }
        if (!fs.existsSync(imageDir)) {
            fs.mkdirSync(imageDir, mode);
        }
        for (var keys in req.files) {
            for (var i = 0; i < req.files[keys].length; i++) {
                var _file = req.files[keys][i];
                if (_file.originalname.match(matches[0])) {
                    fs.writeFileSync(modelDir + "/" + _file.originalname, fs.readFileSync(_file.path));
                    area.destination = _file.originalname;
                } else if (_file.mimetype.match(matches[1])) {
                    fs.writeFileSync(imageDir + "/" + _file.originalname, fs.readFileSync(_file.path));
                    area.frames++;
                    area.images.push(_file.originalname);
                }
            }
        }
        fs.writeFileSync(modelDir + config.DIR.SITE_STRUCTURE, JSON.stringify([area]));

        Project.update({_id: id_project}, {$set: {"model.link": area.projFilesDirname, "model.name": modelName}}, function (err) {
            return res.json({
                status: !err,
                message: err ? err : "model was saved",
                model: {
                    link: area.projFilesDirname,
                    name: modelName,
                    data:area
                }
            });
        });
    }
});
router.post("/project/model/update", function (req, res) {
    var modelName = req.body.name,
        id_project = req.body.id_project;
    if (!modelName || !modelName || !req.files['model[]'] || !req.files['frames[]']) {
        return res.json({
            status: false,
            message: "something got incorect!!!"
        });
    } else {
        var matches = config.FILE_UPLOAD_EXT.concat([]),
            area = {
                name:modelName,
                projFilesDirname:modelName + "_" + randomString(),
                frames:0,
                created:Date.now(),
                images:[]
            },
            modelDir = config.DIR.UPLOADS+config.DIR.PROJECTS+ area.projFilesDirname,
            imageDir = modelDir + config.DIR.IMAGES,
            mode = parseInt("0777", 8);

        if (!fs.existsSync(modelDir)) {
            fs.mkdirSync(modelDir, mode);
        }
        if (!fs.existsSync(imageDir)) {
            fs.mkdirSync(imageDir, mode);
        }
        for (var keys in req.files) {
            for (var i = 0; i < req.files[keys].length; i++) {
                var _file = req.files[keys][i];
                if (_file.originalname.match(matches[0])) {
                    fs.writeFileSync(modelDir + "/" + _file.originalname, fs.readFileSync(_file.path));
                    area.destination = _file.originalname;
                } else if (_file.mimetype.match(matches[1])) {
                    fs.writeFileSync(imageDir + "/" + _file.originalname, fs.readFileSync(_file.path));
                    area.frames++;
                    area.images.push(_file.originalname);
                }
            }
        }
        fs.writeFileSync(modelDir + config.DIR.SITE_STRUCTURE, JSON.stringify([area]));

        Project.update({_id: id_project}, {$set: {"model.link": area.projFilesDirname, "model.name": modelName}}, function (err) {
            return res.json({
                status: !err,
                message: err ? err : "model was saved",
                model: {
                    link: area.projFilesDirname,
                    name: modelName,
                    data:area
                }
            });
        });
    }
});


//delete user
router.delete("/project", function (req, res) {
    Project.findOne({_id: req.body._id}, function (err, project) {
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
