const router = require("express").Router();
const config = require("../../config");
const fs = require("fs");

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

//router.post("/project/model/create", function (req, res) {
//
//});

module.exports = router;
