const jwt = require('jsonwebtoken')

const googleAuthSuccess = (req, res) => {
    const user = req.user
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' })
    res.redirect(`${process.env.FRONTEND_URL}/passwords`)
}

const me = (req, res) => {
    try {
        const token = req.cookies.token
        if(!token) return res.status(401).json({ message: "Not authenticated" })

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        res.json({ user: decoded })
    } catch (err) {
        res.status(401).json({ message: "Invalid Token" })
    }
}

const logout = (req, res) => {
    res.clearCookie('token')
    res.json({ message: "Logged Out" })
}

module.exports = { googleAuthSuccess, logout, me }