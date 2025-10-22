import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { Product } from "@/lib/products"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow h-full bg-white">
      <div className="aspect-square overflow-hidden rounded-t-lg">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium text-sm mb-1 text-amber-900">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-amber-700">{formatCurrency(product.price)}</span>
          <Button size="sm" variant="outline" className="text-xs h-7 px-2 border-amber-300 text-amber-900 hover:bg-amber-100" asChild>
            <Link href={`/product/${product.id}`}>View</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}