import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { getAllProducts } from "@/lib/product-manager"
import { Product } from "@/lib/products"

export default function ShopPage() {
  const products: Product[] = getAllProducts()
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
        {featuredProducts.length > 0 && (
          <section className="mb-12 sm:mb-16">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* All Products */}
        {products.length > 0 ? (
          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">All Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ) : (
          <section className="text-center py-12">
            <h2 className="text-xl font-bold mb-4">No Products Available</h2>
            <p className="text-muted-foreground">Check back later for new products.</p>
          </section>
        )}
      </div>
    </div>
  )
}