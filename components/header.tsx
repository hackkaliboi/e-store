"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b border-amber-200/30 bg-amber-50/95 backdrop-blur supports-[backdrop-filter]:bg-amber-50/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img src="/logo.svg" alt="DC Chickin Logo" className="h-10 w-auto" />
          </Link>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-amber-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-amber-900 hover:text-amber-700 transition-colors">
              Home
            </Link>
            <Link href="/shop" className="text-sm font-medium text-amber-900 hover:text-amber-700 transition-colors">
              Shop
            </Link>
            <Link href="/contact" className="text-sm font-medium text-amber-900 hover:text-amber-700 transition-colors">
              Contact
            </Link>
            <Link href="/admin" className="text-sm font-medium text-amber-900 hover:text-amber-700 transition-colors">
              Admin
            </Link>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pb-3 space-y-3 absolute left-0 right-0 top-full bg-amber-50 border-b border-amber-200/30 px-4 shadow-sm">
            <div className="flex flex-col gap-2 py-2">
              <Link
                href="/"
                className="text-sm font-medium text-amber-900 hover:text-amber-700 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="text-sm font-medium text-amber-900 hover:text-amber-700 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-amber-900 hover:text-amber-700 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/admin"
                className="text-sm font-medium text-amber-900 hover:text-amber-700 transition-colors py-2"
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