"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    addProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    uploadProductImage
} from "@/lib/supabase/product-manager"
import { Product } from "@/lib/products"
import { formatCurrency } from "@/lib/utils"
import { PlusCircle, Edit3, Trash2, Search, Upload } from "lucide-react"
import { supabase } from "@/lib/supabase/client"

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        image: "",
        description: "",
        category: "",
        features: "",
    })
    const [message, setMessage] = useState<{ type: string, text: string } | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [loading, setLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState(true) // Set to true to bypass auth
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    useEffect(() => {
        // For development, bypass authentication and load products directly
        loadProducts()

        // Comment out the original auth code
        /*
        const checkAdminAccess = async () => {
            // Check if Supabase client is initialized
            if (!supabase) {
                console.error('Supabase client not initialized')
                // In a real app, you might want to redirect to an error page
                setLoading(false)
                return
            }

            try {
                const { data: { user } } = await supabase.auth.getUser()

                // For now, we'll allow access if user is logged in
                // In a production app, you would check if the user has admin privileges
                if (!user) {
                    router.push("/admin/login")
                    return
                }

                setIsAdmin(true)
                loadProducts()
            } catch (error) {
                console.error("Error checking admin access:", error)
                setLoading(false)
            }
        }

        checkAdminAccess()
        */
    }, [router])

    const loadProducts = async () => {
        setLoading(true)
        try {
            const fetchedProducts = await getAllProducts()
            setProducts(fetchedProducts)
        } catch (error) {
            console.error("Error loading products:", error)
            setMessage({ type: "error", text: "Failed to load products" })
        } finally {
            setLoading(false)
        }
    }

    // Get unique categories for filter
    const categories = [...new Set(products.map(product => product.category))]

    // Filter products based on search and category
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return
        }

        const file = e.target.files[0]
        const fileName = file.name

        setUploading(true)
        try {
            const publicUrl = await uploadProductImage(file, fileName)

            if (publicUrl) {
                setFormData(prev => ({ ...prev, image: publicUrl }))
                setMessage({ type: "success", text: "Image uploaded successfully!" })
            } else {
                setMessage({ type: "error", text: "Failed to upload image!" })
            }
        } catch (error) {
            setMessage({ type: "error", text: "Error uploading image: " + (error as Error).message })
        } finally {
            setUploading(false)
            // Clear the file input
            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
        }
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const productData = {
                name: formData.name,
                price: parseFloat(formData.price),
                image: formData.image,
                description: formData.description,
                category: formData.category,
                features: formData.features.split(",").map(f => f.trim()).filter(f => f),
            }

            if (editingProduct) {
                // Update existing product
                const updatedProduct = await updateProduct(editingProduct.id, productData)
                if (updatedProduct) {
                    setMessage({ type: "success", text: "Product updated successfully!" })
                } else {
                    setMessage({ type: "error", text: "Failed to update product!" })
                }
            } else {
                // Add new product
                const newProduct = await addProduct(productData)
                if (newProduct) {
                    setMessage({ type: "success", text: "Product added successfully!" })
                } else {
                    setMessage({ type: "error", text: "Failed to add product!" })
                }
            }

            // Reset form and reload products
            setFormData({
                name: "",
                price: "",
                image: "",
                description: "",
                category: "",
                features: "",
            })
            setEditingProduct(null)
            await loadProducts()

            // Clear message after 3 seconds
            setTimeout(() => setMessage(null), 3000)
        } catch (error) {
            setMessage({ type: "error", text: "Error saving product: " + (error as Error).message })
            setTimeout(() => setMessage(null), 3000)
        }
    }

    const handleEdit = (product: Product) => {
        setEditingProduct(product)
        setFormData({
            name: product.name,
            price: product.price.toString(),
            image: product.image,
            description: product.description,
            category: product.category,
            features: product.features.join(", "),
        })
    }

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const success = await deleteProduct(id)
                if (success) {
                    setMessage({ type: "success", text: "Product deleted successfully!" })
                    await loadProducts()
                } else {
                    setMessage({ type: "error", text: "Failed to delete product!" })
                }
            } catch (error) {
                setMessage({ type: "error", text: "Error deleting product: " + (error as Error).message })
            }
            setTimeout(() => setMessage(null), 3000)
        }
    }

    const handleCancelEdit = () => {
        setEditingProduct(null)
        setFormData({
            name: "",
            price: "",
            image: "",
            description: "",
            category: "",
            features: "",
        })
    }

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    // Always allow access for development
    /*
    if (!isAdmin) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-amber-900">Checking access...</p>
            </div>
        )
    }
    */

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-amber-900">Products Management</h2>
                <p className="text-amber-900/70">Add, edit, and manage your De-chickins clothing products</p>
            </div>

            {message && (
                <div className={`p-3 rounded ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {message.text}
                </div>
            )}

            {loading && (
                <div className="text-center py-4">
                    <p className="text-amber-900">Loading products...</p>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Product Form */}
                <Card className="bg-white lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="text-amber-900 flex items-center">
                            {editingProduct ? <Edit3 className="w-5 h-5 mr-2" /> : <PlusCircle className="w-5 h-5 mr-2" />}
                            {editingProduct ? "Edit Product" : "Add New Product"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="name" className="text-amber-900">Product Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="border-amber-300 focus:ring-amber-500"
                                />
                            </div>

                            <div>
                                <Label htmlFor="price" className="text-amber-900">Price (₦)</Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required
                                    className="border-amber-300 focus:ring-amber-500"
                                />
                            </div>

                            <div>
                                <Label htmlFor="image" className="text-amber-900">Image</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="image"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleInputChange}
                                        placeholder="Enter image URL or upload an image"
                                        className="border-amber-300 focus:ring-amber-500"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="border-amber-300 text-amber-900 hover:bg-amber-100"
                                        onClick={triggerFileInput}
                                        disabled={uploading}
                                    >
                                        <Upload className="w-4 h-4" />
                                    </Button>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageUpload}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                </div>
                                {uploading && (
                                    <p className="text-sm text-amber-900/70 mt-1">Uploading image...</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="category" className="text-amber-900">Category</Label>
                                <Input
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    required
                                    className="border-amber-300 focus:ring-amber-500"
                                />
                            </div>

                            <div>
                                <Label htmlFor="features" className="text-amber-900">Features (comma separated)</Label>
                                <Input
                                    id="features"
                                    name="features"
                                    value={formData.features}
                                    onChange={handleInputChange}
                                    placeholder="Feature 1, Feature 2, Feature 3"
                                    required
                                    className="border-amber-300 focus:ring-amber-500"
                                />
                            </div>

                            <div>
                                <Label htmlFor="description" className="text-amber-900">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={4}
                                    required
                                    className="border-amber-300 focus:ring-amber-500"
                                />
                            </div>

                            <div className="flex gap-2">
                                <Button type="submit" className="bg-amber-700 hover:bg-amber-800 text-white">
                                    {editingProduct ? "Update Product" : "Add Product"}
                                </Button>
                                {editingProduct && (
                                    <Button type="button" variant="outline" className="border-amber-300 text-amber-900 hover:bg-amber-100" onClick={handleCancelEdit}>
                                        Cancel
                                    </Button>
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Products List and Filters */}
                <Card className="bg-white lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-amber-900">Current Products ({products.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Filters */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-900/50 w-4 h-4" />
                                <Input
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 border-amber-300 focus:ring-amber-500"
                                />
                            </div>
                            <div>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="border border-amber-300 rounded-md px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                                >
                                    <option value="all">All Categories</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {filteredProducts.length === 0 ? (
                            <p className="text-amber-900/70 text-center py-8">No products found.</p>
                        ) : (
                            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                                {filteredProducts.map((product) => (
                                    <div key={product.id} className="border border-amber-200 rounded-lg p-4">
                                        <div className="flex justify-between">
                                            <h3 className="font-semibold text-amber-900">{product.name}</h3>
                                            <span className="font-bold text-amber-700">{formatCurrency(product.price)}</span>
                                        </div>
                                        <p className="text-sm text-amber-900/70 mt-1">{product.category}</p>
                                        <p className="text-sm mt-2 line-clamp-2 text-amber-900/80">{product.description}</p>
                                        <div className="flex gap-2 mt-3">
                                            <Button size="sm" onClick={() => handleEdit(product)} className="bg-amber-700 hover:bg-amber-800 text-white">
                                                <Edit3 className="w-4 h-4 mr-1" />
                                                Edit
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleDelete(product.id)}
                                                className="bg-red-600 hover:bg-red-700"
                                            >
                                                <Trash2 className="w-4 h-4 mr-1" />
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}