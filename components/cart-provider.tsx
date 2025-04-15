"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"

type CartItem = {
  id: string
  productId: string
  name: string
  price: number
  image: string
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  isLoading: boolean
  addItem: (productId: string, quantity?: number) => Promise<void>
  updateItem: (cartItemId: string, quantity: number) => Promise<void>
  removeItem: (cartItemId: string) => Promise<void>
  clearCart: () => Promise<void>
  subtotal: number
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Calculate derived values
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const itemCount = items.reduce((count, item) => count + item.quantity, 0)

  // Fetch cart on initial load
  useEffect(() => {
    const fetchCart = async () => {
      try {
        // For demo purposes, we'll use localStorage to store cart items
        const storedCart = localStorage.getItem("cart")
        if (storedCart) {
          setItems(JSON.parse(storedCart))
        }
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching cart:", error)
        toast({
          title: "Error",
          description: "Failed to load your cart. Please try again.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    fetchCart()
  }, [toast])

  // Add item to cart
  const addItem = async (productId: string, quantity = 1) => {
    try {
      setIsLoading(true)

      // For demo purposes, we'll fetch the product details directly
      // In a real app, this would be an API call
      const response = await fetch(`/api/products/${productId}`)

      if (!response.ok) {
        // If the API isn't working, use demo data
        // Find the product in our demo data
        const demoProducts = [
          {
            id: "1",
            name: "Premium Wireless Headphones",
            price: 249.99,
            images: [
              "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            ],
          },
          {
            id: "2",
            name: "Smart Watch with Health Monitoring",
            price: 199.99,
            images: [
              "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            ],
          },
          {
            id: "3",
            name: "Ultra HD 4K Smart TV - 55 inch",
            price: 699.99,
            images: [
              "https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            ],
          },
          {
            id: "4",
            name: "Portable Bluetooth Speaker - Waterproof",
            price: 79.99,
            images: [
              "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            ],
          },
        ]

        const demoProduct = demoProducts.find((p) => p.id === productId) || {
          id: productId,
          name: "Product " + productId,
          price: 99.99,
          images: ["/placeholder.svg"],
        }

        // Check if item already exists in cart
        const existingItemIndex = items.findIndex((item) => item.productId === productId)

        if (existingItemIndex >= 0) {
          // Update quantity if item exists
          const updatedItems = [...items]
          updatedItems[existingItemIndex].quantity += quantity
          setItems(updatedItems)
          localStorage.setItem("cart", JSON.stringify(updatedItems))
        } else {
          // Add new item
          const newItem = {
            id: `cart-${Date.now()}`,
            productId: demoProduct.id,
            name: demoProduct.name,
            price: demoProduct.price,
            image: demoProduct.images[0] || "/placeholder.svg",
            quantity,
          }

          const updatedItems = [...items, newItem]
          setItems(updatedItems)
          localStorage.setItem("cart", JSON.stringify(updatedItems))
        }

        toast({
          title: "Item added to cart",
          description: "Your item has been added to the cart.",
        })
        setIsLoading(false)
        return
      }

      const product = await response.json()

      // Check if item already exists in cart
      const existingItemIndex = items.findIndex((item) => item.productId === productId)

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...items]
        updatedItems[existingItemIndex].quantity += quantity
        setItems(updatedItems)
        localStorage.setItem("cart", JSON.stringify(updatedItems))
      } else {
        // Add new item
        const newItem = {
          id: `cart-${Date.now()}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.images?.[0] || "/placeholder.svg",
          quantity,
        }

        const updatedItems = [...items, newItem]
        setItems(updatedItems)
        localStorage.setItem("cart", JSON.stringify(updatedItems))
      }

      toast({
        title: "Item added to cart",
        description: "Your item has been added to the cart.",
      })
    } catch (error) {
      console.error("Error adding item to cart:", error)
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Update item quantity
  const updateItem = async (cartItemId: string, quantity: number) => {
    try {
      setIsLoading(true)

      // Update local state
      const updatedItems = items.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
      setItems(updatedItems)
      localStorage.setItem("cart", JSON.stringify(updatedItems))
    } catch (error) {
      console.error("Error updating cart item:", error)
      toast({
        title: "Error",
        description: "Failed to update cart item. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Remove item from cart
  const removeItem = async (cartItemId: string) => {
    try {
      setIsLoading(true)

      // Update local state
      const updatedItems = items.filter((item) => item.id !== cartItemId)
      setItems(updatedItems)
      localStorage.setItem("cart", JSON.stringify(updatedItems))

      toast({
        title: "Item removed",
        description: "The item has been removed from your cart.",
      })
    } catch (error) {
      console.error("Error removing item from cart:", error)
      toast({
        title: "Error",
        description: "Failed to remove item from cart. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Clear cart
  const clearCart = async () => {
    try {
      setIsLoading(true)

      // Remove each item one by one
      for (const item of items) {
        await fetch(`/api/cart/remove?cartItemId=${item.id}`, {
          method: "DELETE",
        })
      }

      // Update local state
      setItems([])

      toast({
        title: "Cart cleared",
        description: "Your cart has been cleared.",
      })
    } catch (error) {
      console.error("Error clearing cart:", error)
      toast({
        title: "Error",
        description: "Failed to clear cart. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CartContext.Provider
      value={{
        items,
        isLoading,
        addItem,
        updateItem,
        removeItem,
        clearCart,
        subtotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }

  return context
}
