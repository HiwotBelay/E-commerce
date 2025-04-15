import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Order Confirmation",
  description: "Your order has been placed successfully",
};

export default function OrderSuccessPage() {
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>

            <h1 className="text-3xl font-bold mb-2">
              Thank You for Your Order!
            </h1>
            <p className="text-gray-600 mb-6">
              Your order has been placed successfully and is being processed.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <div className="mb-4">
                <span className="text-sm text-gray-500">Order Number:</span>
                <p className="text-xl font-bold">{orderNumber}</p>
              </div>

              <div className="mb-4">
                <span className="text-sm text-gray-500">Order Date:</span>
                <p className="font-medium">
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div>
                <span className="text-sm text-gray-500">
                  Estimated Delivery:
                </span>
                <p className="font-medium">
                  {new Date(
                    Date.now() + 5 * 24 * 60 * 60 * 1000
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <p className="text-gray-600 mb-8">
              We've sent a confirmation email to{" "}
              <span className="font-medium">john.doe@example.com</span> with all
              the details of your order.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/">Continue Shopping</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/account/orders">View Order Status</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
