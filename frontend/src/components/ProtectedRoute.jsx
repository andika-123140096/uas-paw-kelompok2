import { Navigate, useLocation } from 'react-router-dom'
import { getToken } from '../api'

export default function ProtectedRoute({ children, requireAuth = true, requireRole }) {
  const token = getToken()
  const location = useLocation()
  const role = localStorage.getItem('role')

  // Jika route butuh autentikasi tapi user belum login
  if (requireAuth && !token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Jika route tidak butuh autentikasi tapi user sudah login
  if (!requireAuth && token) {
    return <Navigate to="/jobs" replace />
  }

  // Jika route butuh role tertentu
  if (requireRole && role !== requireRole) {
    return <Navigate to="/jobs" replace />
  }

  return children
}