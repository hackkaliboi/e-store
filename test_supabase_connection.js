const { createClient } = require('@supabase/supabase-js');

// These should match your .env.local values
const supabaseUrl = 'https://nspykfkhtsbnlwpiqikp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zcHlrZmtodHNibmx3cGlxaWtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NDgzNzMsImV4cCI6MjA3NzMyNDM3M30.0qRnD2Em2aF_ln7TOG9WyLa6R549R1kPQ4w1pDrXD3U';

console.log('Testing Supabase connection...');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseAnonKey ? 'SET' : 'MISSING');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
    try {
        console.log('Attempting to connect to Supabase...');

        // Test basic connection by fetching a simple query
        const { data, error } = await supabase.from('products').select('id').limit(1);

        if (error) {
            console.error('Supabase test error:', error);
            return;
        }

        console.log('Supabase test successful!');
        console.log('Data:', data);
    } catch (error) {
        console.error('Test error:', error);
    }
}

testConnection();