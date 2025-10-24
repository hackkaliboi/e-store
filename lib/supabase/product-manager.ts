import { Product } from "@/lib/products"
import { supabase } from "./client"

// Get all products from Supabase
export const getAllProducts = async (): Promise<Product[]> => {
    // Return empty array if Supabase client is not initialized
    if (!supabase) {
        console.warn('Supabase client not initialized')
        return []
    }

    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching products:', error)
            return []
        }

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
        const fileExt = fileName.split('.').pop()
        const filePath = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

        const { error: uploadError } = await supabase.storage
            .from('products')
            .upload(filePath, file)

        if (uploadError) {
            console.error('Error uploading image:', uploadError)
            return null
        }

        // Get the public URL for the uploaded image
        const { data: { publicUrl } } = supabase.storage
            .from('products')
            .getPublicUrl(filePath)

        return publicUrl
    } catch (error) {
        console.error('Error uploading image:', error)
        return null
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

        const { error } = await supabase.storage
            .from('products')
            .remove([filePath])

        if (error) {
            console.error('Error deleting image:', error)
            return false
        }

        return true
    } catch (error) {
        console.error('Error deleting image:', error)
        return false
    }
}