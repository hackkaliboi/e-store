"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const heroSlides = [
  {
    id: 1,
    title: "Premium Tech,",
    subtitle: "Simplified Shopping",
    description:
      "Experience effortless shopping with our curated selection of premium tech products and instant WhatsApp ordering.",
    primaryButton: {
      text: "Explore Products",
      href: "/shop",
    },
    secondaryButton: {
      text: "Contact Us",
      href: "/contact",
    },
    titleColor: "text-primary",
  },
  {
    id: 2,
    title: "Quality Products,",
    subtitle: "Fast Delivery",
    description:
      "Get premium tech essentials delivered quickly with our streamlined ordering process and reliable shipping.",
    primaryButton: {
      text: "Shop Now",
      href: "/shop",
    },
    secondaryButton: {
      text: "Learn More",
      href: "/contact",
    },
    titleColor: "text-primary",
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
    <section className="relative py-20 sm:py-24 px-4 overflow-hidden bg-gradient-to-br from-background to-muted">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-24 h-24 rounded-full bg-primary/10 blur-2xl"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-muted-foreground/5 blur-3xl"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-background/80 backdrop-blur-sm border border-primary/20 rounded-full flex items-center justify-center hover:bg-background hover:border-primary/40 transition-all duration-300 shadow-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 text-primary" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-background/80 backdrop-blur-sm border border-primary/20 rounded-full flex items-center justify-center hover:bg-background hover:border-primary/40 transition-all duration-300 shadow-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 text-primary" />
      </button>

      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <div key={currentSlide} className="animate-in fade-in duration-700">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className={`${currentSlideData.titleColor} block mb-2`}>
                {currentSlideData.title}
              </span>
              <span className="text-foreground">{currentSlideData.subtitle}</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              {currentSlideData.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-base px-8 py-3 h-auto rounded-full font-medium shadow-sm hover:shadow-md transition-shadow"
                asChild
              >
                <Link href={currentSlideData.primaryButton.href}>{currentSlideData.primaryButton.text}</Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-3 h-auto rounded-full font-medium border-2"
                asChild
              >
                <Link href={currentSlideData.secondaryButton.href}>
                  {currentSlideData.secondaryButton.text}
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-16 flex items-center justify-center gap-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? "bg-primary w-8 rounded-full" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}