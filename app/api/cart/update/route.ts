import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"

export const runtime = "nodejs"

export async function PATCH(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { cartItemId, quantity } = body

    if (!cartItemId) {
      return NextResponse.json({ error: "Cart item ID is required" }, { status: 400 })
    }

    if (quantity < 1) {
      return NextResponse.json({ error: "Quantity must be at least 1" }, { status: 400 })
    }

    // Verify the cart item belongs to the user
    const cartItem = await db.cartItem.findUnique({
      where: {
        id: cartItemId,
      },
      include: {
        cart: true,
      },
    })

    if (!cartItem) {
      return NextResponse.json({ error: "Cart item not found" }, { status: 404 })
    }

    if (cartItem.cart.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Update the cart item quantity
    const updatedCartItem = await db.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        quantity,
      },
    })

    return NextResponse.json(updatedCartItem)
  } catch (error) {
    console.error("Error updating cart item:", error)
    return NextResponse.json({ error: "Failed to update cart item" }, { status: 500 })
  }
}
