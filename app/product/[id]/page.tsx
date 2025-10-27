import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { getProductById } from "@/lib/product-manager"
import { formatCurrency } from "@/lib/utils"

interface ProductPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductById(params.id)
  
  if (!product) {
    return {
      title: 'Product Not Found | De-chickins',
    }
  }

  return {
    title: `${product.name} | De-chickins`,
    description: product.description || `Check out ${product.name} at De-chickins`,
    openGraph: {
      title: product.name,
      description: product.description || `Check out ${product.name} at De-chickins`,
      url: `https://www.de-chickins.com/product/${params.id}`,
      siteName: 'De-chickins',
      images: [
        {
          url: product.image || '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description || `Check out ${product.name} at De-chickins`,
      images: [product.image || '/twitter-image.jpg'],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-amber-50">
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <Button variant="outline" className="mb-6 border-amber-300 text-amber-900 hover:bg-amber-100" asChild>
            <Link href="/shop">← Back to Shop</Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-white shadow-sm">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain p-8"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-amber-900 mb-4">{product.name}</h1>
              <p className="text-2xl font-semibold text-amber-700 mb-6">{formatCurrency(product.price)}</p>
              
              {product.description && (
                <div className="prose prose-amber max-w-none mb-8">
                  <p className="text-amber-900/80">{product.description}</p>
                </div>
              )}

              <div className="bg-amber-100 border border-amber-300 rounded-lg p-4 mb-6">
                <p className="text-amber-900 text-sm">
                  Ready to purchase? Click the button below to order via WhatsApp. Full e-commerce features coming soon!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 bg-amber-700 hover:bg-amber-800 text-white">
                  Order via WhatsApp
                </Button>
                <Button variant="outline" className="border-amber-300 text-amber-900 hover:bg-amber-100" asChild>
                  <Link href="/shop">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}