const { createClient } = require('@supabase/supabase-js');

// These should match your .env.local values
const supabaseUrl = 'https://nspykfkhtsbnlwpiqikp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zcHlrZmtodHNibmx3cGlxaWtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NDgzNzMsImV4cCI6MjA3NzMyNDM3M30.0qRnD2Em2aF_ln7TOG9WyLa6R549R1kPQ4w1pDrXD3U';

console.log('Testing if products table exists...');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseAnonKey ? 'SET' : 'MISSING');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testProductsTable() {
    try {
        console.log('Attempting to connect to Supabase and check products table...');

        // Test if products table exists by trying to describe it
        const { data, error } = await supabase.from('products').select('id,name,price,category').limit(1);

        if (error) {
            console.error('Error accessing products table:', error);
            console.error('Error code:', error.code);
            console.error('Error message:', error.message);
            return;
        }

        console.log('Products table exists and is accessible!');
        console.log('Sample data:', data);

        // Also test inserting a dummy product to see if we have write access
        console.log('Testing write access...');
        const { data: insertData, error: insertError } = await supabase.from('products').insert([
            {
                name: 'Test Product',
                price: 1000,
                category: 'Test',
                description: 'Test product for checking database access'
            }
        ]).select();

        if (insertError) {
            console.error('Error inserting test product:', insertError);
            // This might fail due to RLS policies, which is expected if we're not authenticated as admin
            console.log('This is expected if RLS policies are in place and we are not authenticated as admin');
        } else {
            console.log('Write access successful!');
            console.log('Inserted data:', insertData);

            // Clean up the test product
            if (insertData && insertData[0] && insertData[0].id) {
                const { error: deleteError } = await supabase.from('products').delete().eq('id', insertData[0].id);
                if (deleteError) {
                    console.error('Error cleaning up test product:', deleteError);
                } else {
                    console.log('Test product cleaned up successfully');
                }
            }
        }
    } catch (error) {
        console.error('Test error:', error);
    }
}

testProductsTable();