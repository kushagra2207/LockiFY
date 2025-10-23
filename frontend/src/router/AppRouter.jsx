import { createBrowserRouter, RouterProvider, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'

import Layout from '../layout/Layout'

import Home from '../pages/Home'
import Passwords from '../pages/Passwords'
import NotFound from '../pages/NotFound'

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth()

    if (loading) return <div>Loading...</div>
    return user ? children : <Navigate to="/" replace />
}

const AppRouterProvider = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                { path: "/", element: <Home /> },
                {
                    path: "/passwords",
                    element: (
                        <ProtectedRoute>
                            <Passwords />
                        </ProtectedRoute>
                    )
                },
            ]
        },
        {
            path: "*",
            element: <NotFound />
        }
    ])

    return <RouterProvider router={router} />
}

export default AppRouterProvider