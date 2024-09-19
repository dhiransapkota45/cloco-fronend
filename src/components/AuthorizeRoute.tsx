import { useAuth } from "@/contexts/AuthContext"
import { useLocation, useNavigate } from "react-router-dom"

const isRouteAllowed = (route: string, allowedRoles: string[]) => {
    return allowedRoles.includes(route)
}

const routesMapper = {
    super_admin: ["/users", "/music", "/artists"],
    artist_manager: ["/artists", "/music"],
    user: ["/music"]
}

const AuthorizeRoute = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const { isLoading, user, isAuthenticated } = useAuth()
    if (isLoading) {
        return null
    }
    if (!user) {
        navigate("/login")
        return null
    }
    const allowedRoutes = routesMapper[user.role as keyof typeof routesMapper]
    if (!isRouteAllowed(location.pathname, allowedRoutes)) {
        if (isAuthenticated) {
            navigate(allowedRoutes[0])
        } else {
            navigate("/login")
        }
    }

    return <>{children}</>

}

export default AuthorizeRoute