const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const Schema = mongoose.Schema;
var NotEmptyString = {type: String, minLength: 1,required: true},
    EmtyStr = {type: String,default:null};

const projectSchema = new Schema({
    title: NotEmptyString,
    link: NotEmptyString,
    image: EmtyStr,
    owner: EmtyStr,
    created: {
        type: Date,
        default:Date.now()
    },
    published: {
        type: Boolean,
        default:false
    },
    model:new Schema({
        link:EmtyStr,
        name:EmtyStr
    })
});


module.exports = mongoose.model("Project", projectSchema);
