// Test script to verify Supabase storage setup
// Run this after setting up your Supabase project and running the storage setup SQL

const { createClient } = require('@supabase/supabase-js');

// Replace these with your actual Supabase project URL and service role key
const supabaseUrl = process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY || 'YOUR_SERVICE_ROLE_KEY';

// Check if environment variables are set
if (supabaseUrl === 'YOUR_SUPABASE_URL' || supabaseServiceRole === 'YOUR_SERVICE_ROLE_KEY') {
    console.log('⚠️  Please set your Supabase credentials as environment variables:');
    console.log('   export SUPABASE_URL=your_supabase_url');
    console.log('   export SUPABASE_SERVICE_ROLE_KEY=your_service_role_key');
    console.log('');
    console.log('Or replace the placeholder values in this file.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRole);

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

        // Test uploading a small file to products bucket
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

    } catch (error) {
        console.error('Unexpected error:', error);
    }
}

// Run the test
testStorageSetup();