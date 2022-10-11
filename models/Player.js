const mongoose = require("mongoose");
const generateSchema = require("generate-schema");
const defaultAvatar = require("./Default Male.json");

let avatarDataSchema = generateSchema.mongoose(defaultAvatar);

const PlayerSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        default: "Unassigned",
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
        required: true,
    },
    totalGames: {
        type: Number,
        default: 0,
        required: true,
    },
    totalChips: {
        type: Number,
        default: 1000,
        required: true,
    },
    isInTable: {
        type: Boolean,
        default: false,
        required: true,
    },
    avatar: avatarDataSchema,
});

const Player = mongoose.model("Player", PlayerSchema);

module.exports = Player;