"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { getAllProducts } from "@/lib/product-manager"

export default function TestSupabasePage() {
  const [testResult, setTestResult] = useState<string | null>(null)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const testSupabase = async () => {
      console.log('Testing Supabase connection...')

      if (!supabase) {
        setTestResult('Supabase client not initialized')
        setLoading(false)
        return
      }

      try {
        // Test basic connection
        const { data, error } = await supabase.from('products').select('id').limit(1)

        if (error) {
          console.error('Supabase test error:', error)
          setTestResult(`Error: ${error.message}`)
        } else {
          console.log('Supabase test successful:', data)
          setTestResult('Supabase connection successful')
        }

        // Test product fetching
        console.log('Testing product fetching...')
        const fetchedProducts = await getAllProducts()
        console.log('Products fetched:', fetchedProducts.length)
        setProducts(fetchedProducts)
      } catch (error) {
        console.error('Test error:', error)
        setTestResult(`Test error: ${error instanceof Error ? error.message : 'Unknown error'}`)
      } finally {
        setLoading(false)
      }
    }

    testSupabase()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-amber-900">Testing Supabase connection...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-amber-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-amber-900 mb-6">Supabase Test</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-amber-900 mb-2">Connection Test</h2>
          <p className="text-amber-900">{testResult}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-amber-900 mb-2">Products Test</h2>
          <p className="text-amber-900 mb-4">Found {products.length} products</p>

          {products.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-amber-200">
                <thead className="bg-amber-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">Category</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-amber-200">
                  {products.slice(0, 5).map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">₦{product.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">{product.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}