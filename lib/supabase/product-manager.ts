import { Product } from "@/lib/products"
import { supabase } from "./client"

// Get all products from Supabase
export const getAllProducts = async (): Promise<Product[]> => {
    console.log('getAllProducts called')
    // Return empty array if Supabase client is not initialized
    if (!supabase) {
        console.warn('Supabase client not initialized')
        return []
    }

    try {
        console.log('Fetching products from Supabase')
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching products:', error)
            return []
        }
        
        console.log('Products fetched successfully:', data?.length || 0)
        return data || []
    } catch (error) {
        console.error('Error fetching products:', error)
        return []
    }
}

// Get product by ID from Supabase
export const getProductById = async (id: string): Promise<Product | null> => {
    // Return null if Supabase client is not initialized
    if (!supabase) {
        console.warn('Supabase client not initialized')
        return null
    }

    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single()

        if (error) {
            console.error('Error fetching product:', error)
            return null
        }

        return data || null
    } catch (error) {
        console.error('Error fetching product:', error)
        return null
    }
}

// Get related products from Supabase
export const getRelatedProducts = async (currentProductId: string, category: string): Promise<Product[]> => {
    // Return empty array if Supabase client is not initialized
    if (!supabase) {
        console.warn('Supabase client not initialized')
        return []
    }

    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('category', category)
            .neq('id', currentProductId)
            .limit(3)

        if (error) {
            console.error('Error fetching related products:', error)
            return []
        }

        return data || []
    } catch (error) {
        console.error('Error fetching related products:', error)
        return []
    }
}

// Add a new product to Supabase
export const addProduct = async (product: Omit<Product, "id">): Promise<Product | null> => {
    // Return null if Supabase client is not initialized
    if (!supabase) {
        console.warn('Supabase client not initialized')
        return null
    }

    try {
        const { data, error } = await supabase
            .from('products')
            .insert([
                {
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    description: product.description,
                    category: product.category,
                    features: product.features,
                }
            ])
            .select()
            .single()

        if (error) {
            console.error('Error adding product:', error)
            return null
        }

        return data || null
    } catch (error) {
        console.error('Error adding product:', error)
        return null
    }
}

// Update an existing product in Supabase
export const updateProduct = async (id: string, updatedProduct: Partial<Product>): Promise<Product | null> => {
    // Return null if Supabase client is not initialized
    if (!supabase) {
        console.warn('Supabase client not initialized')
        return null
    }

    try {
        const { data, error } = await supabase
            .from('products')
            .update(updatedProduct)
            .eq('id', id)
            .select()
            .single()

        if (error) {
            console.error('Error updating product:', error)
            return null
        }

        return data || null
    } catch (error) {
        console.error('Error updating product:', error)
        return null
    }
}

// Delete a product from Supabase
export const deleteProduct = async (id: string): Promise<boolean> => {
    // Return false if Supabase client is not initialized
    if (!supabase) {
        console.warn('Supabase client not initialized')
        return false
    }

    try {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id)

        if (error) {
            console.error('Error deleting product:', error)
            return false
        }

        return true
    } catch (error) {
        console.error('Error deleting product:', error)
        return false
    }
}

// Upload an image to Supabase Storage
export const uploadProductImage = async (file: File, fileName: string): Promise<string | null> => {
    // Return null if Supabase client is not initialized
    if (!supabase) {
        console.warn('Supabase client not initialized')
        return null
    }

    try {
        console.log('Starting image upload process...')
        console.log('File details:', {
            name: file.name,
            size: file.size,
            type: file.type
        })

        // Check if user is authenticated
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            console.error('Authentication error:', authError?.message || 'User not authenticated');
            throw new Error('User not authenticated');
        }

        console.log('User authenticated:', user.email);

        // Sanitize filename
        const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_')
        const fileExt = sanitizedFileName.split('.').pop()
        const filePath = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
        console.log('Generated file path:', filePath)

        // Try to upload to products bucket first
        console.log('Attempting to upload to products bucket...')
        const { data, error: uploadError } = await supabase.storage
            .from('products')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            })

        if (uploadError) {
            console.error('Error uploading to products bucket:', uploadError)
            console.error('Error details:', {
                message: uploadError.message,
                code: (uploadError as any).code,
                statusCode: (uploadError as any).statusCode
            })

            // Try media bucket as fallback
            console.log('Attempting to upload to media bucket...')
            const { data: mediaData, error: mediaError } = await supabase.storage
                .from('media')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false
                })

            if (mediaError) {
                console.error('Error uploading to media bucket:', mediaError)
                console.error('Error details:', {
                    message: mediaError.message,
                    code: (mediaError as any).code,
                    statusCode: (mediaError as any).statusCode
                })

                // Provide more specific error information
                if (mediaError.message.includes('denied')) {
                    throw new Error('Permission denied. Please check storage policies.');
                } else if (mediaError.message.includes('size') || (mediaError as any).statusCode === 413) {
                    throw new Error('File too large. Please try a smaller image.');
                } else {
                    throw new Error(`Upload failed: ${mediaError.message}`);
                }
            }

            console.log('Upload successful to media bucket:', mediaData)

            // Get the public URL for the uploaded image
            const { data: { publicUrl } } = supabase.storage
                .from('media')
                .getPublicUrl(filePath)

            console.log('Generated public URL:', publicUrl)
            return publicUrl
        }

        console.log('Upload successful to products bucket:', data)

        // Get the public URL for the uploaded image
        const { data: { publicUrl } } = supabase.storage
            .from('products')
            .getPublicUrl(filePath)

        console.log('Generated public URL:', publicUrl)
        return publicUrl
    } catch (error) {
        console.error('Error uploading image:', error)
        throw error;
    }
}

// Delete an image from Supabase Storage
export const deleteProductImage = async (imageUrl: string): Promise<boolean> => {
    // Return false if Supabase client is not initialized
    if (!supabase) {
        console.warn('Supabase client not initialized')
        return false
    }

    try {
        // Extract the file path from the URL
        const url = new URL(imageUrl)
        const filePath = url.pathname.split('/').pop()

        if (!filePath) {
            console.error('Invalid image URL')
            return false
        }

        // Try to delete from products bucket first
        console.log('Attempting to delete from products bucket:', filePath)
        const { error: productsError } = await supabase.storage
            .from('products')
            .remove([filePath])

        // If that fails, try media bucket
        if (productsError) {
            console.log('Failed to delete from products bucket, trying media bucket...')
            const { error: mediaError } = await supabase.storage
                .from('media')
                .remove([filePath])

            if (mediaError) {
                console.error('Error deleting image:', mediaError)
                return false
            }
        }

        return true
    } catch (error) {
        console.error('Error deleting image:', error)
        return false
    }
}