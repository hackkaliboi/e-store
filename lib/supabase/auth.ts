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
        return { error: new Error('Supabase client not initialized') }
    }

    try {
        const { error } = await supabase.auth.signOut()

        if (error) {
            throw error
        }

        return { error: null }
    } catch (error) {
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

// Check if user is admin (in a real app, this would check a database table)
export const isAdmin = async (user: any) => {
    // For now, we'll check if the user's email is in a list of admin emails
    // In a production app, you would check a database table or use Supabase RLS
    const adminEmails = [
        "admin@dcchickin.com", // Add your admin email here
        // Add more admin emails as needed
    ]

    return user && adminEmails.includes(user.email)
}