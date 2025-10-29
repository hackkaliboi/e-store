// Script to set up only the storage buckets and policies
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

async function setupStorageOnly() {
    console.log('Setting up Supabase Storage Buckets and Policies...');

    try {
        // Create or update the products bucket
        console.log('Setting up products bucket...');
        const { data: productsData, error: productsError } = await supabase.rpc('storage_upsert_bucket', {
            bucket_id: 'products',
            name: 'products',
            owner: null,
            public: true
        });

        if (productsError) {
            console.log('Attempting alternative method for products bucket...');
            // Try direct insert method
            const { data: insertData, error: insertError } = await supabase
                .from('storage.buckets')
                .upsert({
                    id: 'products',
                    name: 'products',
                    public: true
                }, {
                    onConflict: 'id'
                });

            if (insertError) {
                console.log('Products bucket setup error:', insertError.message);
            } else {
                console.log('Products bucket set up successfully');
            }
        } else {
            console.log('Products bucket set up:', productsData);
        }

        // Create or update the media bucket
        console.log('Setting up media bucket...');
        const { data: mediaData, error: mediaError } = await supabase.rpc('storage_upsert_bucket', {
            bucket_id: 'media',
            name: 'media',
            owner: null,
            public: true
        });

        if (mediaError) {
            console.log('Attempting alternative method for media bucket...');
            // Try direct insert method
            const { data: insertData, error: insertError } = await supabase
                .from('storage.buckets')
                .upsert({
                    id: 'media',
                    name: 'media',
                    public: true
                }, {
                    onConflict: 'id'
                });

            if (insertError) {
                console.log('Media bucket setup error:', insertError.message);
            } else {
                console.log('Media bucket set up successfully');
            }
        } else {
            console.log('Media bucket set up:', mediaData);
        }

        console.log('Storage setup completed!');

    } catch (error) {
        console.error('Error setting up storage:', error);
    }
}

// Run the setup
setupStorageOnly();