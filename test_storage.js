// Test script to verify Supabase storage setup
// Run this after setting up your Supabase project and running the storage setup SQL

require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

// Use the same environment variables as the app
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
    console.log('⚠️  Please make sure your .env.local file contains:');
    console.log('   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url');
    console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testStorageSetup() {
    console.log('Testing Supabase Storage Setup...');

    try {
        // List all buckets
        const { data: buckets, error: bucketsError } = await supabase
            .storage
            .listBuckets();

        if (bucketsError) {
            console.error('Error listing buckets:', bucketsError);
            return;
        }

        console.log('Available buckets:', buckets);

        // Check if 'products' bucket exists
        const productsBucket = buckets.find(bucket => bucket.name === 'products');
        if (productsBucket) {
            console.log('✅ Products bucket exists');
        } else {
            console.log('❌ Products bucket not found');
        }

        // Check if 'media' bucket exists
        const mediaBucket = buckets.find(bucket => bucket.name === 'media');
        if (mediaBucket) {
            console.log('✅ Media bucket exists');
        } else {
            console.log('❌ Media bucket not found');
        }

        // If buckets exist, test uploading a small file to products bucket
        if (productsBucket) {
            console.log('Testing upload to products bucket...');
            const testFile = new Blob(['Hello, World!'], { type: 'text/plain' });
            const fileName = `test-upload-${Date.now()}.txt`;

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('products')
                .upload(fileName, testFile, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (uploadError) {
                console.error('Error uploading test file:', uploadError);
                // Log more details about the error
                console.error('Error code:', uploadError.code);
                console.error('Error message:', uploadError.message);
                console.error('Error status:', uploadError.status);
            } else {
                console.log('✅ Test file uploaded successfully:', uploadData);

                // Clean up - delete the test file
                const { error: deleteError } = await supabase.storage
                    .from('products')
                    .remove([fileName]);

                if (deleteError) {
                    console.error('Error deleting test file:', deleteError);
                } else {
                    console.log('✅ Test file cleaned up successfully');
                }
            }
        }

    } catch (error) {
        console.error('Unexpected error:', error);
    }
}

// Run the test
testStorageSetup();