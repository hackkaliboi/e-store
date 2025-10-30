"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, LayoutDashboard } from "lucide-react"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase/client"
import { isAdmin } from "@/lib/supabase/auth"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAdminUser, setIsAdminUser] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        if (supabase) {
          const { data: { user } } = await supabase.auth.getUser()
          if (user) {
            const adminStatus = await isAdmin(user)
            setIsAdminUser(adminStatus)
          }
        }
      } catch (error) {
        console.error("Error checking admin status:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAdminStatus()

    // Listen for auth changes
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
          const adminStatus = await isAdmin(session.user)
          setIsAdminUser(adminStatus)
        } else {
          setIsAdminUser(false)
        }
      })

      return () => {
        subscription?.unsubscribe()
      }
    }
  }, [])

  return (
    <header className="border-b border-amber-200/30 bg-amber-50/95 backdrop-blur supports-[backdrop-filter]:bg-amber-50/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <div className="bg-amber-600 rounded-lg w-10 h-10 flex items-center justify-center mr-3">
                <span className="font-bold text-white text-lg">De</span>
              </div>
              <span className="text-xl font-bold text-amber-900">De-chickins</span>
            </div>
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
            {/* WhatsApp contact link for purchases */}
            <a
              href="https://wa.me/2347052690110"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-amber-900 hover:text-amber-700 transition-colors flex items-center"
            >
              <Phone className="h-4 w-4 mr-1" />
              Order on WhatsApp
            </a>
            {/* Dashboard button for admin users */}
            {isAdminUser && (
              <Link href="/admin" className="text-sm font-medium text-amber-900 hover:text-amber-700 transition-colors flex items-center">
                <LayoutDashboard className="h-4 w-4 mr-1" />
                Dashboard
              </Link>
            )}
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
              {/* WhatsApp contact link for purchases */}
              <a
                href="https://wa.me/2347052690110"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-amber-900 hover:text-amber-700 transition-colors py-2 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="h-4 w-4 mr-1" />
                Order on WhatsApp
              </a>
              {/* Dashboard button for admin users */}
              {isAdminUser && (
                <Link
                  href="/admin"
                  className="text-sm font-medium text-amber-900 hover:text-amber-700 transition-colors py-2 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LayoutDashboard className="h-4 w-4 mr-1" />
                  Dashboard
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}