const router = require("express").Router();
const config = require("../../config");
const Project = require("../../models/project");

router.all("/", function (req, res) {
    if(req.body.projectDir ){

        var projDir =  config.DIR.UPLOADS+config.DIR.PROJECTS+req.body.projectDir;
        if (!fs.existsSync(projDir+config.DIR.PROJECT_TEMPLATE.HTML)) {

        }
    }else{
        res.json({
            status: false,
            message: "missing project dir or template type"
        });
    }

});

router.post("/project/isactive", function (req, res) {
    if(!req.body.id){
        return res.json({
            status: false,
            message: "forgot something"
        });
    }else {
        Project.findOne({_id: req.body.id}, {_id: 1, "model.link": 1,published:1}, function (err, project) {
            if (err || !project) {
                return res.json({
                    status: false,
                    message: err || "Undefined error, no project found."
                });
            } else {
                return res.json({
                    status: true,
                    project: project
                });
            }
        });
    }

});

module.exports = router;
