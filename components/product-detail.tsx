"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Heart, Minus, Plus, Share2, Star, Truck, Shield, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { AddToCartButton } from "@/components/add-to-cart-button"

interface ProductDetailProps {
  product: any
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0].value : "black",
  )

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8 text-sm">
        <Link href="/" className="text-gray-500 hover:text-blue-600">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
        <Link href="/category/electronics" className="text-gray-500 hover:text-blue-600">
          Electronics
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
        <Link href="/category/electronics/headphones" className="text-gray-500 hover:text-blue-600">
          Headphones
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
        <span className="text-gray-900 truncate">{product.name}</span>
      </nav>

      {/* Product Details */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Product Images */}
          <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r">
            <div className="mb-4 rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-[400px] object-contain"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image: string, index: number) => (
                <div
                  key={index}
                  className={`border rounded cursor-pointer overflow-hidden ${selectedImage === index ? "ring-2 ring-blue-600" : ""}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - view ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-24 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating || 0)
                        ? "fill-yellow-400 text-yellow-400"
                        : i < (product.rating || 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm">
                {product.rating || 0} ({product.reviewCount || 0} reviews)
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                  <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-sm font-medium">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium mb-2">Color:</h3>
                <div className="flex space-x-2">
                  {product.colors.map((color: any) => (
                    <button
                      key={color.value}
                      className={`w-10 h-10 rounded-full border-2 ${selectedColor === color.value ? "border-blue-600" : "border-transparent"}`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setSelectedColor(color.value)}
                      aria-label={`Select ${color.name} color`}
                    >
                      {selectedColor === color.value && <Check className="h-6 w-6 text-white mx-auto" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Status */}
            <div className="mb-6">
              {product.inStock ? (
                <span className="text-green-600 font-medium flex items-center">
                  <span className="h-2 w-2 bg-green-600 rounded-full mr-2"></span>
                  In Stock
                </span>
              ) : (
                <span className="text-red-600 font-medium flex items-center">
                  <span className="h-2 w-2 bg-red-600 rounded-full mr-2"></span>
                  Out of Stock
                </span>
              )}
            </div>

            {/* Shipping Info */}
            {product.freeShipping && (
              <div className="flex items-center text-sm mb-6 bg-blue-50 p-3 rounded-lg">
                <Truck className="h-5 w-5 mr-2 text-blue-600" />
                <span>Free shipping. Estimated delivery: {product.estimatedDelivery}</span>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center mb-6">
              <span className="mr-4">Quantity:</span>
              <div className="flex items-center border rounded-md">
                <button
                  onClick={decrementQuantity}
                  className="px-3 py-2 border-r hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button onClick={incrementQuantity} className="px-3 py-2 border-l hover:bg-gray-100">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <AddToCartButton
                productId={product.id}
                quantity={quantity}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              />
              <Button size="lg" variant="secondary" className="flex-1">
                Buy Now
              </Button>
              <Button size="icon" variant="outline">
                <Heart className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="outline">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Shield className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-sm">Secure Payment</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Truck className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-sm">Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="features" className="mb-16">
        <TabsList className="bg-white rounded-t-lg border-b">
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="features" className="bg-white rounded-b-lg p-6">
          <h3 className="text-xl font-bold mb-4">Product Features</h3>
          <ul className="space-y-3">
            {product.features &&
              product.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mr-2 mt-0.5">
                    <Check className="h-3 w-3" />
                  </span>
                  {feature}
                </li>
              ))}
          </ul>
        </TabsContent>
        <TabsContent value="specifications" className="bg-white rounded-b-lg p-6">
          <h3 className="text-xl font-bold mb-4">Technical Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.specifications &&
              Object.entries(product.specifications).map(([key, value]: [string, any]) => (
                <div key={key} className="flex border-b pb-2">
                  <span className="font-medium w-1/3">{key}:</span>
                  <span className="w-2/3">{value}</span>
                </div>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="bg-white rounded-b-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Customer Reviews</h3>
            <Button>Write a Review</Button>
          </div>
          <div className="mb-8 p-6 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(product.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-lg font-medium">{product.rating || 0} out of 5</span>
            </div>
            <p className="text-gray-600">Based on {product.reviewCount || 0} reviews</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
