const jwt = require('jsonwebtoken')

const googleAuthSuccess = (req, res) => {
    const user = req.user
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' })
    res.redirect(`${process.env.FRONTEND_URL}/passwords`)
}

const logout = (req, res) => {
    res.clearCookie('token')
    res.json({ message: "Logged Out" })
}

module.exports = { googleAuthSuccess, logout }