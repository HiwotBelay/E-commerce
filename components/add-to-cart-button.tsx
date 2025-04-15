"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/components/cart-provider"

interface AddToCartButtonProps {
  productId: string
  quantity?: number
  className?: string
}

export function AddToCartButton({ productId, quantity = 1, className }: AddToCartButtonProps) {
  const { addItem, isLoading } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    await addItem(productId, quantity)
    setIsAdding(false)
  }

  return (
    <Button onClick={handleAddToCart} disabled={isAdding || isLoading} className={className} size="lg">
      <ShoppingCart className="mr-2 h-5 w-5" />
      {isAdding ? "Adding..." : "Add to Cart"}
    </Button>
  )
}
