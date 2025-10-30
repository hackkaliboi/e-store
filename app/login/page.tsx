"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "@/lib/supabase/auth"
import { isAdmin } from "@/lib/supabase/auth"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        console.log("Login form submitted")

        try {
            const { data, error } = await signIn(email, password)
            console.log("Sign in result:", { data, error })
            
            if (error) {
                // Handle error properly
                if (error instanceof Error) {
                    setError(error.message || "Failed to sign in")
                } else {
                    setError("Failed to sign in")
                }
                setLoading(false)
            } else {
                // Check if user is admin and redirect accordingly
                if (data?.user) {
                    console.log("User signed in:", data.user)
                    try {
                        const adminStatus = await isAdmin(data.user)
                        console.log("Admin status check result:", adminStatus)
                        if (adminStatus) {
                            console.log("Redirecting to admin dashboard")
                            router.push("/admin")
                            // Use window.location for immediate redirect
                            window.location.href = "/admin"
                        } else {
                            console.log("Redirecting to home page")
                            router.push("/")
                            // Use window.location for immediate redirect
                            window.location.href = "/"
                        }
                    } catch (adminError) {
                        console.error("Error checking admin status:", adminError)
                        // Default to home page if there's an error checking admin status
                        router.push("/")
                        window.location.href = "/"
                    }
                } else {
                    console.log("No user data, redirecting to home")
                    router.push("/")
                    window.location.href = "/"
                }
            }
        } catch (err) {
            console.error("Sign in error:", err)
            setError("An unexpected error occurred. Please try again.")
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="bg-amber-100 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <div className="bg-amber-600 rounded-lg w-10 h-10 flex items-center justify-center">
                            <span className="font-bold text-white text-lg">De</span>
                        </div>
                    </div>
                    <CardTitle className="text-2xl text-amber-900">Sign In</CardTitle>
                    <CardDescription className="text-amber-900/70">
                        Sign in to your De-chickins account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-amber-900">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="border-amber-300 focus:ring-amber-500"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-amber-900">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="border-amber-300 focus:ring-amber-500"
                                placeholder="••••••••"
                            />
                        </div>
                        {error && (
                            <div className="p-3 rounded bg-red-100 text-red-800 text-sm">
                                {error}
                            </div>
                        )}
                        <Button
                            type="submit"
                            className="w-full bg-amber-700 hover:bg-amber-800 text-white"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}