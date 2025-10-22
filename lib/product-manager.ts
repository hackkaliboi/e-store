import { Product } from "./products"

// In a real application, this would be stored in a database
// For now, we'll use localStorage for demonstration
let products: Product[] = []

// Check if we're running in the browser
const isBrowser = typeof window !== "undefined"

// Initialize with some default products if none exist
const initializeProducts = () => {
  if (!isBrowser) return
  
  const storedProducts = localStorage.getItem("products")
  if (storedProducts) {
    products = JSON.parse(storedProducts)
  } else {
    // Default products (same as the mock data)
    products = [
      {
        id: "1",
        name: "Wireless Bluetooth Headphones",
        price: 89.99,
        image: "/modern-wireless-bluetooth-headphones.jpg",
        description: "Premium quality wireless headphones with noise cancellation and 30-hour battery life.",
        category: "Electronics",
        features: ["Noise Cancellation", "30-hour Battery", "Wireless Charging", "Premium Sound Quality"],
      },
      {
        id: "2",
        name: "Smart Fitness Watch",
        price: 199.99,
        image: "/sleek-smart-fitness-watch.jpg",
        description: "Advanced fitness tracking with heart rate monitoring, GPS, and smartphone integration.",
        category: "Wearables",
        features: ["Heart Rate Monitor", "GPS Tracking", "Water Resistant", "Sleep Tracking"],
      },
      {
        id: "3",
        name: "Portable Power Bank",
        price: 39.99,
        image: "/compact-portable-power-bank.jpg",
        description: "High-capacity 20,000mAh power bank with fast charging and multiple USB ports.",
        category: "Accessories",
        features: ["20,000mAh Capacity", "Fast Charging", "Multiple Ports", "LED Display"],
      },
      {
        id: "4",
        name: "Wireless Charging Pad",
        price: 29.99,
        image: "/minimalist-wireless-charging-pad.jpg",
        description: "Sleek wireless charging pad compatible with all Qi-enabled devices.",
        category: "Accessories",
        features: ["Qi Compatible", "LED Indicator", "Non-slip Surface", "Fast Charging"],
      },
      {
        id: "5",
        name: "Bluetooth Speaker",
        price: 69.99,
        image: "/portable-bluetooth-speaker.jpg",
        description: "Compact portable speaker with 360-degree sound and waterproof design.",
        category: "Audio",
        features: ["360° Sound", "Waterproof", "12-hour Battery", "Voice Assistant"],
      },
      {
        id: "6",
        name: "USB-C Hub",
        price: 49.99,
        image: "/modern-usb-c-hub-adapter.jpg",
        description: "Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader.",
        category: "Accessories",
        features: ["HDMI Output", "USB 3.0 Ports", "SD Card Reader", "Compact Design"],
      },
    ]
    saveProducts()
  }
}

// Save products to localStorage
const saveProducts = () => {
  if (!isBrowser) return
  localStorage.setItem("products", JSON.stringify(products))
}

// Get all products
export const getAllProducts = (): Product[] => {
  initializeProducts()
  return [...products]
}

// Get product by ID
export const getProductById = (id: string): Product | undefined => {
  initializeProducts()
  return products.find((product) => product.id === id)
}

// Get related products
export const getRelatedProducts = (currentProductId: string, category: string): Product[] => {
  initializeProducts()
  return products
    .filter((product) => product.id !== currentProductId && product.category === category)
    .slice(0, 3)
}

// Add a new product
export const addProduct = (product: Omit<Product, "id">): Product => {
  initializeProducts()
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(), // Simple ID generation
  }
  products.push(newProduct)
  saveProducts()
  return newProduct
}

// Update an existing product
export const updateProduct = (id: string, updatedProduct: Partial<Product>): Product | null => {
  initializeProducts()
  const index = products.findIndex((product) => product.id === id)
  if (index === -1) return null
  
  products[index] = { ...products[index], ...updatedProduct }
  saveProducts()
  return products[index]
}

// Delete a product
export const deleteProduct = (id: string): boolean => {
  initializeProducts()
  const initialLength = products.length
  products = products.filter((product) => product.id !== id)
  saveProducts()
  return products.length < initialLength
}

// Simple admin authentication (in a real app, this would be more secure)
const ADMIN_PASSWORD = "admin123" // This should be stored securely in a real app

export const authenticateAdmin = (password: string): boolean => {
  return password === ADMIN_PASSWORD
}