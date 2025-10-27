import { useEffect, useState } from 'react'
import { supabase } from './client'

export const useAuth = () => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if Supabase client is initialized
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
      } catch (error) {
        console.error('Error getting user:', error)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase!.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return { user, loading }
}