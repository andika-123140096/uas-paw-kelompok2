import { Navigate, useLocation } from 'react-router-dom'
import { getToken } from '../api'

export default function ProtectedRoute({ children, requireAuth = true, requireRole }) {
  const token = getToken()
  const location = useLocation()
  const role = localStorage.getItem('role')

  if (requireAuth && !token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!requireAuth && token) {
    return <Navigate to="/jobs" replace />
  }

  if (requireRole && role !== requireRole) {
    return <Navigate to="/jobs" replace />
  }

  return children
}