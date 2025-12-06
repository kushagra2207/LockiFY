const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')

require('./config/passport')
const authRoutes = require('./routes/authRoutes')
const passwordRoutes = require('./routes/passwordRoutes')

const app = express()
app.set('trust proxy', 1)

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/auth', authRoutes)
app.use('/api/passwords', passwordRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server listening on port ${process.env.PORT}`))

// Test
app.get('/', (req, res) => {
    res.send('Server Working')
})