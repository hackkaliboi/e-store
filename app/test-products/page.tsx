"use client"

import { useEffect, useState } from "react"
import { getAllProducts } from "@/lib/product-manager"

export default function TestProductsPage() {
    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadProducts = async () => {
            try {
                console.log('Loading products...')
                const fetchedProducts = await getAllProducts()
                console.log('Products loaded:', fetchedProducts)
                setProducts(fetchedProducts)
            } catch (err) {
                console.error('Error loading products:', err)
                setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                setLoading(false)
            }
        }

        loadProducts()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-amber-900">Loading products...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-amber-50 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-amber-900 mb-6">Product Test</h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                        <p>Error: {error}</p>
                    </div>
                )}

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold text-amber-900 mb-2">Products</h2>
                    <p className="text-amber-900 mb-4">Found {products.length} products</p>

                    {products.length > 0 ? (
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
                                    {products.map((product) => (
                                        <tr key={product.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">{product.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">₦{product.price}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-900">{product.category}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-amber-900">No products found</p>
                    )}
                </div>
            </div>
        </div>
    )
}