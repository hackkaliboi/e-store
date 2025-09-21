import { Header } from "@/components/header"
import { HeroCarousel } from "@/components/hero-carousel"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { products } from "@/lib/products"

export default function HomePage() {
  const featuredProducts = products.slice(0, 6)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <HeroCarousel />

      <section className="py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 bg-primary/20 rounded-full text-primary-foreground font-medium text-xs sm:text-sm mb-4 sm:mb-6 border border-primary/30">
              Featured Collection
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-balance">Our Best Sellers</h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl sm:max-w-3xl mx-auto text-pretty">
              Discover our most popular tech products, carefully curated for quality, innovation, and customer
              satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/30 hover:-translate-y-1 sm:hover:-translate-y-2"
              >
                <CardContent className="p-0">
                  <div className="aspect-square relative overflow-hidden rounded-t-lg">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl sm:text-2xl font-bold text-primary">${product.price}</span>
                      <Button size="sm" className="rounded-full text-xs sm:text-sm" asChild>
                        <Link href={`/product/${product.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              className="text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-6 h-auto rounded-full bg-transparent border-2"
              asChild
            >
              <Link href="/shop">View All Products →</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-br from-muted/30 via-background to-primary/5">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 bg-primary/20 rounded-full text-primary-foreground font-medium text-xs sm:text-sm mb-4 sm:mb-6 border border-primary/30">
              Why Choose ShopEase
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-balance">The Future of Shopping</h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl sm:max-w-3xl mx-auto text-pretty">
              We've revolutionized online shopping by combining premium products with instant WhatsApp ordering.
              Experience convenience like never before.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <div className="text-center group">
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 sm:w-12 sm:h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-2xl font-semibold mb-3 sm:mb-4">Lightning Fast</h3>
              <p className="text-muted-foreground text-xs sm:text-base leading-relaxed">
                Order in under 30 seconds via WhatsApp. No forms, no carts, no complications.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 sm:w-12 sm:h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-2xl font-semibold mb-3 sm:mb-4">Premium Quality</h3>
              <p className="text-muted-foreground text-xs sm:text-base leading-relaxed">
                Handpicked products from trusted brands with full warranties and quality guarantees.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 sm:w-12 sm:h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-2xl font-semibold mb-3 sm:mb-4">Express Delivery</h3>
              <p className="text-muted-foreground text-xs sm:text-base leading-relaxed">
                Fast, reliable delivery with real-time tracking updates sent directly to WhatsApp.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 sm:w-12 sm:h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-2xl font-semibold mb-3 sm:mb-4">24/7 Support</h3>
              <p className="text-muted-foreground text-xs sm:text-base leading-relaxed">
                Round-the-clock customer support via WhatsApp for any questions or concerns.
              </p>
            </div>
          </div>

          <div className="bg-card/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border-2 border-primary/10">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Join 10,000+ Happy Customers</h3>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-xl sm:max-w-2xl mx-auto">
                Experience the revolutionary shopping method that's changing how people buy tech products online.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button size="lg" className="text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-6 h-auto rounded-full" asChild>
                  <Link href="/shop">Start Shopping Now</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-6 h-auto rounded-full border-2 bg-transparent"
                  asChild
                >
                  <a
                    href="https://wa.me/1234567890?text=Hi! I'd like to learn more about ShopEase."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn More
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">What Our Customers Say</h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground">Real feedback from satisfied customers</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <Card className="border-2">
              <CardContent className="p-4 sm:p-6">
                <div className="flex mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
                  "Ordering through WhatsApp is so convenient! Got my headphones delivered the next day."
                </p>
                <div className="font-semibold text-sm sm:text-base">Sarah M.</div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-4 sm:p-6">
                <div className="flex mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
                  "Great quality products and the WhatsApp ordering system is genius. No more complicated checkouts!"
                </p>
                <div className="font-semibold text-sm sm:text-base">Mike R.</div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-4 sm:p-6">
                <div className="flex mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
                  "Excellent customer service and fast delivery. The fitness watch I ordered works perfectly!"
                </p>
                <div className="font-semibold text-sm sm:text-base">Emma L.</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl sm:max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Experience the Future of Shopping?</h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              Join thousands of satisfied customers who've discovered the easiest way to shop for premium tech products.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button size="lg" className="text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-6 h-auto" asChild>
                <Link href="/shop">Browse All Products</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-6 h-auto border-2 bg-transparent" asChild>
                <Link href="/contact">Get Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-card border-t border-border py-8 sm:py-12 px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Need Help?</h3>
          <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
            Contact us directly on WhatsApp for instant support and assistance.
          </p>
          <Button size="lg" variant="outline" className="text-sm sm:text-base" asChild>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
              Chat on WhatsApp
            </a>
          </Button>
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border">
            <p className="text-xs sm:text-sm text-muted-foreground">© 2024 ShopEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}