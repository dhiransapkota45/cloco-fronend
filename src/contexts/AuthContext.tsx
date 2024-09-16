import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { LoginFormData } from '@/types'
import { login as loginApi } from '@/service/api/auth'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

interface AuthContextType {
  user: any
  login: (data : LoginFormData) => Promise<void>
  logout: () => void
  register: (email: string, password: string) => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      // Validate token and set user
      validateToken(token)
    }
  }, [])

  const validateToken = async (token: string) => {
    try {
      const response = await axios.get('/api/validate-token', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUser(response.data.user)
      setIsAuthenticated(true)
    } catch (error) {
      logout()
    }
  }

  const login = async (data: LoginFormData) => {
    const response = await loginApi(data);
    if(response?.success){
      Cookies.set("authorization", response?.data?.accessToken ?? "");
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setUser(null)
    setIsAuthenticated(false)
  }

  const register = async (email: string, password: string) => {
    try {
      await axios.post('/api/register', { email, password })
    } catch (error) {
      throw new Error('Registration failed')
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}