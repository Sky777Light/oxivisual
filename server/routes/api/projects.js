const router = require("express").Router();
const async = require("async");
const fs = require("fs");
const config = require("../../config");
const path = require("path");

const Project = require("../../models/project");
const User = require("../../models/user");

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
        if (done)done(null, '');
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
        if (done)done(err, clientPath);
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
function checkPermissionOnProject(req, res, next) {
    if (req.body._id && req.user.projects.indexOf(req.body._id) >= 0) {
        if (req.session.lastEditProject && req.session.lastEditProject.model && req.session.lastEditProject.model.link && req.session.lastEditProject._id == req.body._id) {
            next(req, res);
        } else {
            Project.findOne({_id: req.body._id}, {_id: 1, model: 1}, function (err, project) {
                if (err || !project ) {
                    return res.json({
                        status: false,
                        message: "permission denied!!!"
                    });
                } else {
                    req.session.lastEditProject = project;
                    //if (project.model && project.model.link) {
                    //    project.data = fs.readSync(path.normalize(config.DIR.UPLOADS + config.DIR.PROJECTS + project.model.link + "/" + config.DIR.SITE_STRUCTURE), 'utf8');
                    //    project.data = project.data ? JSON.parse(project.data) : [];
                    //}
                    next(req, res);
                }
            });
        }
    } else {
        return res.json({
            status: false,
            message: "permission denied"
        });
    }

}

//update project
router.put("/project", function (request, responce) {
    checkPermissionOnProject(request, responce, function (req, res) {
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


            var needToYpdateImg = req.body.image && req.body.image !== project.image,
                updateProj = function (fields) {
                    var _sets = {},
                        exept = ['_id'];

                    for (var _field  in req.body) {
                        if (req.body.hasOwnProperty(_field) && exept.indexOf(_field) < 0) {
                            _sets[_field] = req.body[_field];
                        }
                    }
                    if (fields) for (var _field  in fields) {
                        if (fields.hasOwnProperty(_field) && exept.indexOf(_field) < 0) {
                            _sets[_field] = fields[_field];
                        }
                    }

                    Project.update({_id: req.body._id}, {$set: _sets}, function (err) {
                        return res.json({
                            status: !err,
                            message: err ? (err.message || err) : "Project successfully was changed."
                        });
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
                    updateProj({image: img});
                })
            } else {
                updateProj();
            }


        });
    });
});
//create project
router.post("/project", function (req, res) {
    if (req.user.role === config.USER_ROLE.USER) {
        return res.json({
            status: false,
            message: 'Access denied'
        });
    } else if (!req.body.title || !req.body.link) {
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
                image: req.body.image
            });

            //newProject.owner = (req.user.role === 'super') ? null : req.user._id;

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
                return res.json({
                    status: false,
                    message: err && err.message ? err.message : "model was not saved"
                });
            } else {
                User.update({_id: req.user._id}, {$push: {projects: tempProject._id}}, function (err) {
                    if (!err)req.user.projects.push(tempProject._id);
                    return res.json({
                        status: !err,
                        message: err ? err : "Project was successfully created.",
                        res: tempProject
                    });
                });

            }
        });

    });

});
router.post("/project/model/create", function (req, res) {
    var modelName = req.body.name,
        id_project = req.body.id_project;
    if (!modelName || !id_project || !req.files[config.FILE_UPLOAD_ATTR[0]] || !req.files[config.FILE_UPLOAD_ATTR[1]]) {
        return res.json({
            status: false,
            message: "something got incorect!!!"
        });
    } else {
        var matches = config.FILE_UPLOAD_EXT.concat([]),
            area = {
                _id: id_project,
                name: modelName,
                projFilesDirname: /*modelName + "_" +*/ randomString(),
                created: Date.now(),
                _category: 2,
                images: []
            },
            modelDir = config.DIR.UPLOADS + config.DIR.PROJECTS + area.projFilesDirname,
            imageDir = modelDir + "/" + config.DIR.IMAGES,
            mode = config.FILE_UPLOAD_ACCEC;

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
                    area.images.push((_file.originalname));
                }
            }
        }
        fs.writeFileSync(modelDir + config.DIR.SITE_STRUCTURE, JSON.stringify([area]));

        Project.update({_id: id_project}, {
            $set: {
                "model.link": area.projFilesDirname,
                "model.name": modelName
            }
        }, function (err) {
            return res.json({
                status: !err,
                message: err ? err : "area was created",
                model: {
                    link: area.projFilesDirname,
                    name: modelName,
                    data: area
                }
            });
        });
    }
});
router.post("/project/model/update", function (request, responce) {
    checkPermissionOnProject(request, responce, function (req, res) {
        var body = req.body;
        if (!body.dir || !req.session.lastEditProject || !req.session.lastEditProject.model || !req.session.lastEditProject.model.link) {
            return res.json({
                status: false,
                message: "something got incorect!!!"
            });
        } else {

            var modelDir = config.DIR.UPLOADS + config.DIR.PROJECTS + req.session.lastEditProject.model.link+body.dir.replace(req.session.lastEditProject.model.link,'') + config.DIR.DELIMETER,
                keyses = config.FILE_UPLOAD_ATTR;
            if (req.files) {
                if (!fs.existsSync(path.normalize(modelDir))) {
                    fs.mkdirSync(path.normalize(modelDir), config.FILE_UPLOAD_ACCEC);
                }
                for (var key = 0; key < keyses.length; key++) {
                    var urlSaveFile,
                        keys = keyses[key];
                    if (!req.files[keys] || !req.files[keys].length)continue;
                    switch (keys) {
                        case config.FILE_UPLOAD_ATTR[0]:
                        {
                            urlSaveFile = modelDir;
                            let pathF = path.normalize(urlSaveFile);
                            if (fs.existsSync(pathF)) {
                                for (var u = 0, files = fs.readdirSync(urlSaveFile); u < files.length; u++) {
                                    var file = files[u],
                                        curPath = pathF + "/" + file;
                                    if (fs.lstatSync(curPath).isDirectory()) {
                                    } else {
                                        if (curPath.indexOf(config.FILE_UPLOAD_EXT[0])) {
                                            fs.unlinkSync(curPath);
                                            break;
                                        }
                                    }
                                }
                            } else {
                                fs.mkdirSync(path.normalize(urlSaveFile), config.FILE_UPLOAD_ACCEC);
                            }
                            break;
                        }
                        case config.FILE_UPLOAD_ATTR[1]:
                        {
                            urlSaveFile = modelDir + config.DIR.IMAGES;
                            if (fs.existsSync(urlSaveFile)) {
                                if (req.files[keys])config.help.deleteFolderRecursive(urlSaveFile);
                            } else {
                                fs.mkdirSync(urlSaveFile, config.FILE_UPLOAD_ACCEC);
                            }
                            break;
                        }
                        case config.FILE_UPLOAD_ATTR[2]:
                        {
                            urlSaveFile = modelDir + config.DIR.ALIGN_IMAGES;
                            if (fs.existsSync(urlSaveFile)) {
                                if (req.files[keys])config.help.deleteFolderRecursive(urlSaveFile);
                            } else {
                                fs.mkdirSync(urlSaveFile, config.FILE_UPLOAD_ACCEC);
                            }
                            break;
                        }
                        case config.FILE_UPLOAD_ATTR[3]:
                        {
                            fs.writeFileSync(path.normalize(modelDir + config.DIR.SITE_STRUCTURE), fs.readFileSync(req.files[keys][0].path));
                            break;
                        }
                    }
                    if (!urlSaveFile && !fs.existsSync(urlSaveFile))continue;
                    for (var i = 0; i < req.files[keys].length; i++) {
                        var _file = req.files[keys][i];
                        fs.writeFileSync(urlSaveFile + _file.originalname, fs.readFileSync(_file.path));
                    }
                }
            }

            return res.json({
                status: true,
                message: "project area was updated"
            });
        }
    });
});


//devare user
router.delete("/project", function (request, responce) {
    checkPermissionOnProject(request, responce, function (req, res) {
        Project.findOne({_id: req.body._id}, function (err, project) {
            if (err) {
                return res.json({
                    status: false,
                    message: "No project found"
                });
            } else if (!project) {
                return res.json({
                    status: false,
                    message: "No user found"
                });
            } else {
                Project.remove({_id: req.body._id}, function (er) {
                    if (er) {
                        res.json({
                            status: false,
                            message: err.message
                        });
                    } else {

                        req.session.lastEditProject = null;
                        if (project.image)saveImage(false, project.image);
                        if (project.model && project.model.link)config.help.deleteFolderRecursive(config.DIR.UPLOADS + config.DIR.PROJECTS + project.model.link, true);

                        User.update({_id: req.user._id},
                            {$pull: {projects: {$in: [req.body._id]}}}
                            , function (err) {
                                console.log('User was updated', err);
                                if (!err && req.user.projects.indexOf(req.body._id) > -1)req.user.projects.splice(req.user.projects.indexOf(req.body._id), 1);
                                res.json({
                                    status: !err,
                                    message: err ? err.message : "Project was deleted"
                                });
                            }
                        );
                    }
                });

            }
        });
    });
});

module.exports = router;
