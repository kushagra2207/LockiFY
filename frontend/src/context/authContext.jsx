import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, loginWithGoogle, logoutUser } from "../api/auth"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getCurrentUser()
                setUser(data)
            } catch {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [])

    const handleLogin = () => {
        loginWithGoogle()
    }

    const handleLogout = async () => {
        try {
            await logoutUser()
            setUser(null)
        } catch (err) {
            console.error("Logout failed:", err)
        }
    }

    return (
        <AuthContext.Provider value={{ user, loading, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)