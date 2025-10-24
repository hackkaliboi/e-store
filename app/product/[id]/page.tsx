import type { Metadata } from 'next'
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { getProductById, getRelatedProducts } from "@/lib/product-manager"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { Product } from "@/lib/products"

interface ProductPageProps {
  params: {
    id: string
  }
}

// Generate metadata for the product page
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product: Product | null = await getProductById(params.id)

  if (!product) {
    return {
      title: 'Product Not Found | De-chickins',
      description: 'The product you are looking for could not be found.'
    }
  }

  const title = `${product.name} | De-chickins`
  const description = product.description.substring(0, 160) + (product.description.length > 160 ? '...' : '')

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.de-chickins.com/product/${params.id}`,
      siteName: 'De-chickins',
      images: [
        {
          url: product.image || '/placeholder.svg',
          width: 800,
          height: 600,
          alt: product.name
        }
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.image || '/placeholder.svg'],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product: Product | null = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  const relatedProducts: Product[] = await getRelatedProducts(product.id, product.category)
  const whatsappMessage = `Hi! I'm interested in ${product.name} - ${product.description}. Price: ${formatCurrency(product.price)}. Can you help me with the order?`
  const whatsappUrl = `https://wa.me/2348012345678?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="min-h-screen bg-amber-50">
      <Header />

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Back Button */}
        <Button variant="outline" className="mb-4 sm:mb-6 border-amber-300 text-amber-900 hover:bg-amber-100" asChild>
          <Link href="/shop">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </Button>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden rounded-lg bg-white shadow-sm">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-4 sm:space-y-6 bg-white p-6 rounded-lg shadow-sm">
            <div>
              <Badge variant="secondary" className="mb-2 bg-amber-200 text-amber-900">
                {product.category}
              </Badge>
              <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-amber-900 text-balance">{product.name}</h1>
              <p className="text-xl sm:text-2xl text-amber-700 font-bold mb-3 sm:mb-4">{formatCurrency(product.price)}</p>
              <p className="text-amber-900/80 text-base sm:text-lg leading-relaxed text-pretty">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-amber-900">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-amber-700 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-amber-900/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Order Button */}
            <div className="space-y-4 pt-2">
              <Button size="lg" className="w-full text-base sm:text-lg bg-amber-700 hover:bg-amber-800 text-white" asChild>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  Order via WhatsApp
                </a>
              </Button>
              <p className="text-xs sm:text-sm text-amber-900/70 text-center">
                Click to start a WhatsApp conversation with product details pre-filled
              </p>
              <div className="bg-amber-100 border border-amber-300 rounded-lg p-4 text-center">
                <p className="text-amber-900 font-medium">More Features Coming Soon!</p>
                <p className="text-amber-900/80 text-sm mt-1">Full cart functionality, payment processing, and order tracking will be available in future updates.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-amber-900">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}