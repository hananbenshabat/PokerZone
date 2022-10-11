const mongoose = require("mongoose");
const Player = require("./Player"); // Player model

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    player: Player.schema,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;