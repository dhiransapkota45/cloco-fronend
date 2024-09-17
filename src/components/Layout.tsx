import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Menu, X } from 'lucide-react'

const sidebarItems = [
  { path: '/users', label: 'Users' },
  { path: '/music', label: 'Music' },
  { path: '/artists', label: 'Artists' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const NavLinks = () => (
    <nav className="mt-5">
      <ul>
        {sidebarItems.map((item) => (
          <li key={item.path} className="mb-2">
            <Link
              to={item.path}
              className={cn(
                "block px-4 py-2 text-sm font-medium rounded-lg",
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-600 hover:bg-gray-100"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="hidden md:block w-64 bg-white shadow-md">
        <NavLinks />
      </aside>

      <div className={cn(
        "fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden",
        isMobileMenuOpen ? "block" : "hidden"
      )} onClick={() => setIsMobileMenuOpen(false)} />
      <aside className={cn(
        "fixed top-0 left-0 w-64 h-full bg-white shadow-md z-50 transform transition-transform duration-200 ease-in-out md:hidden",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-4 flex justify-end">
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <NavLinks />
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="md:hidden mr-4" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
              <h1 className="text-lg font-semibold text-gray-900">Artist Management System</h1>
            </div>
            <div className="flex items-center">
              <span className="mr-4 text-sm text-gray-600 hidden sm:inline">
                Welcome, {user?.first_name || 'User'}
              </span>
              <Button onClick={handleLogout} variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Card className="p-4 sm:p-6">
              {children}
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}