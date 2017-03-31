const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const Schema = mongoose.Schema;
const Types = mongoose.Schema.Types;

const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model("Project", projectSchema);
