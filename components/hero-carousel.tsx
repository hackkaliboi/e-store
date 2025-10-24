"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const heroSlides = [
  {
    id: 1,
    title: "Elevate Your Style",
    subtitle: "Premium Clothing Collection",
    description:
      "Discover our carefully curated selection of high-quality clothing designed for comfort and style. Each piece is crafted with attention to detail and premium materials.",
    primaryButton: {
      text: "Shop Now",
      href: "/shop",
    },
    secondaryButton: {
      text: "View Collection",
      href: "/shop",
    },
  },
  {
    id: 2,
    title: "Trendy & Timeless",
    subtitle: "Fashion That Lasts",
    description:
      "Our collection blends current trends with timeless designs, ensuring you look great today and for years to come. Quality pieces that stand the test of time.",
    primaryButton: {
      text: "Explore Styles",
      href: "/shop",
    },
    secondaryButton: {
      text: "Contact Us",
      href: "/contact",
    },
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 7000)

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
    <section className="relative py-16 sm:py-20 px-4 bg-amber-50 overflow-hidden">
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-amber-100/80 backdrop-blur-sm border border-amber-200/50 rounded-full flex items-center justify-center hover:bg-amber-100 hover:border-amber-300 transition-all duration-300 shadow-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 text-amber-900" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-amber-100/80 backdrop-blur-sm border border-amber-200/50 rounded-full flex items-center justify-center hover:bg-amber-100 hover:border-amber-300 transition-all duration-300 shadow-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 text-amber-900" />
      </button>

      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left animate-in fade-in duration-700">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-amber-900">
              {currentSlideData.title}
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-5 text-amber-700">
              {currentSlideData.subtitle}
            </h2>

            <p className="text-base sm:text-lg text-amber-900/80 mb-8 max-w-2xl leading-relaxed">
              {currentSlideData.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="text-base px-8 py-3 h-auto rounded-full font-medium shadow-sm hover:shadow-md transition-shadow bg-amber-700 hover:bg-amber-800 text-white"
                asChild
              >
                <Link href={currentSlideData.primaryButton.href}>{currentSlideData.primaryButton.text}</Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-3 h-auto rounded-full font-medium border-2 border-amber-300 text-amber-900 bg-amber-50 hover:bg-amber-100"
                asChild
              >
                <Link href={currentSlideData.secondaryButton.href}>
                  {currentSlideData.secondaryButton.text}
                </Link>
              </Button>
            </div>
          </div>

          {/* Visual Element */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="aspect-square rounded-2xl bg-amber-200/30 border-2 border-amber-300/30 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-amber-300 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-amber-900">De</span>
                  </div>
                  <h3 className="text-2xl font-bold text-amber-900">De-chickins</h3>
                  <p className="text-amber-900/70 mt-2">Clothing Co.</p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-amber-200/20 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-amber-300/10 blur-xl"></div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="mt-12 flex items-center justify-center gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                ? "bg-amber-700 w-8 rounded-full"
                : "bg-amber-300 hover:bg-amber-400"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}