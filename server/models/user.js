const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const Schema = mongoose.Schema;
const Types = mongoose.Schema.Types;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    secondName: {
        type: String
    },
    role: {
        type: String,
        required: true
    },
    parent: {
        type: String || null
    },
    created: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    avatar: {
        type: String
    },
    users: {
        type: []
    },
    projects: {
        type: []
    },
    token: {
        type: String
    }
});


userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.pre("save", function (next) {
    if (this.isModified("password") || this.isNew) {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10), null);
    }

    next();
});

module.exports = mongoose.model("User", userSchema);
