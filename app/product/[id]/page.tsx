import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { getProductById, getRelatedProducts } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id)

  if (!product) {
    notFound()
  }

  const relatedProducts = getRelatedProducts(product.id, product.category)
  const whatsappMessage = `Hi! I'm interested in ${product.name} - ${product.description}. Price: $${product.price}. Can you help me with the order?`
  const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-4 sm:mb-6" asChild>
          <Link href="/shop">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </Button>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden rounded-lg bg-muted">
            <img 
              src={product.image || "/placeholder.svg"} 
              alt={product.name} 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Product Info */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-balance">{product.name}</h1>
              <p className="text-xl sm:text-2xl text-primary font-bold mb-3 sm:mb-4">${product.price}</p>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed text-pretty">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Order Button */}
            <div className="space-y-4 pt-2">
              <Button size="lg" className="w-full text-base sm:text-lg" asChild>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  Order via WhatsApp
                </a>
              </Button>
              <p className="text-xs sm:text-sm text-muted-foreground text-center">
                Click to start a WhatsApp conversation with product details pre-filled
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Related Products</h2>
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