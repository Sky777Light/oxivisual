// process.env.NODE_ENV = 'production';
const fs = require("fs");

module.exports = {
    env: process.env.NODE_ENV,
    DIR: {
        PUBLIC: '/resources',
        UPLOADS: 'resources/uploads/',
        PROJECTS: 'projects/',
        IMAGES: 'images/',
        IMG_TYPES: ['webp/', 'low/'],
        ALIGN_IMAGES: 'align_images/',
        SITE_STRUCTURE: '/site_structure.json',
        DELIMETER: '/',
        PROJECT_TEMPLATE: {
            NAME: 'templates/',
            CSS: 'style.css',
            HTML: 'index.html',
            TYPES: ['controls/', 'tooltip/','preloader/'],
            _TYPE:{
                PRELOADER:2,
                TOOLTIP:1,
                CONTROLS:0
            }

        }
    },
    FILE_UPLOAD_EXT: ['.obj', 'image/'],
    FILE_UPLOAD_ATTR: ['model[]', 'frames[]', 'alignFrames[]', 'structure','preloader[]','tooltip[]','controls[]'],
    FILE_UPLOAD_ACCEC: parseInt("0777", 8),
    port: process.env.PORT || 3009,
    mongoose: {
        uri: "mongodb://localhost/oxivisual"
    },
    security: {
        secret: "t45g3w45r34tw5ye454uhdgdf",
        expiresIn: "24h"
    },
    superadmin: {
        email: "superuser",
        password: "superpass"
    },
    help: {
        deleteFolderRecursive: function (path, flag) {
            var _self = this;
            if (fs.existsSync(path)) {
                for (var u = 0, files = fs.readdirSync(path); u < files.length; u++) {
                    var file = files[u],
                        curPath = path + "/" + file;
                    if (fs.lstatSync(curPath).isDirectory()) { // recurse
                        _self.deleteFolderRecursive(curPath, true);
                    } else {
                        fs.unlinkSync(curPath);
                    }
                }
                if (flag)fs.rmdirSync(path);
            }
        }
    },
    USER_ROLE: {
        ADMIN: 1,
        SUPER: 0,
        USER: 2
    }
};
