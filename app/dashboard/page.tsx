import type { Metadata } from 'next'
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: 'Dashboard | De-chickins',
  description: 'Your De-chickins account dashboard',
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-amber-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3 text-amber-900">Welcome to Your Dashboard</h1>
          <p className="text-amber-900/70">
            Manage your account and orders
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-amber-200 p-6">
            <h2 className="text-xl font-semibold text-amber-900 mb-3">Your Orders</h2>
            <p className="text-amber-900/70 mb-4">
              View your order history and track shipments
            </p>
            <Button variant="outline" className="border-amber-300 text-amber-900 hover:bg-amber-100" asChild>
              <Link href="#">View Orders</Link>
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-amber-200 p-6">
            <h2 className="text-xl font-semibold text-amber-900 mb-3">Wishlist</h2>
            <p className="text-amber-900/70 mb-4">
              Save items for later
            </p>
            <Button variant="outline" className="border-amber-300 text-amber-900 hover:bg-amber-100" asChild>
              <Link href="#">View Wishlist</Link>
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-amber-200 p-6">
            <h2 className="text-xl font-semibold text-amber-900 mb-3">Account Settings</h2>
            <p className="text-amber-900/70 mb-4">
              Update your profile and preferences
            </p>
            <Button variant="outline" className="border-amber-300 text-amber-900 hover:bg-amber-100" asChild>
              <Link href="#">Manage Account</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}