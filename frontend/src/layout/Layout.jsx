import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar'
import { ToastContainer, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Layout = () => {
    return (
        <div>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
        </div>
    )
}

export default Layout