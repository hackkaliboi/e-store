"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
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
  authenticateAdmin 
} from "@/lib/product-manager"
import { Product } from "@/lib/products"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState("")
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
  const [message, setMessage] = useState<{type: string, text: string} | null>(null)

  // Load products on component mount
  useEffect(() => {
    if (isLoggedIn) {
      loadProducts()
    }
  }, [isLoggedIn])

  const loadProducts = () => {
    const products = getAllProducts()
    setProducts(products)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (authenticateAdmin(password)) {
      setIsLoggedIn(true)
      setMessage({type: "success", text: "Login successful!"})
    } else {
      setMessage({type: "error", text: "Invalid password!"})
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setPassword("")
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = (e: React.FormEvent) => {
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
        const updatedProduct = updateProduct(editingProduct.id, productData)
        if (updatedProduct) {
          setMessage({type: "success", text: "Product updated successfully!"})
        } else {
          setMessage({type: "error", text: "Failed to update product!"})
        }
      } else {
        // Add new product
        addProduct(productData)
        setMessage({type: "success", text: "Product added successfully!"})
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
      loadProducts()
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      setMessage({type: "error", text: "Error saving product: " + (error as Error).message})
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

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const success = deleteProduct(id)
      if (success) {
        setMessage({type: "success", text: "Product deleted successfully!"})
        loadProducts()
      } else {
        setMessage({type: "error", text: "Failed to delete product!"})
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

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Admin Login</CardTitle>
              </CardHeader>
              <CardContent>
                {message && (
                  <div className={`mb-4 p-3 rounded ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {message.text}
                  </div>
                )}
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="password">Admin Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">Login</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button onClick={handleLogout} variant="outline">Logout</Button>
            <Button asChild>
              <Link href="/">View Site</Link>
            </Button>
          </div>
        </div>

        {message && (
          <div className={`mb-6 p-3 rounded ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Form */}
          <Card>
            <CardHeader>
              <CardTitle>
                {editingProduct ? "Edit Product" : "Add New Product"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="price">Price (₦)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="/path/to/image.jpg"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="features">Features (comma separated)</Label>
                  <Input
                    id="features"
                    name="features"
                    value={formData.features}
                    onChange={handleInputChange}
                    placeholder="Feature 1, Feature 2, Feature 3"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button type="submit">
                    {editingProduct ? "Update Product" : "Add Product"}
                  </Button>
                  {editingProduct && (
                    <Button type="button" variant="outline" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Products List */}
          <Card>
            <CardHeader>
              <CardTitle>Current Products ({products.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {products.length === 0 ? (
                <p className="text-muted-foreground">No products found.</p>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {products.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{product.name}</h3>
                        <span className="font-bold text-primary">{formatCurrency(product.price)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{product.category}</p>
                      <p className="text-sm mt-2 line-clamp-2">{product.description}</p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" onClick={() => handleEdit(product)}>Edit</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}