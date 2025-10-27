"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Package,
  BarChart3,
  Settings,
  LogOut,
  Home,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { supabase } from "@/lib/supabase/client"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if Supabase client is initialized
    if (!supabase) {
      console.error('Supabase client not initialized')
      setLoading(false)
      return
    }

    // Create a function that uses the non-null supabase client
    const initializeAuth = async (client: NonNullable<typeof supabase>) => {
      try {
        const { data: { user }, error } = await client.auth.getUser()
        if (error) {
          console.error("Error getting user:", error)
        }
        setUser(user)
        
        // If no user and not on login page, redirect to login
        if (!user && window.location.pathname !== "/admin/login") {
          router.push("/admin/login")
        }
      } catch (error) {
        console.error("Error checking user:", error)
      } finally {
        setLoading(false)
      }
    }

    // Listen for auth changes
    const setupAuthListener = (client: NonNullable<typeof supabase>) => {
      const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user || null)
        if (!session?.user && window.location.pathname !== "/admin/login") {
          router.push("/admin/login")
        }
      })

      return () => {
        subscription?.unsubscribe()
      }
    }

    initializeAuth(supabase)
    const unsubscribe = setupAuthListener(supabase)

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe()
      }
    }
  }, [router])

  const handleLogout = async () => {
    // Check if Supabase client is initialized
    if (!supabase) {
      console.error('Supabase client not initialized')
      return
    }
    
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error("Error signing out:", error)
      }
      router.push("/admin/login")
      router.refresh()
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: BarChart3 },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <p className="text-amber-900">Loading...</p>
      </div>
    )
  }

  // If user is not logged in and not on login page, don't render the layout
  if (!user && window.location.pathname !== "/admin/login") {
    return null
  }

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-amber-100 border-amber-300 text-amber-900"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 bg-amber-800 text-amber-50 transition-all duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex h-16 items-center border-b border-amber-700 px-4">
            {sidebarCollapsed ? (
              <Link href="/admin" className="flex items-center justify-center w-full">
                <div className="bg-amber-600 rounded-lg w-8 h-8 flex items-center justify-center">
                  <span className="font-bold text-white">De</span>
                </div>
              </Link>
            ) : (
              <Link href="/admin" className="flex items-center gap-2">
                <div className="bg-amber-600 rounded-lg w-8 h-8 flex items-center justify-center">
                  <span className="font-bold text-white">De</span>
                </div>
                <span className="text-lg font-semibold">De-chickins</span>
              </Link>
            )}
            {/* Collapse/Expand button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="ml-auto text-amber-200 hover:text-white hover:bg-amber-700"
            >
              {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-amber-700 transition-colors ${
                    sidebarCollapsed ? 'justify-center' : ''
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  {!sidebarCollapsed && <span className="ml-3">{item.name}</span>}
                </Link>
              )
            })}
          </nav>

          {/* Sidebar footer */}
          <div className="border-t border-amber-700 p-4">
            <button
              onClick={handleLogout}
              className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-amber-700 transition-colors w-full text-left ${
                sidebarCollapsed ? 'justify-center' : ''
              }`}
            >
              <LogOut className="h-5 w-5" />
              {!sidebarCollapsed && <span className="ml-3">Logout</span>}
            </button>
            <Link href="/" className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-amber-700 transition-colors mt-2 ${
                sidebarCollapsed ? 'justify-center' : ''
              }`}>
              <Home className="h-5 w-5" />
              {!sidebarCollapsed && <span className="ml-3">Back to Site</span>}
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${
        sidebarCollapsed ? 'md:pl-20' : 'md:pl-64'
      } ${sidebarOpen ? 'pl-0' : 'pl-0'}`}>
        {/* Top bar */}
        <header className="sticky top-0 z-30 border-b border-amber-200 bg-amber-100/80 backdrop-blur-sm">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-amber-900"></h1>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="border-amber-300 text-amber-900 hover:bg-amber-100"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  )
}