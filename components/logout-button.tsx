"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { useAuth } from "@/context/auth-context"

export function LogoutButton() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { logout } = useAuth()

  const handleLogout = async () => {
    setLoading(true)
    try {
      console.log('Starting logout process...')
      await logout()
      
      // Show success message
      toast.success('Logged out successfully')
      // Redirect to home page after successful logout
      router.push('/')
      // Force a full page refresh to ensure auth state is reset
      window.location.href = '/'
    } catch (error) {
      console.error('Error during logout:', error)
      toast.error('An error occurred during logout')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="border-amber-300 text-amber-900 hover:bg-amber-100"
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? "Logging out..." : "Logout"}
    </Button>
  )
}