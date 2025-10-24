// Simple test script to verify Supabase connection
const { createClient } = require('@supabase/supabase-js')

// These should match your .env.local file
const supabaseUrl = 'https://tpxexyirxbngrahrfcmn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRweGV4eWlyeGJuZ3JhaHJmY21uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMTY0ODEsImV4cCI6MjA3Njg5MjQ4MX0.ec_OpibImkwVQTjz7C3SbcxPD-_wpXyS-TMZOK6OoQU'

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