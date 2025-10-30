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
import { useAuth } from "@/context/auth-context"

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalValue: 0,
    averagePrice: 0
  })
  const [loading, setLoading] = useState(true)
  const { user, isAdmin, loading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    console.log('Admin dashboard useEffect triggered', { isAdmin, authLoading, user: user?.email })

    // DISABLE AUTH FOR DEVELOPMENT - bypass authentication check
    // Uncomment the following lines to re-enable authentication:
    /*
    const checkAdminAccess = async () => {
      // Wait for auth state to load
      if (authLoading) {
        return
      }

      console.log('Admin dashboard auth state:', { user: user?.email, isAdmin, authLoading })

      // If user is not admin, redirect to home
      if (!isAdmin) {
        console.log('User is not admin, redirecting to home')
        router.push("/")
        return
      }

      loadProducts()
    }

    checkAdminAccess()
    */

    // Directly load products for development
    console.log('Loading products for development')
    loadProducts()
  }, [isAdmin, authLoading, router, user])

  const loadProducts = async () => {
    setLoading(true)

    // Add a timeout to ensure loading is set to false even if there's an issue
    const timeout = setTimeout(() => {
      console.log('Timeout reached, setting loading to false')
      setLoading(false)
    }, 10000) // 10 second timeout

    try {
      console.log('Loading products...')
      const fetchedProducts = await getAllProducts()
      console.log('Products loaded:', fetchedProducts.length)
      setProducts(fetchedProducts)

      // Calculate stats
      console.log('Calculating stats...')
      const totalProducts = fetchedProducts.length
      console.log('Total products:', totalProducts)

      const categories = [...new Set(fetchedProducts.map(p => p.category))]
      console.log('Categories:', categories)

      const totalValue = fetchedProducts.reduce((sum, product) => {
        console.log('Adding product price:', product.price)
        return sum + (product.price || 0)
      }, 0)
      console.log('Total value:', totalValue)

      const averagePrice = totalProducts > 0 ? totalValue / totalProducts : 0
      console.log('Average price:', averagePrice)

      setStats({
        totalProducts,
        totalCategories: categories.length,
        totalValue,
        averagePrice
      })
      console.log('Stats calculated and set')
    } catch (error) {
      console.error("Error loading products:", error)
    } finally {
      console.log('Finished loading products, setting loading to false')
      clearTimeout(timeout)
      setLoading(false)
    }
  }

  // Get products by category for chart
  const getCategoryData = () => {
    console.log('Calculating category data...', products.length)
    const categoryMap: Record<string, number> = {}
    products.forEach(product => {
      const category = product.category || 'Uncategorized'
      categoryMap[category] = (categoryMap[category] || 0) + 1
    })
    const result = Object.entries(categoryMap).map(([name, count]) => ({ name, count }))
    console.log('Category data calculated:', result)
    return result
  }

  // DISABLE AUTH FOR DEVELOPMENT - bypass authentication check
  // Uncomment the following lines to re-enable authentication:
  /*
  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-amber-900">Checking access...</p>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-amber-900">Access denied. Admin privileges required.</p>
      </div>
    )
  }
  */

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-amber-900">Loading dashboard...</p>
      </div>
    )
  }

  const categoryData = getCategoryData()
  console.log('Category data:', categoryData)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-amber-900">Dashboard</h2>
        <p className="text-amber-900/70">Welcome to your admin dashboard</p>
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