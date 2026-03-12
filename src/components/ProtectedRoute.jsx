function ProtectedRoute({ children, isAllowed = true, fallback = null }) {
  return isAllowed ? children : fallback
}

export default ProtectedRoute
