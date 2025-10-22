// Simple test script to verify Supabase connection
const { createClient } = require('@supabase/supabase-js')

// These should match your .env.local file
const supabaseUrl = 'https://njovhfjtdjhwvkybvpqo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qb3ZoZmp0ZGpod3ZreWJ2cHFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExMjc1NzYsImV4cCI6MjA3NjcwMzU3Nn0.nbECDmz-DkRsRNUwAE3qRlrZTKeJpjZPauljVtMByRU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
    try {
        // Test query to check if we can connect and read from the products table
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .limit(1)

        if (error) {
            console.log('Error connecting to Supabase:', error)
            return
        }

        console.log('Successfully connected to Supabase!')
        console.log('Sample data:', data)
    } catch (error) {
        console.log('Error:', error)
    }
}

testConnection()