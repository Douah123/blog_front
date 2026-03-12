import { AuthProvider } from './context/AuthContext.jsx'
import Navbar from './components/Navbar.jsx'
import AppRoutes from './routes/AppRoutes.jsx'

function App() {
  return (
    <AuthProvider>
      <div className="app-shell">
        <Navbar />
        <AppRoutes />
      </div>
    </AuthProvider>
  )
}

export default App
