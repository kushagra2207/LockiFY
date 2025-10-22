const express = require('express')
const dotenv = require('dotenv')
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('./config/passport')
const authRoutes = require('./routes/authRoutes')
const passwordRoutes = require('./routes/passwordRoutes')

dotenv.config()
const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/auth', authRoutes)
app.use('/api/passwords', passwordRoutes)

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))

// Test
app.get('/', (req, res) => {
    res.send('Server Working')
})