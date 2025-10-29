// Script to verify that storage is working after setup
require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

// Use the same environment variables as the app
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.log('⚠️  Please make sure your .env.local file contains:');
    console.log('   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url');
    console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function verifyStorage() {
    console.log('Verifying Supabase Storage Setup...');

    try {
        // List all buckets using the storage API
        console.log('Listing buckets via storage API...');
        const { data: buckets, error: bucketsError } = await supabase
            .storage
            .listBuckets();

        if (bucketsError) {
            console.error('Error listing buckets:', bucketsError);
            console.error('Error details:', {
                message: bucketsError.message,
                code: bucketsError.code,
                statusCode: bucketsError.statusCode
            });
            return;
        }

        console.log('Available buckets:', buckets);

        // If we have buckets, try to upload to the first one
        if (buckets && buckets.length > 0) {
            const firstBucket = buckets[0];
            console.log(`Testing upload to bucket: ${firstBucket.name}`);

            const testFile = new Blob(['Hello, World!'], { type: 'text/plain' });
            const fileName = `test-upload-${Date.now()}.txt`;

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from(firstBucket.name)
                .upload(fileName, testFile, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (uploadError) {
                console.error(`❌ Error uploading test file to ${firstBucket.name}:`, uploadError);
                console.error('Error details:', {
                    message: uploadError.message,
                    code: uploadError.code,
                    status: uploadError.status
                });
                return;
            }

            console.log(`✅ Test file uploaded successfully to ${firstBucket.name}:`, uploadData);

            // Get the public URL for the uploaded file
            const { data: { publicUrl } } = supabase.storage
                .from(firstBucket.name)
                .getPublicUrl(fileName);

            console.log('Public URL:', publicUrl);

            // Clean up - delete the test file
            const { error: deleteError } = await supabase.storage
                .from(firstBucket.name)
                .remove([fileName]);

            if (deleteError) {
                console.error('Error deleting test file:', deleteError);
            } else {
                console.log('✅ Test file cleaned up successfully');
            }

            console.log('✅ Storage verification completed successfully!');
        } else {
            console.log('No buckets found. Please create buckets in your Supabase dashboard.');
        }
    } catch (error) {
        console.error('Unexpected error:', error);
    }
}

// Run the verification
verifyStorage();