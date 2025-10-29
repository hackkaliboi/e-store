import { NextResponse } from 'next/server'
import { signOut } from '@/lib/supabase/auth'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    console.log('Logout API called')
    const { error } = await signOut()
    
    if (error) {
      console.error('Sign out error:', error)
      // Handle error properly
      if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      } else {
        return NextResponse.json({ error: 'Failed to logout' }, { status: 500 })
      }
    }
    
    console.log('Logout successful')
    // Clear any auth-related cookies if needed
    const cookieStore = cookies()
    // Note: Supabase handles cookie clearing automatically, but you can add custom logic here if needed
    
    // Add a small delay to ensure the logout is fully processed
    await new Promise(resolve => setTimeout(resolve, 100))
    
    return NextResponse.json({ message: 'Logged out successfully' })
  } catch (error) {
    console.error('Unexpected error during logout:', error)
    return NextResponse.json({ error: 'Failed to logout' }, { status: 500 })
  }
}