import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET() {
    if (!supabase) {
        return NextResponse.json({ error: 'Supabase client not initialized' }, { status: 500 });
    }

    try {
        // Test storage access
        const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();

        if (bucketsError) {
            console.error('Buckets error:', bucketsError);
            return NextResponse.json({
                error: 'Failed to list buckets',
                details: bucketsError.message
            }, { status: 500 });
        }

        // Test specific bucket access
        let productsBucketAccessible = false;
        let productsBucketError = null;

        try {
            const { data: productsData, error: productsError } = await supabase.storage
                .from('products')
                .list('', { limit: 1 });

            if (productsError) {
                productsBucketError = productsError.message;
            } else {
                productsBucketAccessible = true;
            }
        } catch (err) {
            productsBucketError = err instanceof Error ? err.message : 'Unknown error';
        }

        // Test media bucket access
        let mediaBucketAccessible = false;
        let mediaBucketError = null;

        try {
            const { data: mediaData, error: mediaError } = await supabase.storage
                .from('media')
                .list('', { limit: 1 });

            if (mediaError) {
                mediaBucketError = mediaError.message;
            } else {
                mediaBucketAccessible = true;
            }
        } catch (err) {
            mediaBucketError = err instanceof Error ? err.message : 'Unknown error';
        }

        return NextResponse.json({
            success: true,
            buckets,
            productsBucket: {
                accessible: productsBucketAccessible,
                error: productsBucketError
            },
            mediaBucket: {
                accessible: mediaBucketAccessible,
                error: mediaBucketError
            }
        });
    } catch (error) {
        console.error('Storage test error:', error);
        return NextResponse.json({
            error: 'Storage test failed',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}