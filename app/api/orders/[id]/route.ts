import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"

export const runtime = "nodejs"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const order = await db.order.findUnique({
      where: {
        id: params.id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Ensure the order belongs to the user
    if (order.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error fetching order:", error)
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { status } = body

    // Only allow cancellation for now
    if (status !== "CANCELLED") {
      return NextResponse.json({ error: "Invalid status update" }, { status: 400 })
    }

    const order = await db.order.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Ensure the order belongs to the user
    if (order.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Only allow cancellation if order is still pending
    if (order.status !== "PENDING") {
      return NextResponse.json({ error: "Order cannot be cancelled at this stage" }, { status: 400 })
    }

    const updatedOrder = await db.order.update({
      where: {
        id: params.id,
      },
      data: {
        status: "CANCELLED",
      },
    })

    return NextResponse.json(updatedOrder)
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}
