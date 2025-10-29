import { supabase } from "./client"

// Sign up a new user
export const signUp = async (email: string, password: string) => {
    // Check if Supabase client is initialized
    if (!supabase) {
        return { data: null, error: new Error('Supabase client not initialized') }
    }

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        })

        if (error) {
            throw error
        }

        return { data, error: null }
    } catch (error) {
        return { data: null, error }
    }
}

// Sign in a user
export const signIn = async (email: string, password: string) => {
    // Check if Supabase client is initialized
    if (!supabase) {
        return { data: null, error: new Error('Supabase client not initialized') }
    }

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            throw error
        }

        return { data, error: null }
    } catch (error) {
        return { data: null, error }
    }
}

// Sign out the current user
export const signOut = async () => {
    // Check if Supabase client is initialized
    if (!supabase) {
        console.log('Supabase client not initialized')
        return { error: new Error('Supabase client not initialized') }
    }

    try {
        console.log('Calling Supabase signOut')
        const { error } = await supabase.auth.signOut()
        console.log('Supabase signOut result:', error)

        if (error) {
            console.error('Supabase sign out error:', error)
            throw error
        }

        console.log('Sign out successful')
        return { error: null }
    } catch (error) {
        console.error('Sign out error:', error)
        return { error }
    }
}

// Get the current user
export const getCurrentUser = async () => {
    // Check if Supabase client is initialized
    if (!supabase) {
        return { data: null, error: new Error('Supabase client not initialized') }
    }

    try {
        const { data, error } = await supabase.auth.getUser()

        if (error) {
            throw error
        }

        return { data: data.user, error: null }
    } catch (error) {
        return { data: null, error }
    }
}

// Update a user's profile type to admin
export const addAdminUser = async (userId: string) => {
    // Check if Supabase client is initialized
    if (!supabase) {
        return { error: new Error('Supabase client not initialized') }
    }

    try {
        // First check if profile exists
        const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', userId)
            .single()

        if (profileError || !profileData) {
            // If profile doesn't exist, create it
            const { error: insertError } = await supabase
                .from('profiles')
                .insert({
                    id: userId,
                    profile_type: 'admin'
                })

            if (insertError) {
                throw insertError
            }
        } else {
            // If profile exists, update the profile_type
            const { error: updateError } = await supabase
                .from('profiles')
                .update({ profile_type: 'admin' })
                .eq('id', userId)

            if (updateError) {
                throw updateError
            }
        }

        return { error: null }
    } catch (error) {
        return { error }
    }
}

// Check if user is admin (checks profile type first, then falls back to email list)
export const isAdmin = async (user: any) => {
    // Check if Supabase client is initialized
    if (!supabase || !user) {
        console.log('Supabase client not initialized or no user provided')
        return false
    }

    try {
        console.log('Checking admin status for user:', user.id, user.email)

        // Check the profile type in the profiles table
        const { data, error } = await supabase
            .from('profiles')
            .select('profile_type')
            .eq('id', user.id)
            .single()

        if (error) {
            console.log('Database profile check error (falling back to email check):', error)
            // Fallback to email-based check
            const emailCheck = checkAdminByEmail(user.email)
            console.log('Email check result:', emailCheck)
            return emailCheck
        }

        console.log('Database profile check result:', data)
        return data?.profile_type === 'admin' || false
    } catch (error) {
        console.error('Error checking admin status (falling back to email check):', error)
        // Fallback to email-based check
        const emailCheck = checkAdminByEmail(user.email)
        console.log('Email check result:', emailCheck)
        return emailCheck
    }
}

// Helper function to check admin status by email
const checkAdminByEmail = (email: string) => {
    console.log('Checking admin status by email:', email)
    const adminEmails = [
        "admin@dcchickin.com",
        "admin@de-chickins.com",
        // Add more admin emails as needed
    ]
    const isAdmin = adminEmails.includes(email)
    console.log('Email admin check result:', isAdmin)
    return isAdmin
}