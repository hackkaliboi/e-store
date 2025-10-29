const { createClient } = require('@supabase/supabase-js');

// These should match your .env.local values
const supabaseUrl = 'https://pnqdusvmdtoxavkkhlky.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBucWR1c3ZtZHRveGF2a2tobGt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1NTk1NzMsImV4cCI6MjA3NzEzNTU3M30.xaiad0aFSQhCAyLRohd0bGXVRZICvzEJXPwNKCLiQd0';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testStorage() {
    console.log('Testing Supabase storage access...');

    try {
        // Test listing buckets
        console.log('Listing storage buckets...');
        const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();

        if (bucketsError) {
            console.error('Error listing buckets:', bucketsError);
        } else {
            console.log('Buckets found:', buckets);
        }

        // Test products bucket access
        console.log('Testing products bucket access...');
        const { data: productsData, error: productsError } = await supabase.storage
            .from('products')
            .list('', { limit: 1 });

        if (productsError) {
            console.error('Error accessing products bucket:', productsError);
        } else {
            console.log('Products bucket accessible');
        }

        // Test media bucket access
        console.log('Testing media bucket access...');
        const { data: mediaData, error: mediaError } = await supabase.storage
            .from('media')
            .list('', { limit: 1 });

        if (mediaError) {
            console.error('Error accessing media bucket:', mediaError);
        } else {
            console.log('Media bucket accessible');
        }

    } catch (error) {
        console.error('Unexpected error:', error);
    }
}

testStorage();