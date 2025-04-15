import { Suspense } from "react"
import { CartContent } from "@/components/cart-content"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "Your Cart",
  description: "View and manage your shopping cart",
}

export default function CartPage() {
  // For demo purposes, we're not requiring authentication
  return (
    <Suspense fallback={<CartSkeleton />}>
      <CartContent initialCart={null} />
    </Suspense>
  )
}

function CartSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-10 w-48 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Skeleton className="h-[400px] w-full rounded-lg" />
        </div>
        <div>
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}
