"use client"
import { useState } from "react"
import { useNavigate } from "react-router"
import type React from "react"
import { useMutation } from "@tanstack/react-query"
import { Eye, EyeOff, Lock, LogIn, User } from "lucide-react"
import { setCookie } from 'typescript-cookie'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Toaster, toast } from "sonner" // Import sonner
import { base_path } from "@/api/api"

async function loginUser({ username, password, rememberMe }: { username: string; password: string; rememberMe: boolean }) {
    const response = await fetch(`${base_path}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, rememberMe }),
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Login failed')
    }

    return response.json()
}

export function LoginPage() {
    const [customToast, setCustomToast] = useState<{ title: string; description?: string; variant?: "default" | "destructive" | "success" } | null>(null)
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        rememberMe: true,
    })
    const [errors, setErrors] = useState({
        username: "",
        password: "",
        general: "",
    })

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            // Assuming API returns { user: { id, username, name, role }, token }
            setCookie('access_token', data.access_token, { expires: 30 }) // Set token with 30-day expiry
            setCookie('token_type', data.token_type, { expires: 30 }) // Set token type with 30-day expiry

            toast.success("Login successful", {
                description: "Welcome back!",
            })
            // Redirect to the home page or dashboard
            setTimeout(() => navigate("/", { replace: true }), 500) // Delay navigation for toast visibility

        },
        onError: (error: Error) => {
            setErrors((prev) => ({
                ...prev,
                general: error.message || "Invalid username or password",
            }))
            // Show error toast
            setCustomToast({
                title: "Login failed",
                description: error.message || "Invalid username or password",
                variant: "destructive",
            })
        },
    })


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => ({ ...prev, [name]: "" }))
        }
    }

    const handleCheckboxChange = (checked: boolean) => {
        setFormData((prev) => ({ ...prev, rememberMe: checked }))
    }

    const validateForm = () => {
        const newErrors = {
            username: "",
            password: "",
            general: "",
        }
        let isValid = true

        if (!formData.username.trim()) {
            newErrors.username = "Username is required"
            isValid = false
        }

        if (!formData.password) {
            newErrors.password = "Password is required"
            isValid = false
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        loginMutation.mutate({
            username: formData.username,
            password: formData.password,
            rememberMe: formData.rememberMe,
        })
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-white p-4">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-lg">
                        <span className="text-3xl font-bold">G</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">GCT Attendance System</h1>
                    <p className="text-gray-500">Sign in to your account</p>
                </div>

                <Card className="border-none shadow-lg">
                    <CardHeader className="space-y-1 pb-4">
                        <CardTitle className="text-xl">Login</CardTitle>
                        <CardDescription>Enter your credentials to access your account</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            {errors.general && <div className="rounded-md bg-red-50 p-3 text-sm text-red-500">{errors.general}</div>}

                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        id="username"
                                        name="username"
                                        placeholder="Enter your username"
                                        className={`pl-10 ${errors.username ? "border-red-500" : ""}`}
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.username && <p className="text-xs text-red-500">{errors.username}</p>}
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <Button variant="link" className="h-auto p-0 text-xs text-sky-500" type="button">
                                        Forgot password?
                                    </Button>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        className={`pl-10 ${errors.password ? "border-red-500" : ""}`}
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-gray-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                    </Button>
                                </div>
                                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox id="remember" checked={formData.rememberMe} onCheckedChange={handleCheckboxChange} />
                                <Label htmlFor="remember" className="text-sm font-normal">
                                    Remember me for 30 days
                                </Label>
                            </div>
                        </CardContent>

                        <CardFooter>
                            <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-600" disabled={loginMutation.isPending}>
                                {loginMutation.isPending ? (
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                        <span>Signing in...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <LogIn className="h-4 w-4" />
                                        <span>Sign in</span>
                                    </div>
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>Don't have an account? Contact your administrator</p>
                </div>
            </div>
        </div>
    )
}