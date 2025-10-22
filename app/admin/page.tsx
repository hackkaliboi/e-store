"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Package,
  BarChart3,
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp
} from "lucide-react"
import { getAllProducts } from "@/lib/product-manager"
import { Product } from "@/lib/products"
import { formatCurrency } from "@/lib/utils"
import { supabase } from "@/lib/supabase/client"

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalValue: 0,
    averagePrice: 0
  })
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAdminAccess = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      // For now, we'll allow access if user is logged in
      // In a production app, you would check if the user has admin privileges
      if (!user) {
        router.push("/admin/login")
        return
      }

      setIsAdmin(true)
      loadProducts()
    }

    checkAdminAccess()
  }, [router])

  const loadProducts = async () => {
    setLoading(true)
    try {
      const fetchedProducts = await getAllProducts()
      setProducts(fetchedProducts)

      // Calculate stats
      const totalProducts = fetchedProducts.length
      const categories = [...new Set(fetchedProducts.map(p => p.category))]
      const totalValue = fetchedProducts.reduce((sum, product) => sum + product.price, 0)
      const averagePrice = totalProducts > 0 ? totalValue / totalProducts : 0

      setStats({
        totalProducts,
        totalCategories: categories.length,
        totalValue,
        averagePrice
      })
    } catch (error) {
      console.error("Error loading products:", error)
    } finally {
      setLoading(false)
    }
  }

  // Get products by category for chart
  const getCategoryData = () => {
    const categoryMap: Record<string, number> = {}
    products.forEach(product => {
      categoryMap[product.category] = (categoryMap[product.category] || 0) + 1
    })
    return Object.entries(categoryMap).map(([name, count]) => ({ name, count }))
  }

  const categoryData = getCategoryData()

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-amber-900">Checking access...</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-amber-900">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-amber-900">Dashboard</h2>
        <p className="text-amber-900/70">Welcome to your DC Chickin Admin Panel</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-900">Total Products</CardTitle>
            <Package className="h-4 w-4 text-amber-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900">{stats.totalProducts}</div>
            <p className="text-xs text-amber-900/70">Active products in store</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-900">Categories</CardTitle>
            <BarChart3 className="h-4 w-4 text-amber-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900">{stats.totalCategories}</div>
            <p className="text-xs text-amber-900/70">Product categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-900">Inventory Value</CardTitle>
            <DollarSign className="h-4 w-4 text-amber-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900">{formatCurrency(stats.totalValue)}</div>
            <p className="text-xs text-amber-900/70">Total inventory worth</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-900">Avg. Price</CardTitle>
            <TrendingUp className="h-4 w-4 text-amber-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900">{formatCurrency(stats.averagePrice)}</div>
            <p className="text-xs text-amber-900/70">Average product price</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent products and category chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent products */}
        <Card>
          <CardHeader>
            <CardTitle className="text-amber-900">Recent Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-amber-900">{product.name}</p>
                    <p className="text-xs text-amber-900/70">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-amber-900">{formatCurrency(product.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Categories chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-amber-900">Products by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categoryData.map((category) => (
                <div key={category.name} className="flex items-center">
                  <div className="w-24 text-sm text-amber-900/70 truncate">{category.name}</div>
                  <div className="flex-1 ml-2">
                    <div className="flex items-center">
                      <div
                        className="h-2 bg-amber-300 rounded-full"
                        style={{ width: `${(category.count / stats.totalProducts) * 100}%` }}
                      ></div>
                      <span className="ml-2 text-xs text-amber-900/70">{category.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}