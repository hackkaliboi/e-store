"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold text-primary">
            E STORE
          </Link>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/shop" className="text-sm text-foreground hover:text-primary transition-colors">
              Shop
            </Link>
            <Link href="/contact" className="text-sm text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
            <Link href="/admin" className="text-sm text-foreground hover:text-primary transition-colors">
              Admin
            </Link>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pb-3 space-y-3 absolute left-0 right-0 top-full bg-background border-b border-border px-4 shadow-sm">
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-sm text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="text-sm text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/contact"
                className="text-sm text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/admin"
                className="text-sm text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}