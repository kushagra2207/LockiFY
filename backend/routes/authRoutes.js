const express = require('express')
const passport = require('passport')
const { googleAuthSuccess, logout, me } = require('../controllers/authController')
const { authLimiter, authMeLimiter } = require('../middleware/rateLimiters')

const router = express.Router()

router.get('/google', authLimiter, passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/google/callback', authLimiter, passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL}/` }), googleAuthSuccess)

router.get('/me', authMeLimiter, me)
router.post('/logout', authLimiter, logout)

module.exports = router