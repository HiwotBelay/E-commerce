import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature")!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (error: any) {
      console.error(`Webhook signature verification failed: ${error.message}`)
      return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 })
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        // Update order status
        if (paymentIntent.metadata.orderId) {
          await db.order.update({
            where: {
              id: paymentIntent.metadata.orderId,
            },
            data: {
              status: "PROCESSING",
            },
          })
        }
        break

      case "payment_intent.payment_failed":
        const failedPaymentIntent = event.data.object as Stripe.PaymentIntent

        // Update order status
        if (failedPaymentIntent.metadata.orderId) {
          await db.order.update({
            where: {
              id: failedPaymentIntent.metadata.orderId,
            },
            data: {
              status: "PAYMENT_FAILED",
            },
          })
        }
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error handling webhook:", error)
    return NextResponse.json({ error: "Failed to handle webhook" }, { status: 500 })
  }
}
