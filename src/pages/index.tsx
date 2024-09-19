import { useAuth } from "@/contexts/AuthContext"
import { useNavigate } from "react-router-dom"

const Homepage = () => {
    const navigate = useNavigate()
    const { isLoading, isAuthenticated, user } = useAuth()

    console.log(user)
    if (isLoading) {
        return null
    }

    if (!isAuthenticated) {
        navigate("/login")
        return null
    }

    if (user.role === "super_admin") {
        navigate("/users")
        return null
    }

    if (user.role === "artist_manager") {
        navigate("/artists")
        return null
    }

    if (user.role === "user") {
        navigate("/music")
    }

    return null
}

export default Homepage