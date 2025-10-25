const express = require('express')
const { verifyToken } = require('../middleware/auth')
const { 
    getPasswords, 
    addPassword, 
    updatePassword, 
    deletePassword 
} = require('../controllers/passwordController')
const { 
    passwordGetLimiter, 
    passwordCreateLimiter, 
    passwordUpdateLimiter, 
    passwordDeleteLimiter 
} = require('../middleware/rateLimiters')

const router = express.Router()

router.use(verifyToken)

router.get('/', passwordGetLimiter, getPasswords)
router.post('/', passwordCreateLimiter, addPassword)
router.put('/:id', passwordUpdateLimiter, updatePassword)
router.delete('/:id', passwordDeleteLimiter, deletePassword)

module.exports = router