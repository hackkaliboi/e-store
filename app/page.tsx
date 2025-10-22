import { Header } from "@/components/header"
import { HeroCarousel } from "@/components/hero-carousel"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { getAllProducts } from "@/lib/product-manager"
import { formatCurrency } from "@/lib/utils"
import { Product } from "@/lib/products"

export default async function HomePage() {
  // Show fewer products for a cleaner look
  const products: Product[] = await getAllProducts()
  const featuredProducts: Product[] = products.slice(0, 4)

  return (
    <div className="min-h-screen bg-amber-50">
      <Header />

      <HeroCarousel />

      {/* Featured Products Section - Simplified */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold mb-2 text-amber-900">Featured Products</h2>
            <p className="text-amber-900/70 text-sm">Carefully selected for quality and style</p>
            <div className="bg-amber-100 border border-amber-300 rounded-lg p-3 max-w-md mx-auto mt-3">
              <p className="text-amber-900 text-xs">Click "View" to order via WhatsApp. Full e-commerce features coming soon!</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {featuredProducts.map((product) => (
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

          <div className="text-center">
            <Button
              variant="outline"
              className="text-sm px-6 py-2 h-auto rounded-full border-amber-300 text-amber-900 hover:bg-amber-100"
              asChild
            >
              <Link href="/shop">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section - Simplified */}
      <section className="py-12 px-4 bg-amber-100/50">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold mb-2 text-amber-900">Why Choose Us</h2>
            <p className="text-amber-900/70 text-sm">Stylish clothing with premium quality</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-medium text-sm mb-1 text-amber-900">Fast Delivery</h3>
              <p className="text-amber-900/70 text-xs">Quick and reliable shipping</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-sm mb-1 text-amber-900">Quality Assured</h3>
              <p className="text-amber-900/70 text-xs">Premium quality clothing</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-sm mb-1 text-amber-900">Trendy Styles</h3>
              <p className="text-amber-900/70 text-xs">Fashion-forward designs</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-sm mb-1 text-amber-900">Always Available</h3>
              <p className="text-amber-900/70 text-xs">24/7 customer support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Simplified */}
      <section className="py-12 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-2xl font-semibold mb-3 text-amber-900">Ready to Shop?</h2>
          <p className="text-amber-900/70 text-sm mb-6">
            Experience the finest quality clothing from DC Chickin.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="text-sm px-6 py-2 h-auto rounded-full bg-amber-700 hover:bg-amber-800 text-white" asChild>
              <Link href="/shop">Browse Products</Link>
            </Button>
            <Button variant="outline" className="text-sm px-6 py-2 h-auto rounded-full border-amber-300 text-amber-900 hover:bg-amber-100" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Simplified Footer */}
      <footer className="border-t border-amber-200/30 py-8 px-4 bg-amber-50">
        <div className="container mx-auto text-center">
          <p className="text-xs text-amber-900/70">© 2024 DC Chickin. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}