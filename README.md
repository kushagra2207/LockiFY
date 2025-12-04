# LockiFY

A secure, modern password manager built with React and Node.js, featuring Google OAuth authentication and AES encryption for maximum security.

## Overview

LockiFY is a full-stack password management application that allows users to securely store, manage, and organize their passwords. The application prioritizes security with encryption, rate limiting, and robust authentication mechanisms.

## Features

- **Secure Password Storage**: AES encryption for all stored passwords
- **Google OAuth Authentication**: Quick and secure login with Google accounts
- **Password Strength Checker**: Real-time password strength analysis using zxcvbn
- **Password Generator**: Generate strong, random passwords on the fly
- **Copy to Clipboard**: One-click copy for URLs, usernames, and passwords
- **Full CRUD Operations**: Create, read, update, and delete password entries
- **Rate Limiting**: Protection against brute force and abuse
- **Protected Routes**: Secure route authentication
- **Responsive Design**: Modern UI that works on all devices
- **Toast Notifications**: User-friendly feedback for all actions

## Tech Stack

### Frontend
- **React 19** - Latest React with modern hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Toastify** - Toast notifications
- **zxcvbn** - Password strength estimation

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **PostgreSQL** - Relational database
- **Passport.js** - Authentication middleware
- **Google OAuth 2.0** - Third-party authentication
- **JWT** - JSON Web Tokens for session management
- **crypto-js** - AES encryption library
- **express-rate-limit** - Rate limiting middleware

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- Google Cloud Console account (for OAuth)

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/LockiFY.git
cd LockiFY
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=3000
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=lockify
DB_HOST=localhost
DB_PORT=5432
SESSION_SECRET=your_session_secret
JWT_SECRET=your_jwt_secret
ENCRYPTION_KEY=your_encryption_key
FRONTEND_URL=http://localhost:5173
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
```

Set up the database:
```sql
CREATE DATABASE lockify;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    google_id VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
);

CREATE TABLE passwords (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    site VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password_encrypted TEXT NOT NULL,
);
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
LockiFY/
├── backend/                 # Backend server
│   ├── config/             # Database and Passport configuration
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Auth and rate limiting middleware
│   ├── routes/             # API routes
│   └── server.js           # Main server file
│
├── frontend/                # React application
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── api/            # API service functions
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React Context providers
│   │   ├── layout/         # Layout components
│   │   ├── pages/          # Page components
│   │   └── router/         # Route configuration
│   └── consolidation/
│
└── README.md               # This file
```

## Security Features

- **AES Encryption**: All passwords are encrypted using AES before storage
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Multiple rate limiters to prevent abuse
- **Protected Routes**: Client and server-side route protection
- **HTTP-only Cookies**: Secure cookie handling
- **CORS Configuration**: Cross-origin request security

## API Endpoints

### Authentication
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - OAuth callback
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Passwords
- `GET /api/passwords` - Get all passwords (protected)
- `POST /api/passwords` - Add new password (protected)
- `PUT /api/passwords/:id` - Update password (protected)
- `DELETE /api/passwords/:id` - Delete password (protected)

## Acknowledgments

- zxcvbn library for password strength estimation
- React and Express.js communities

## Author

Kushagra Kumar Arora

---

**For detailed backend API documentation and configuration, please refer to [backend/README.md](backend/README.md)**

**For frontend setup and component documentation, please refer to [frontend/README.md](frontend/README.md)**
