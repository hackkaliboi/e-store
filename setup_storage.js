// Script to manually set up Supabase storage buckets and policies
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

async function setupStorage() {
    console.log('Setting up Supabase Storage...');

    try {
        // Create storage bucket for product images
        console.log('Creating products bucket...');
        const { data: productsData, error: productsError } = await supabase.storage.createBucket('products', {
            public: true
        });

        if (productsError) {
            console.log('Products bucket creation error (might already exist):', productsError.message);
        } else {
            console.log('Products bucket created:', productsData);
        }

        // Create storage bucket for other media (avatars, etc.)
        console.log('Creating media bucket...');
        const { data: mediaData, error: mediaError } = await supabase.storage.createBucket('media', {
            public: true
        });

        if (mediaError) {
            console.log('Media bucket creation error (might already exist):', mediaError.message);
        } else {
            console.log('Media bucket created:', mediaData);
        }

        console.log('Storage setup completed!');
    } catch (error) {
        console.error('Error setting up storage:', error);
    }
}

// Run the setup
setupStorage();