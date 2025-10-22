import { Product } from "./products"
import {
  getAllProducts as supabaseGetAllProducts,
  getProductById as supabaseGetProductById,
  getRelatedProducts as supabaseGetRelatedProducts,
  addProduct as supabaseAddProduct,
  updateProduct as supabaseUpdateProduct,
  deleteProduct as supabaseDeleteProduct
} from "./supabase/product-manager"

// Export Supabase functions directly
export const getAllProducts = supabaseGetAllProducts
export const getProductById = supabaseGetProductById
export const getRelatedProducts = supabaseGetRelatedProducts
export const addProduct = supabaseAddProduct
export const updateProduct = supabaseUpdateProduct
export const deleteProduct = supabaseDeleteProduct

// Simple admin authentication (in a real app, this would be more secure)
const ADMIN_PASSWORD = "admin123" // This should be stored securely in a real app

export const authenticateAdmin = (password: string): boolean => {
  return password === ADMIN_PASSWORD
}