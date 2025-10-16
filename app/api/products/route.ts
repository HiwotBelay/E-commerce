import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export const runtime = "nodejs"

export async function GET() {
  try {
    const products = await db.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const product = await db.product.create({
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
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
