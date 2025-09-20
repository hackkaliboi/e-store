export interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
  category: string
  features: string[]
}

export const products: Product[] = [
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

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getRelatedProducts(currentProductId: string, category: string): Product[] {
  return products.filter((product) => product.id !== currentProductId && product.category === category).slice(0, 3)
}
