import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET() {
  console.log('Testing Supabase connection from API route...');

  if (!supabase) {
    console.error('Supabase client not initialized');
    return NextResponse.json({ error: 'Supabase client not initialized' }, { status: 500 });
  }

  try {
    // Test basic connection by fetching a simple query
    const { data, error } = await supabase.from('products').select('id').limit(1);

    if (error) {
      console.error('Supabase test error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('Supabase test successful:', data);
    return NextResponse.json({ success: true, data: { productCount: data.length } });
  } catch (error) {
    console.error('Test error:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}