"use client"
import Link from "next/link"
import { ChevronLeft, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { CartItem } from "@/components/cart-item"
import { useCart } from "@/components/cart-provider"

interface CartContentProps {
  initialCart: any
}

export function CartContent({ initialCart }: CartContentProps) {
  const { items, subtotal, isLoading } = useCart()

  const shipping = 9.99
  const tax = subtotal * 0.08 // 8% tax rate
  const total = subtotal + shipping + tax

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      {items.length === 0 && !isLoading ? (
        <div className="text-center py-16">
          <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg shadow-sm border">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">
                    Cart Items ({items.reduce((acc, item) => acc + item.quantity, 0)})
                  </h2>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/" className="flex items-center">
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Continue Shopping
                    </Link>
                  </Button>
                </div>

                <div className="space-y-6">
                  {isLoading ? (
                    <div className="text-center py-8">Loading cart items...</div>
                  ) : (
                    items.map((item) => (
                      <CartItem
                        key={item.id}
                        id={item.id}
                        productId={item.productId}
                        name={item.name}
                        price={item.price}
                        image={item.image}
                        quantity={item.quantity}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-card rounded-lg shadow-sm border p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Button className="w-full mt-4" size="lg" asChild>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-2">Have a promo code?</h3>
                <div className="flex gap-2">
                  <Input placeholder="Enter code" />
                  <Button variant="outline">Apply</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
