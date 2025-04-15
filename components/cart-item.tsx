"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"

interface CartItemProps {
  id: string
  productId: string
  name: string
  price: number
  image: string
  quantity: number
}

export function CartItem({ id, productId, name, price, image, quantity }: CartItemProps) {
  const { updateItem, removeItem } = useCart()
  const [isUpdating, setIsUpdating] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)

  const handleIncrement = async () => {
    setIsUpdating(true)
    await updateItem(id, quantity + 1)
    setIsUpdating(false)
  }

  const handleDecrement = async () => {
    if (quantity > 1) {
      setIsUpdating(true)
      await updateItem(id, quantity - 1)
      setIsUpdating(false)
    }
  }

  const handleRemove = async () => {
    setIsRemoving(true)
    await removeItem(id)
    setIsRemoving(false)
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b">
      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={80}
          height={80}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <Link href={`/product/${productId}`} className="font-medium hover:underline">
          {name}
        </Link>
        <div className="text-muted-foreground text-sm mt-1">Item #: {productId}</div>
        <div className="mt-2 font-bold">${price.toFixed(2)}</div>
      </div>
      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-r-none"
          onClick={handleDecrement}
          disabled={quantity <= 1 || isUpdating}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <div className="h-8 px-3 flex items-center justify-center border-y">{quantity}</div>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-l-none"
          onClick={handleIncrement}
          disabled={isUpdating}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      <div className="text-right font-bold">${(price * quantity).toFixed(2)}</div>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-destructive"
        onClick={handleRemove}
        disabled={isRemoving}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
