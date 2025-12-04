# LockiFY Frontend

A modern, responsive React application for managing passwords with real-time strength checking and secure storage.

## Quick Start

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Dependencies

### Core Dependencies
- **react** (^19.1.0) - UI framework
- **react-dom** (^19.1.0) - React DOM rendering
- **react-router-dom** (^7.9.4) - Client-side routing
- **react-toastify** (^11.0.5) - Toast notifications
- **tailwindcss** (^4.1.10) - CSS framework
- **@tailwindcss/vite** (^4.1.10) - Vite plugin for Tailwind
- **zxcvbn** (^4.4.2) - Password strength estimation

### Dev Dependencies
- **vite** (^6.3.5) - Build tool
- **@vitejs/plugin-react** (^4.5.2) - React plugin for Vite
- **eslint** (^9.29.0) - Linting
- **@types/react** (^19.1.8) - TypeScript types for React
- **@types/react-dom** (^19.1.6) - TypeScript types for React DOM

## Project Structure

```
src/
├── api/                    # API service functions
│   ├── auth.js            # Authentication API calls
│   └── passwords.js       # Password CRUD operations
│
├── components/             # Reusable components
│   ├── GoogleSigninButton.jsx
│   └── Navbar.jsx
│
├── context/                # React Context
│   └── authContext.jsx    # Authentication context
│
├── layout/                 # Layout components
│   └── Layout.jsx         # Main application layout
│
├── pages/                  # Page components
│   ├── Home.jsx           # Landing page
│   ├── Passwords.jsx      # Password manager page
│   └── NotFound.jsx       # 404 page
│
├── router/                 # Routing configuration
│   └── AppRouter.jsx      # Route definitions and protected routes
│
├── App.jsx                 # Main application component
├── main.jsx                # Application entry point
└── index.css               # Global styles
```

## Features

### Password Management
- **Add Passwords**: Store website URL, username, and password
- **Edit Passwords**: Update existing password entries
- **Delete Passwords**: Remove unwanted password entries
- **View Passwords**: See all stored passwords in a table format
- **Password Masking**: Passwords are masked with asterisks
- **Show/Hide Password**: Toggle password visibility

### Password Strength
- Real-time password strength analysis
- Visual strength indicator (color-coded bar)
- 5-level strength rating: Very Weak, Weak, Fair, Good, Strong
- Uses zxcvbn library for accurate estimation

### Password Generator
- Generate strong passwords automatically
- Configurable length (12-17 characters)
- Includes uppercase, lowercase, numbers, and special characters
- Randomized character distribution

### User Experience
- **Copy to Clipboard**: One-click copy for site, username, and password
- **Toast Notifications**: Visual feedback for all actions
- **Protected Routes**: Authentication-required pages
- **Responsive Design**: Mobile-friendly interface
- **Modern UI**: Tailwind CSS styling

## Authentication

The frontend uses:
- **Google OAuth**: Single-click Google Sign-In
- **JWT Tokens**: Secure token-based authentication
- **Context API**: Global authentication state management
- **Cookie-based Sessions**: HTTP-only cookies for security

## API Integration

The frontend communicates with the backend through API service functions in `src/api/`:

### Auth API (`auth.js`)
- `getCurrentUser()` - Fetch current user data
- `loginWithGoogle()` - Initiate Google OAuth flow
- `logoutUser()` - Logout and clear session

### Password API (`passwords.js`)
- `getPasswords()` - Fetch all passwords for user
- `addPassword(data)` - Create new password entry
- `updatePassword(id, data)` - Update existing entry
- `deletePassword(id)` - Delete password entry

## Security

- All API calls are authenticated with JWT tokens
- Protected routes check authentication status
- Passwords are handled securely in memory
- No sensitive data stored in localStorage or sessionStorage

## Routing

The application uses React Router v7:
- `/` - Home page (public)
- `/passwords` - Password manager (protected)
- `*` - 404 page

Protected routes redirect to home if user is not authenticated.

## Styling

Built with Tailwind CSS 4.0:
- Utility-first CSS framework
- Responsive design utilities
- Custom color scheme (sky blue theme)
- Modern gradient backgrounds and animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Environment Variables

Ensure the following environment variables are set:
- `VITE_API_URL` - Backend API URL (default: http://localhost:3000)

## Development Notes

- The app uses Vite for fast HMR (Hot Module Replacement)
- ESLint is configured for code quality
- React 19 features are used throughout
- All components use functional components with hooks

## Troubleshooting

### Build Issues
If you encounter build issues:
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### API Connection Issues
Ensure the backend server is running on port 3000.

### CORS Errors
Verify that the backend has the correct frontend URL in CORS configuration.

---

**For complete project information, see [../README.md](../README.md)**

**For backend API details, see [../backend/README.md](../backend/README.md)**