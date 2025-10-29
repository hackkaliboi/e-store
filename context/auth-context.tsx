"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from '@/lib/supabase/client'
import { isAdmin } from '@/lib/supabase/auth'

type AuthContextType = {
  user: any
  isAdmin: boolean
  loading: boolean
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [isAdminUser, setIsAdminUser] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    // Get initial user state
    const getUser = async () => {
      try {
        // Use non-null assertion since we've already checked
        const { data: { user } } = await supabase!.auth.getUser()
        setUser(user)
        
        // Check if user is admin
        if (user) {
          console.log('Checking admin status for user:', user.email)
          const adminStatus = await isAdmin(user)
          console.log('Admin status result:', adminStatus)
          setIsAdminUser(adminStatus)
        }
      } catch (error) {
        console.error('Error getting user:', error)
        setUser(null)
        setIsAdminUser(false)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase!.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', _event, session?.user?.email || 'no user')
      const currentUser = session?.user || null
      setUser(currentUser)
      setLoading(false)
      
      // Check admin status when user changes
      if (currentUser) {
        console.log('Checking admin status for user:', currentUser.email)
        isAdmin(currentUser).then(result => {
          console.log('Admin status result:', result)
          setIsAdminUser(result)
        })
      } else {
        setIsAdminUser(false)
      }
      
      // Specifically handle SIGNED_OUT event
      if (_event === 'SIGNED_OUT') {
        console.log('User signed out, setting user to null')
        setUser(null)
        setIsAdminUser(false)
      }
    })

    return () => {
      console.log('Unsubscribing from auth state changes')
      subscription.unsubscribe()
    }
  }, [])

  const logout = async () => {
    if (!supabase) {
      return
    }
    
    try {
      console.log('Calling Supabase signOut')
      const { error } = await supabase!.auth.signOut()
      console.log('Supabase signOut result:', error)

      if (error) {
        console.error('Supabase sign out error:', error)
        throw error
      }

      console.log('Sign out successful')
      // Explicitly set user and admin status to null/false
      setUser(null)
      setIsAdminUser(false)
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAdmin: isAdminUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}