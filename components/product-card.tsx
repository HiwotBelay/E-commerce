"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Star, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  rating?: number
  reviewCount?: number
  image: string
  isBestSeller?: boolean
  isNew?: boolean
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  rating = 0,
  reviewCount = 0,
  image,
  isBestSeller,
  isNew,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { addItem, isLoading } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsAdding(true)
    await addItem(id, 1)
    setIsAdding(false)
  }

  return (
    <div
      className="group relative bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={300}
            height={300}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {(isBestSeller || isNew || discount > 0) && (
            <div className="absolute top-2 left-2 flex flex-col gap-2">
              {isBestSeller && (
                <Badge variant="default" className="bg-amber-500 hover:bg-amber-600 shadow-md">
                  BEST SELLER
                </Badge>
              )}
              {isNew && (
                <Badge variant="default" className="bg-green-500 hover:bg-green-600 shadow-md">
                  NEW
                </Badge>
              )}
              {discount > 0 && (
                <Badge variant="default" className="bg-red-500 hover:bg-red-600 shadow-md">
                  {discount}% OFF
                </Badge>
              )}
            </div>
          )}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center transition-opacity duration-300 p-4 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex gap-2 w-full">
              <Button
                size="sm"
                className="bg-white text-gray-900 hover:bg-white/90 flex-1"
                onClick={handleAddToCart}
                disabled={isAdding || isLoading}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {isAdding ? "Adding..." : "Add to Cart"}
              </Button>
              <Button size="icon" variant="outline" className="bg-white/80 hover:bg-white">
                <Heart className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="bg-white/80 hover:bg-white" asChild>
                <Link href={`/product/${id}`}>
                  <Eye className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-2">({reviewCount})</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold text-gray-900">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">${originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
