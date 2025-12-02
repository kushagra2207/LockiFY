const rateLimit = require('express-rate-limit')

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 40,
    message: "Too many authentication attempts, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true
})

const authMeLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later",
    standardHeaders: true,
    legacyHeaders: false
})

const passwordCreateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 60,
    message: "Too many password creation attempts, please try again later",
    standardHeaders: true,
    legacyHeaders: false
})

const passwordUpdateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 60,
    message: "Too many password update attempts, please try again later",
    standardHeaders: true,
    legacyHeaders: false
})

const passwordDeleteLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 40,
    message: "Too many password deletion attempts, please try again later",
    standardHeaders: true,
    legacyHeaders: false
})

const passwordGetLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: "Too many password retrieval requests, please try again later",
    standardHeaders: true,
    legacyHeaders: false
})

module.exports = {
    authLimiter,
    authMeLimiter,
    passwordCreateLimiter,
    passwordUpdateLimiter,
    passwordDeleteLimiter,
    passwordGetLimiter
}