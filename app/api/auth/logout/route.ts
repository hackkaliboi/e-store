import { NextResponse } from 'next/server'
import { signOut } from '@/lib/supabase/auth'

export async function POST() {
  try {
    const { error } = await signOut()
    
    if (error) {
      // Handle error properly
      if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      } else {
        return NextResponse.json({ error: 'Failed to logout' }, { status: 500 })
      }
    }
    
    return NextResponse.json({ message: 'Logged out successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to logout' }, { status: 500 })
  }
}