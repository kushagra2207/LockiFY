import AppRouterProvider from "./router/AppRouter"
import { AuthProvider } from "./context/authContext"

function App() {
  return (
    <AuthProvider>
      <AppRouterProvider />
    </AuthProvider>
  )
}

export default App