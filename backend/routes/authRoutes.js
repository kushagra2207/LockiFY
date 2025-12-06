const express = require('express')
const passport = require('passport')
const { googleAuthSuccess, logout, me } = require('../controllers/authController')
const { authLimiter, authMeLimiter } = require('../middleware/rateLimiters')

const router = express.Router()

router.get(
    '/google', 
    authLimiter, 
    passport.authenticate('google', { 
        scope: ['profile', 'email'],
        session: false
    })
)
router.get(
    '/google/callback', 
    authLimiter, 
    passport.authenticate('google', { 
        failureRedirect: `${process.env.FRONTEND_URL}/`,
        session: false 
    }), googleAuthSuccess
)

router.get('/me', authMeLimiter, me)
router.post('/logout', authLimiter, logout)

module.exports = router