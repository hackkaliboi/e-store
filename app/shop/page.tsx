import type { Metadata } from 'next'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { getAllProducts } from "@/lib/product-manager"
import { formatCurrency } from "@/lib/utils"
import { Product } from "@/lib/products"

export const metadata: Metadata = {
  title: 'Shop | De-chickins',
  description: 'Browse our complete collection of premium clothing at De-chickins. Find the perfect style for you.',
  openGraph: {
    title: 'Shop - De-chickins',
    description: 'Browse our complete collection of premium clothing. Find the perfect style for you.',
    url: 'https://www.de-chickins.com/shop',
    siteName: 'De-chickins',
    images: [
      {
        url: '/og-shop.jpg',
        width: 1200,
        height: 630,
        alt: 'De-chickins Shop - Premium Clothing Collection'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shop - De-chickins',
    description: 'Browse our complete collection of premium clothing. Find the perfect style for you.',
    images: ['/twitter-shop.jpg'],
  },
}

export default async function ShopPage() {
  const products: Product[] = await getAllProducts()

  return (
    <div className="min-h-screen bg-amber-50">
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-3 text-amber-900">Our Collection</h1>
            <p className="text-amber-900/70 max-w-2xl mx-auto">
              Discover our carefully curated selection of premium clothing designed for style and comfort.
            </p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-amber-900/70">No products available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="group border-0 shadow-sm hover:shadow-md transition-shadow bg-white"
                >
                  <CardContent className="p-0">
                    <div className="aspect-square relative overflow-hidden rounded-t-lg">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-sm mb-1 text-amber-900 group-hover:text-amber-700 transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-base font-semibold text-amber-700">{formatCurrency(product.price)}</span>
                        <Button size="sm" variant="outline" className="text-xs h-7 px-2 border-amber-300 text-amber-900 hover:bg-amber-100" asChild>
                          <Link href={`/product/${product.id}`}>View</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}