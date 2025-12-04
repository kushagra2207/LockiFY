# LockiFY Backend

A secure, robust Express.js backend for the LockiFY password manager with Google OAuth authentication, AES encryption, and comprehensive security features.

## Quick Start

### Installation

```bash
npm install
```

### Configuration

Create a `.env` file in the backend directory with the following variables:

```env
# Server Configuration
PORT=3000

# Database Configuration
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_NAME=lockify
DB_HOST=localhost
DB_PORT=5432

# Security Keys (generate strong random strings)
SESSION_SECRET=your_session_secret_here
JWT_SECRET=your_jwt_secret_here
ENCRYPTION_KEY=your_32_character_encryption_key_here

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
```

### Database Setup

1. Create the PostgreSQL database:
```sql
CREATE DATABASE lockify;
```

2. Run the following SQL to create tables:
```sql
-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    google_id VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
);

-- Passwords table
CREATE TABLE passwords (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    site VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password_encrypted TEXT NOT NULL,
);
```

### Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

The server will start on the port specified in the `.env` file (default: 3000).

## Dependencies

### Core Dependencies
- **express** (^5.1.0) - Web application framework
- **pg** (^8.16.3) - PostgreSQL client
- **passport** (^0.7.0) - Authentication middleware
- **passport-google-oauth20** (^2.0.0) - Google OAuth strategy
- **jsonwebtoken** (^9.0.2) - JWT handling
- **crypto-js** (^4.2.0) - AES encryption
- **express-session** (^1.18.2) - Session management
- **cookie-parser** (^1.4.7) - Cookie parsing
- **cors** (^2.8.5) - CORS middleware
- **dotenv** (^17.2.3) - Environment variables
- **express-rate-limit** (^8.1.0) - Rate limiting

## Project Structure

```
backend/
├── config/
│   ├── db.js              # PostgreSQL pool configuration
│   └── passport.js        # Passport.js setup with Google OAuth
│
├── controllers/
│   ├── authController.js  # Authentication logic
│   └── passwordController.js  # Password CRUD operations
│
├── middleware/
│   ├── auth.js            # JWT verification middleware
│   └── rateLimiters.js    # Rate limiting configurations
│
├── routes/
│   ├── authRoutes.js      # Authentication routes
│   └── passwordRoutes.js  # Password CRUD routes
│
├── Google_OAuth_Client.json  # Google OAuth credentials
├── server.js              # Main server file
└── package.json           # Dependencies and scripts
```

## Security Features

### Authentication
- **Google OAuth 2.0**: Secure third-party authentication
- **JWT Tokens**: Token-based session management
- **HTTP-only Cookies**: Secure cookie storage
- **Passport.js**: Robust authentication middleware

### Encryption
- **AES Encryption**: All passwords encrypted before storage
- **Strong Encryption Key**: 32-character key for AES encryption
- **Secure Storage**: Encrypted passwords stored in database

### Rate Limiting
- **Auth Limiter**: 20 requests per 15 minutes
- **Auth Me Limiter**: 100 requests per 15 minutes
- **Password Get Limiter**: 200 requests per 15 minutes
- **Password Create Limiter**: 60 requests per 15 minutes
- **Password Update Limiter**: 60 requests per 15 minutes
- **Password Delete Limiter**: 40 requests per 15 minutes

### CORS
- Configured for specific frontend origin
- Credentials enabled for secure cookie transmission

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Rate Limit |
|--------|----------|-------------|------------|
| GET | `/google` | Initiate Google OAuth | 20/15min |
| GET | `/google/callback` | OAuth callback handler | 20/15min |
| GET | `/me` | Get current user info | 100/15min |
| POST | `/logout` | Logout user | 20/15min |

### Password Routes (`/api/passwords`) - Protected

| Method | Endpoint | Description | Rate Limit |
|--------|----------|-------------|------------|
| GET | `/` | Get all passwords for user | 200/15min |
| POST | `/` | Create new password entry | 60/15min |
| PUT | `/:id` | Update password entry | 60/15min |
| DELETE | `/:id` | Delete password entry | 40/15min |

## Authentication Flow

1. User clicks "Sign in with Google"
2. Frontend redirects to `/api/auth/google`
3. Passport redirects to Google OAuth consent screen
4. User authorizes the application
5. Google redirects to `/api/auth/google/callback`
6. Passport verifies OAuth token with Google
7. User is created/fetched from database
8. JWT token is generated and set as HTTP-only cookie
9. User is redirected to frontend with authenticated session

## Password Encryption

Passwords are encrypted using AES-256 encryption:

```javascript
// Encryption
const encrypted = cryptoJS.AES.encrypt(password, ENCRYPTION_KEY).toString();

// Decryption
const decrypted = cryptoJS.AES.decrypt(encryptedPassword, ENCRYPTION_KEY)
    .toString(cryptoJS.enc.Utf8);
```

All password operations (create, read, update) handle encryption/decryption automatically.

## Middleware

### JWT Verification (`middleware/auth.js`)
- Verifies JWT token from HTTP-only cookie
- Attaches user data to request object
- Returns 401/403 for invalid/missing tokens

### Rate Limiters (`middleware/rateLimiters.js`)
- Prevents brute force attacks
- Different limits for different endpoints
- Skipped for successful authentication attempts

## Database Schema

### Users Table
```sql
- id: SERIAL PRIMARY KEY
- google_id: VARCHAR(255) UNIQUE NOT NULL
- name: VARCHAR(255) NOT NULL
- email: VARCHAR(255) NOT NULL
```

### Passwords Table
```sql
- id: SERIAL PRIMARY KEY
- user_id: INTEGER REFERENCES users(id) ON DELETE CASCADE
- site: VARCHAR(255) NOT NULL
- username: VARCHAR(255) NOT NULL
- password_encrypted: TEXT NOT NULL
```

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/google/callback`
6. Copy Client ID and Client Secret to `.env` file
7. Save credentials as `Google_OAuth_Client.json`

### OAuth Errors
- Verify callback URL matches exactly
- Check GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
- Ensure Google+ API is enabled

### Encryption Issues
- Ensure ENCRYPTION_KEY is at least 32 characters
- Don't change encryption key after deployment

### Rate Limit Issues
- Adjust limits in `middleware/rateLimiters.js` if needed
- Check browser console for rate limit messages

## Development Notes

- Uses Express 5.1.0 with latest features
- Auto-reload in development mode using `--watch` flag
- All sensitive data stored in environment variables
- SQL injection protection via parameterized queries
- Error handling with try-catch blocks

---

**For complete project information, see [../README.md](../README.md)**

**For frontend details, see [../frontend/README.md](../frontend/README.md)**