const { NODE_ENV } = require("./config");

if (NODE_ENV === "production") {
    module.exports = require("./prod");
} else {
    module.exports = require("./dev");
}