import { useAuth } from "@/contexts/AuthContext"
import { routes } from "@/data/routes"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const isRouteAllowed = (route: string, allowedRoles: string[]) => {
    return allowedRoles.includes(route)
}

const AuthorizeRoute = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const { isLoading, user, isAuthenticated } = useAuth()
    if (isLoading) {
        return null
    }

    useEffect(() => {
        if (user) {
            const allowedRoutes = routes[user.role as keyof typeof routes].map((route) => route.path)
            if (!isRouteAllowed(location.pathname, allowedRoutes)) {
                if (isAuthenticated) {
                    navigate(allowedRoutes[0])
                } else {
                    navigate("/login")
                }
            }
        }

    }, [user])

    return <>{children}</>

}

export default AuthorizeRoute