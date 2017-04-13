const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const Schema = mongoose.Schema;
var NotEmptyString = {type: String, minLength: 1,required: true};

const projectSchema = new Schema({
    title: NotEmptyString,
    link: NotEmptyString,
    image: {
        type: String
    },
    owner: {
        type: String ,
        default:null
    },
    created: {
        type: Date,
        default:Date.now()
    },
    published: {
        type: Boolean,
        required: true
    },
    model:new Schema({
        link: NotEmptyString
    })
});


module.exports = mongoose.model("Project", projectSchema);
