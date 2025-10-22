const express = require('express')
const passport = require('passport')
const { googleAuthSuccess, logout, me } = require('../controllers/authController')

const router = express.Router()

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/google/callback', passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL}/` }), googleAuthSuccess)

router.get('/me', me)
router.post('/logout', logout)

module.exports = router