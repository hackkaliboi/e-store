"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signUp } from "@/lib/supabase/auth"

export default function SignupPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        // Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }
        
        setLoading(true)
        setError(null)
        setSuccess(null)

        try {
            const { data, error } = await signUp(email, password)
            
            if (error) {
                // Handle error properly
                if (error instanceof Error) {
                    setError(error.message || "Failed to create account")
                } else {
                    setError("Failed to create account")
                }
            } else {
                // Show success message
                setSuccess("Account created successfully! Please check your email for confirmation.")
                // Clear form
                setEmail("")
                setPassword("")
                setConfirmPassword("")
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.")
        } finally {
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
                    <CardTitle className="text-2xl text-amber-900">Create Account</CardTitle>
                    <CardDescription className="text-amber-900/70">
                        Sign up for a De-chickins account
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
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-amber-900">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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
                        {success && (
                            <div className="p-3 rounded bg-green-100 text-green-800 text-sm">
                                {success}
                            </div>
                        )}
                        <Button
                            type="submit"
                            className="w-full bg-amber-700 hover:bg-amber-800 text-white"
                            disabled={loading}
                        >
                            {loading ? "Creating Account..." : "Sign Up"}
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm text-amber-900/70">
                        <p>Already have an account? <a href="/auth/login" className="text-amber-700 hover:underline">Sign in</a></p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}