"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase/client"

export default function TestProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [profiles, setProfiles] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!supabase) {
        setError("Supabase client not initialized")
        return
      }

      try {
        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError) {
          setError(`Error getting user: ${userError.message}`)
          return
        }
        setUser(user)

        // Get all profiles
        const { data, error: profilesError } = await supabase
          .from('profiles')
          .select('*')

        if (profilesError) {
          setError(`Error getting profiles: ${profilesError.message}`)
        } else {
          setProfiles(data || [])
        }
      } catch (err) {
        setError(`Unexpected error: ${err}`)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-amber-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-amber-900 mb-6">Profile Test</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-amber-800">Current User:</h2>
            <pre className="bg-amber-100 p-4 rounded mt-2 text-sm overflow-auto">
              {user ? JSON.stringify(user, null, 2) : "No user"}
            </pre>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-amber-800">All Profiles:</h2>
            <pre className="bg-amber-100 p-4 rounded mt-2 text-sm overflow-auto">
              {JSON.stringify(profiles, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}