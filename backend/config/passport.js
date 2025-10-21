const passport = require('passport')
const { Strategy: GoogleStrategy } = require('passport-google-oauth20')
const { pool } = require('./db')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const { id: google_id, displayName: name, emails } = profile
        const email = emails[0].value
        
        let result = await pool.query("SELECT * FROM users WHERE google_id=$1", [google_id])

        if(result.rows.length === 0) {
            result = await pool.query(
                "INSERT INTO users (google_id, name, email) VALUES ($1,$2,$3) RETURNING *", [google_id, name, email]
            )
        }

        done(null, result.rows[0])
    } catch (err) {
        done(err, null)
    }
}))

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser(async (id, done) => {
    const res = await pool.query("SELECT * FROM users WHERE id=$1", [id])
    done(null, res.rows[0])
})