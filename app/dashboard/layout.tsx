"use client"

import { useAuth } from "@/lib/supabase/use-auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { LogoutButton } from "@/components/logout-button"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Redirect to login if not authenticated
        router.push('/auth/login')
      }
      setChecked(true)
    }
  }, [user, loading, router])

  if (!checked) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <p className="text-amber-900">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Dashboard Header */}
      <header className="border-b border-amber-200/30 bg-amber-100/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-amber-900">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-amber-900/70">
              {user?.email}
            </span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main>
        {children}
      </main>
    </div>
  )
}