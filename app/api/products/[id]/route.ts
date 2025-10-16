import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export const runtime = "nodejs"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const product = await db.product.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const product = await db.product.update({
      where: {
        id: params.id,
      },
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        originalPrice: body.originalPrice,
        images: body.images,
        features: body.features,
        specifications: body.specifications,
        colors: body.colors,
        inStock: body.inStock,
        freeShipping: body.freeShipping,
        estimatedDelivery: body.estimatedDelivery,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await db.product.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
