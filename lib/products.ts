export interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
  category: string
  features: string[]
}

// Remove the mock products array and functions since we're now using product-manager.ts
// Export the interfaces only
