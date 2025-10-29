// Simple test script to verify Supabase connection
require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js')

// These should match your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.log('⚠️  Please make sure your .env.local file contains:');
    console.log('   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url');
    console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key');
    process.exit(1);
}

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