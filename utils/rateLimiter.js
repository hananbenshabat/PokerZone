const rateLimit = require("express-rate-limit");

exports.updateLimiter = rateLimit({
    windowMs: 3 * 60 * 1000, // 3 minute window
    max: 10, // start blocking after 10 requests
    message: "Too many Save attempts from this device, please try again in a few minutes",
});

exports.registerLimiter = rateLimit({
    windowMs: 3 * 60 * 1000, // 3 minute window
    max: 20, // start blocking after 20 requests
    message: "Too many accounts Registered from this device, please try again in a few minutes",
});

exports.loginLimiter = rateLimit({
    windowMs: 3 * 60 * 1000, // 3 minute window
    max: 30, // start blocking after 30 requests
    message: "Too many Login attempts from this device, please try again in a few minutes",
});