"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AuthLoginPage() {
    const router = useRouter()

    useEffect(() => {
        // Redirect to the main login page
        router.push("/login")
    }, [router])

    return (
        <div className="min-h-screen bg-amber-50 flex items-center justify-center">
            <p className="text-amber-900">Redirecting to login page...</p>
        </div>
    )
}
