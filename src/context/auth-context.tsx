"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useNavigate, useLocation } from "react-router"

type User = {
    id: string
    username: string
    name: string
    role: string
}

type AuthContextType = {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    login: (username: string, password: string, rememberMe: boolean) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()

    // Check if user is already logged in on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser))
            } catch (error) {
                console.error("Failed to parse stored user:", error)
                localStorage.removeItem("user")
            }
        }
        setIsLoading(false)
    }, [])

    // Redirect to overview page if already logged in and on login page
    useEffect(() => {
        if (user && location.pathname === "/auth/login") {
            navigate("/", { replace: true })
        }
    }, [user, location.pathname, navigate])

    const login = async (username: string, password: string, rememberMe: boolean) => {
        setIsLoading(true)

        try {
            // In a real app, this would be an API call
            // For demo purposes, we'll simulate a successful login after a delay
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Validate credentials (for demo purposes)
            if (username !== "admin" || password !== "admin@123") {
                throw new Error("Invalid credentials")
            }

            // Mock user data
            const userData: User = {
                id: "1",
                username,
                name: "Admin User",
                role: "admin",
            }

            setUser(userData)

            // Store user data if remember me is checked or always for demo
            localStorage.setItem("user", JSON.stringify(userData))

            // Force navigation to the overview page
            setTimeout(() => {
                navigate("/", { replace: true })
            }, 100)
        } catch (error) {
            console.error("Login failed:", error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("user")
        navigate("/auth/login", { replace: true })
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
