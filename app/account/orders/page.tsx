import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Package, Eye, Download } from "lucide-react";

export const metadata = {
  title: "My Orders",
  description: "View your order history",
};

export default function OrdersPage() {
  // Demo orders for display
  const orders = [
    {
      id: "ORD-1234",
      date: "April 8, 2025",
      status: "Delivered",
      total: 329.97,
      items: 3,
    },
    {
      id: "ORD-5678",
      date: "March 25, 2025",
      status: "Processing",
      total: 149.99,
      items: 1,
    },
    {
      id: "ORD-9012",
      date: "February 12, 2025",
      status: "Shipped",
      total: 89.98,
      items: 2,
    },
    {
      id: "ORD-3456",
      date: "January 5, 2025",
      status: "Delivered",
      total: 199.99,
      items: 1,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-20">
                <h2 className="text-xl font-bold mb-6">Account</h2>
                <nav className="space-y-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-normal"
                    asChild
                  >
                    <a href="/account/profile">Profile</a>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-normal"
                    asChild
                  >
                    <a href="/account/orders" className="text-primary">
                      Orders
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-normal"
                    asChild
                  >
                    <a href="/account/addresses">Addresses</a>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-normal"
                    asChild
                  >
                    <a href="/account/payment-methods">Payment Methods</a>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-normal"
                    asChild
                  >
                    <a href="/account/wishlist">Wishlist</a>
                  </Button>
                  <Separator className="my-2" />
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-normal text-red-500 hover:text-red-600 hover:bg-red-50"
                    asChild
                  >
                    <a href="/login">Sign out</a>
                  </Button>
                </nav>
              </div>
            </div>
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h1 className="text-2xl font-bold mb-6">My Orders</h1>

                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold">Order {order.id}</h3>
                              <Badge
                                variant={
                                  order.status === "Delivered"
                                    ? "success"
                                    : order.status === "Shipped"
                                    ? "info"
                                    : "default"
                                }
                              >
                                {order.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500">
                              Placed on {order.date}
                            </p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <p className="font-bold">
                              ${order.total.toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500">
                              {order.items}{" "}
                              {order.items === 1 ? "item" : "items"}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/account/orders/${order.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Link>
                          </Button>
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/account/orders/${order.id}/invoice`}>
                              <Download className="h-4 w-4 mr-2" />
                              Download Invoice
                            </Link>
                          </Button>
                          {order.status === "Delivered" && (
                            <Button size="sm" variant="outline">
                              Buy Again
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                    <p className="text-gray-500 mb-6">
                      You haven't placed any orders yet.
                    </p>
                    <Button asChild>
                      <Link href="/">Start Shopping</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
