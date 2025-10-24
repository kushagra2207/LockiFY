const express = require('express')
const { verifyToken } = require('../middleware/auth')
const { 
    getPasswords, 
    addPassword, 
    updatePassword, 
    deletePassword 
} = require('../controllers/passwordController')

const router = express.Router()

router.use(verifyToken)

router.get('/', getPasswords)
router.post('/', addPassword)
router.put('/:id', updatePassword)
router.delete('/:id', deletePassword)

module.exports = router