"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase/client"
import { isAdmin } from "@/lib/supabase/auth"

export default function TestAdminCheckPage() {
  const [user, setUser] = useState<any>(null)
  const [adminStatus, setAdminStatus] = useState<boolean | null>(null)
  const [profileData, setProfileData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!supabase) {
        console.error("Supabase client not initialized")
        setLoading(false)
        return
      }

      try {
        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError) {
          console.error("Error getting user:", userError)
          setLoading(false)
          return
        }
        setUser(user)

        if (user) {
          // Check admin status
          console.log("Checking admin status for user:", user)
          const isAdminResult = await isAdmin(user)
          setAdminStatus(isAdminResult)
          console.log("Admin status result:", isAdminResult)

          // Get profile data directly
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

          if (error) {
            console.error("Error getting profile:", error)
          } else {
            setProfileData(data)
          }
        }
      } catch (error) {
        console.error("Error in checkAdminStatus:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAdminStatus()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <p className="text-amber-900">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-amber-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-amber-900 mb-6">Admin Status Debug</h1>
        
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-amber-800">User Info:</h2>
            <pre className="bg-amber-100 p-4 rounded mt-2 text-sm overflow-auto">
              {user ? JSON.stringify(user, null, 2) : "No user"}
            </pre>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-amber-800">Admin Status:</h2>
            <p className="text-lg mt-2">
              {adminStatus === null ? "Unknown" : adminStatus ? "✅ Admin" : "❌ Not Admin"}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-amber-800">Profile Data:</h2>
            <pre className="bg-amber-100 p-4 rounded mt-2 text-sm overflow-auto">
              {profileData ? JSON.stringify(profileData, null, 2) : "No profile data"}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}