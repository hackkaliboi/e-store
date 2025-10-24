import type { Metadata } from 'next'
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { getAllProducts } from "@/lib/product-manager"
import { Product } from "@/lib/products"

export const metadata: Metadata = {
  title: 'Shop All Products | De-chickins',
  description: 'Browse our complete collection of premium clothing. Find the perfect style for you from our wide range of apparel for men and women.',
  openGraph: {
    title: 'Shop All Products - De-chickins',
    description: 'Discover our full collection of premium clothing. Shop stylish apparel for men and women with fast delivery and quality assurance.',
    url: 'https://www.de-chickins.com/shop',
    siteName: 'De-chickins',
    images: [
      {
        url: '/og-shop.jpg',
        width: 1200,
        height: 630,
        alt: 'De-chickins - All Products Collection'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shop All Products - De-chickins',
    description: 'Discover our full collection of premium clothing. Shop stylish apparel for men and women with fast delivery and quality assurance.',
    images: ['/twitter-shop.jpg'],
  },
}

export default async function ShopPage() {
  const products: Product[] = await getAllProducts()
  const featuredProducts = products.slice(0, 3)

  return (
    <div className="min-h-screen bg-amber-50">
      <Header />

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-amber-900">Our Collection</h1>
          <p className="text-lg sm:text-xl text-amber-900/80 text-pretty max-w-2xl mx-auto">
            Discover our curated collection of stylish clothing. Click any product to order.
          </p>
          <div className="bg-amber-100 border border-amber-300 rounded-lg p-4 max-w-2xl mx-auto mt-4">
            <p className="text-amber-900 font-medium">Order via WhatsApp</p>
            <p className="text-amber-900/80 text-sm mt-1">Click "View" on any product to order directly via WhatsApp. Full e-commerce features coming soon!</p>
          </div>
        </div>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <section className="mb-12 sm:mb-16">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-amber-900">Featured Items</h2>
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
            <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-amber-900">All Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ) : (
          <section className="text-center py-12">
            <h2 className="text-xl font-bold mb-4 text-amber-900">No Products Available</h2>
            <p className="text-amber-900/70">Check back later for new products.</p>
          </section>
        )}
      </div>
    </div>
  )
}