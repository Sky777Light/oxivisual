const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    owner: {
        type: String || null
    },
    created: {
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        required: true
    }
});


module.exports = mongoose.model("Project", projectSchema);
