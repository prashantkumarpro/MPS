import { Navigate } from 'react-router'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute ({ children, allowedRoles }) {
  const { user, token } = useAuth()

  // 🔴 Not logged in
  if (!token || !user) {
    return <Navigate to='/admin/login' replace />
  }

  // 🔴 Role not allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to='/admin/login' replace />
  }

  // ✅ Access granted
  return children
}
