import { Link } from 'react-router-dom'
import GoogleSignInButton from './GoogleSigninButton'
import { useAuth } from '../context/authContext'

const Navbar = () => {
  const { user, loading, handleLogin, handleLogout } = useAuth()

  return (
    <nav className="bg-slate-800 text-white flex justify-between sm:justify-around items-center py-4 px-4 sm:px-0">
      <div className="logo font-bold text-2xl">
        <Link to="/" className="flex items-center">
          <span className="text-sky-500">&lt;</span>
          <span>Locki</span>
          <span className="text-sky-500">FY/&gt;</span>
        </Link>
      </div>
      <div>
        {loading ? null : !user ? (
          <GoogleSignInButton onClick={handleLogin} />
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded cursor-pointer"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar