import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"

export default function ShopPage() {
  const featuredProducts = products.slice(0, 3)
  const otherProducts = products.slice(3)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-lg sm:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Discover our curated collection of premium tech products. Click any product to order via WhatsApp.
          </p>
        </div>

        {/* Featured Products */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* All Products */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">All Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}