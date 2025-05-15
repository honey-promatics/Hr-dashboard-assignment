import { createContext, useState, useContext, useEffect } from "react"
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const checkAuthStatus = () => {
            try {
                const storedUser = localStorage.getItem("user")
                const token = localStorage.getItem("token")

                if (storedUser && token) {
                    setUser(JSON.parse(storedUser))
                    setIsAuthenticated(true)
                }
            } catch (error) {
                console.error("Error checking auth status:", error)
                localStorage.removeItem("user")
                localStorage.removeItem("token")
            } finally {
                setLoading(false)
            }
        }

        checkAuthStatus()
    }, [])

    const register = async (userData) => {
        setLoading(true)
        setError(null)

        try {
            console.log("userdata : ", userData)
            const result = await axios.post(`${import.meta.env.VITE_Backend_Url}api/auth/register`, userData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            console.log("result : ", result.data)

            const newUser = {
                id: Math.random().toString(36).substr(2, 9),
                name: userData.name,
                email: userData.email,
                role: "Employee",
            }

            const token = `mock-jwt-token-${Date.now()}`

            localStorage.setItem("user", JSON.stringify(newUser))
            localStorage.setItem("token", token)

            setUser(newUser)
            setIsAuthenticated(true)

            setLoading(false)
            return true
        } catch (error) {
            console.error("Registration error:", error)
            setError(error.message || "Registration failed")
            setLoading(false)
            return false
        }
    }

    const login = async (email, password) => {
        setLoading(true)
        setError(null)

        try {
            if (!email || !password) {
                throw new Error("Email and password are required")
            }

            await new Promise((resolve) => setTimeout(resolve, 1000))

            const loggedInUser = {
                id: Math.random().toString(36).substr(2, 9),
                name: email.split("@")[0],
                email,
                role: "Employee",
            }

            const token = `mock-jwt-token-${Date.now()}`

            localStorage.setItem("user", JSON.stringify(loggedInUser))
            localStorage.setItem("token", token)

            setUser(loggedInUser)
            setIsAuthenticated(true)

            setLoading(false)
            return true
        } catch (error) {
            console.error("Login error:", error)
            setError(error.message || "Login failed")
            setLoading(false)
            return false
        }
    }

    const logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")

        setUser(null)
        setIsAuthenticated(false)

        return true
    }

    const value = {
        user,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
