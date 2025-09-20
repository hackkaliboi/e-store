"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const heroSlides = [
  {
    id: 1,
    badge: "New Products Available Now",
    title: "Premium Tech,",
    subtitle: "Instant Orders",
    description:
      "Experience the future of e-commerce with our revolutionary WhatsApp ordering system. Premium technology products delivered with zero hassle, maximum convenience.",
    primaryButton: {
      text: "🚀 Explore Products",
      href: "/shop",
    },
    secondaryButton: {
      text: "💬 Chat on WhatsApp",
      href: "https://wa.me/1234567890?text=Hi! I'd like to learn more about your products.",
    },
    titleColor: "text-cyan-400",
    backgroundImage: "/images/hero/slide-1-bg.jpg",
  },
  {
    id: 2,
    badge: "Limited Time Offer",
    title: "Save Big on",
    subtitle: "Tech Essentials",
    description:
      "Get up to 30% off on our most popular tech products. From wireless headphones to smart watches, find everything you need at unbeatable prices.",
    primaryButton: {
      text: "🔥 Shop Sale",
      href: "/shop",
    },
    secondaryButton: {
      text: "💬 Get Deals Info",
      href: "https://wa.me/1234567890?text=Hi! I'd like to know more about your current deals and offers.",
    },
    titleColor: "text-orange-400",
    backgroundImage: "/images/hero/slide-2-bg.jpg",
  },
  {
    id: 3,
    badge: "Fast & Reliable",
    title: "Express Delivery",
    subtitle: "Guaranteed",
    description:
      "Order today and receive your products within 24-48 hours. Track your delivery in real-time through WhatsApp notifications and enjoy hassle-free shopping.",
    primaryButton: {
      text: "⚡ Order Now",
      href: "/shop",
    },
    secondaryButton: {
      text: "📦 Track Order",
      href: "https://wa.me/1234567890?text=Hi! I'd like to track my order status.",
    },
    titleColor: "text-blue-400",
    backgroundImage: "/images/hero/slide-3-bg.jpg",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  const currentSlideData = heroSlides[currentSlide]

  return (
    <section
      className="relative py-32 px-4 overflow-hidden"
      style={{
        backgroundImage: `url(${currentSlideData.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-background/20 via-transparent to-primary/10"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-background/80 backdrop-blur-sm border-2 border-primary/20 rounded-full flex items-center justify-center hover:bg-background hover:border-primary/40 transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-primary" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-background/80 backdrop-blur-sm border-2 border-primary/20 rounded-full flex items-center justify-center hover:bg-background hover:border-primary/40 transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-primary" />
      </button>

      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          <div key={currentSlide} className="animate-in fade-in duration-700">
            <div className="inline-flex items-center px-4 py-2 bg-primary/20 rounded-full text-primary-foreground font-medium text-sm mb-8 border border-primary/30">
              <span className="w-2 h-2 bg-primary-foreground rounded-full mr-2 animate-pulse"></span>
              {currentSlideData.badge}
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-8 text-balance leading-tight">
              <span className={`${currentSlideData.titleColor} font-extrabold drop-shadow-lg`}>
                {currentSlideData.title}
              </span>
              <br />
              <span className="text-white font-extrabold drop-shadow-lg">{currentSlideData.subtitle}</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto text-pretty leading-relaxed">
              {currentSlideData.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                className="text-lg px-12 py-8 h-auto rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href={currentSlideData.primaryButton.href}>{currentSlideData.primaryButton.text}</Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="text-lg px-12 py-8 h-auto rounded-full bg-transparent border-2 hover:bg-primary/5"
                asChild
              >
                <a href={currentSlideData.secondaryButton.href} target="_blank" rel="noopener noreferrer">
                  {currentSlideData.secondaryButton.text}
                </a>
              </Button>
            </div>
          </div>

          <div className="mt-16 flex items-center justify-center gap-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-primary scale-125" : "bg-primary/30 hover:bg-primary/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Instant Ordering</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Premium Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>Fast Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
