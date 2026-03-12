import ProtectedRoute from '../components/ProtectedRoute.jsx'
import DashboardPage from '../pages/DashboardPage.jsx'

function AppRoutes() {
  return (
    <main>
      <ProtectedRoute isAllowed>
        <DashboardPage />
      </ProtectedRoute>
    </main>
  )
}

export default AppRoutes
