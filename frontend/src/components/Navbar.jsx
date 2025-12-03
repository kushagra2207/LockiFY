import { Link } from 'react-router-dom'
import GoogleSignInButton from './GoogleSigninButton'
import { useAuth } from '../context/authContext'

const Navbar = () => {
  const { user, loading, handleLogin, handleLogout } = useAuth()

  return (
    <nav className="bg-slate-800 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 py-4 sm:flex-row sm:gap-4 sm:px-6 lg:px-0">
        <div className="logo font-bold text-2xl">
          <Link to="/" className="flex items-center gap-1">
            <span className="text-sky-500">&lt;</span>
            <span>Locki</span>
            <span className="text-sky-500">FY/&gt;</span>
          </Link>
        </div>
        <div
          className={`flex w-full items-center gap-3 sm:w-auto ${
            !loading && !user ? 'justify-center' : 'justify-between sm:justify-end'
          }`}
        >
          <div className="text-sm sm:text-base">
            {loading ? null : !user ? (
              null
            ) : (
              <Link to="/passwords">
                <span className="hover:text-sky-100 transition-colors whitespace-nowrap">My Passwords</span>
              </Link>
            )}
          </div>
          <div className="flex-shrink-0">
            {loading ? null : !user ? (
              <GoogleSignInButton onClick={handleLogin} />
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base font-semibold py-2 px-4 rounded cursor-pointer"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar