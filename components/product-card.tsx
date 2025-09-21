import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const whatsappMessage = `Hi! I'm interested in ${product.name} - ${product.description}. Price: $${product.price}. Can you help me with the order?`
  const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4 flex-grow flex flex-col">
        <h3 className="font-semibold text-lg mb-2 text-balance">{product.name}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2 flex-grow">{product.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-primary">${product.price}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm">
              <Link href={`/product/${product.id}`}>View</Link>
            </Button>
            <Button size="sm" asChild className="text-xs sm:text-sm">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                Order
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}