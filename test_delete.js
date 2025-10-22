// Simple test script to verify delete functionality
const { createClient } = require('@supabase/supabase-js')

// These should match your .env.local file
const supabaseUrl = 'https://njovhfjtdjhwvkybvpqo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qb3ZoZmp0ZGpod3ZreWJ2cHFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExMjc1NzYsImV4cCI6MjA3NjcwMzU3Nn0.nbECDmz-DkRsRNUwAE3qRlrZTKeJpjZPauljVtMByRU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testDelete() {
    try {
        // First, let's see what products we have
        const { data: products, error: fetchError } = await supabase
            .from('products')
            .select('*')

        if (fetchError) {
            console.log('Error fetching products:', fetchError)
            return
        }

        console.log('Current products:')
        products.forEach(product => {
            console.log(`- ${product.name} (ID: ${product.id})`)
        })

        // If we have products, let's try to delete one
        if (products.length > 0) {
            const productToDelete = products[0]
            console.log(`\nAttempting to delete: ${productToDelete.name}`)

            const { error: deleteError } = await supabase
                .from('products')
                .delete()
                .eq('id', productToDelete.id)

            if (deleteError) {
                console.log('Error deleting product:', deleteError)
                return
            }

            console.log('Product deleted successfully!')

            // Verify the deletion
            const { data: remainingProducts, error: fetchError2 } = await supabase
                .from('products')
                .select('*')

            if (fetchError2) {
                console.log('Error fetching products after deletion:', fetchError2)
                return
            }

            console.log('\nProducts after deletion:')
            remainingProducts.forEach(product => {
                console.log(`- ${product.name} (ID: ${product.id})`)
            })
        } else {
            console.log('No products found to delete')
        }
    } catch (error) {
        console.log('Error:', error)
    }
}

testDelete()