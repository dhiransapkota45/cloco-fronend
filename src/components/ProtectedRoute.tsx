import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth()

  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}