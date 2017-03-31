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
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    created: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    avatar: {
        type: String
    },
    projects: [ { type: Types.ObjectId, ref: 'Project'} ],
    users: [ { type: Types.ObjectId, ref: 'User'} ],
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
