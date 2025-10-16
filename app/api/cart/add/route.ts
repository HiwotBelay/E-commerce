import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { productId, quantity = 1 } = body

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    // Check if the product exists
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Get or create cart
    let cart = await db.cart.findUnique({
      where: {
        userId: session.user.id,
      },
    })

    if (!cart) {
      cart = await db.cart.create({
        data: {
          userId: session.user.id,
        },
      })
    }

    // Check if item already exists in cart
    const existingCartItem = await db.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    })

    if (existingCartItem) {
      // Update quantity if item already exists
      const updatedCartItem = await db.cartItem.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: existingCartItem.quantity + quantity,
        },
      })

      return NextResponse.json(updatedCartItem)
    } else {
      // Add new item to cart
      const cartItem = await db.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      })

      return NextResponse.json(cartItem)
    }
  } catch (error) {
    console.error("Error adding item to cart:", error)
    return NextResponse.json({ error: "Failed to add item to cart" }, { status: 500 })
  }
}
