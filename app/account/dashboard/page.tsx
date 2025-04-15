import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AccountSidebar } from "@/components/account-sidebar";
import { Package, CreditCard, MapPin, Heart, Gift } from "lucide-react";

export const metadata = {
  title: "Account Dashboard",
  description: "Manage your account and view recent orders",
};

export default function DashboardPage() {
  // Demo recent orders for display
  const recentOrders = [
    {
      id: "ORD-1234",
      date: "April 8, 2025",
      status: "Delivered",
      total: 329.97,
    },
    {
      id: "ORD-5678",
      date: "March 25, 2025",
      status: "Processing",
      total: 149.99,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
              <AccountSidebar activePage="dashboard" />
            </div>
            <div className="md:w-3/4 space-y-6">
              {/* Welcome Section */}
              <Card className="border-none shadow-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Welcome back, John!
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    Here's what's happening with your account today.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                    <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                      <p className="text-sm font-medium text-blue-100">
                        Total Orders
                      </p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                    <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                      <p className="text-sm font-medium text-blue-100">
                        Wishlist Items
                      </p>
                      <p className="text-2xl font-bold">8</p>
                    </div>
                    <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                      <p className="text-sm font-medium text-blue-100">
                        Reward Points
                      </p>
                      <p className="text-2xl font-bold">250</p>
                    </div>
                    <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                      <p className="text-sm font-medium text-blue-100">
                        Saved Addresses
                      </p>
                      <p className="text-2xl font-bold">2</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Special Offers */}
              <Card className="border-none shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Special Offers</CardTitle>
                    <Badge
                      variant="outline"
                      className="bg-red-50 text-red-600 hover:bg-red-50"
                    >
                      New
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-r from-amber-100 to-amber-50 p-4 rounded-lg border border-amber-200">
                    <div className="flex items-center gap-3">
                      <Gift className="h-10 w-10 text-amber-600" />
                      <div>
                        <h3 className="font-bold text-amber-900">
                          20% OFF Your Next Purchase
                        </h3>
                        <p className="text-amber-800 text-sm">
                          Use code <span className="font-bold">WELCOME20</span>{" "}
                          at checkout. Expires in 7 days.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Orders */}
              <Card className="border-none shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Orders</CardTitle>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/account/orders">View All</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {recentOrders.length > 0 ? (
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{order.id}</h3>
                              <Badge
                                variant={
                                  order.status === "Delivered"
                                    ? "success"
                                    : order.status === "Shipped"
                                    ? "info"
                                    : "default"
                                }
                                className="text-xs"
                              >
                                {order.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500">
                              {order.date}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <p className="font-medium">
                              ${order.total.toFixed(2)}
                            </p>
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/account/orders/${order.id}`}>
                                Details
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Package className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                      <h3 className="font-medium mb-1">No orders yet</h3>
                      <p className="text-gray-500 text-sm mb-4">
                        You haven't placed any orders yet.
                      </p>
                      <Button asChild>
                        <Link href="/">Start Shopping</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-none shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Heart className="h-5 w-5 text-pink-500" />
                      Wishlist
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-3">
                      You have 8 items in your wishlist
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      asChild
                    >
                      <Link href="/account/wishlist">View Wishlist</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-500" />
                      Addresses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-3">
                      Manage your shipping addresses
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      asChild
                    >
                      <Link href="/account/addresses">Manage Addresses</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-green-500" />
                      Payment Methods
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-3">
                      Manage your payment options
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      asChild
                    >
                      <Link href="/account/payment-methods">
                        Manage Payments
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Recently Viewed */}
              <Card className="border-none shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle>Recently Viewed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((item) => (
                      <Link
                        href={`/product/${item}`}
                        key={item}
                        className="group"
                      >
                        <div className="aspect-square bg-gray-100 rounded-md overflow-hidden mb-2">
                          <img
                            src={`https://images.unsplash.com/photo-150${
                              item + 5000000
                            }-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80`}
                            alt="Product"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h3 className="text-sm font-medium truncate group-hover:text-blue-600">
                          Premium Product {item}
                        </h3>
                        <p className="text-sm text-gray-500">
                          ${(item * 49.99).toFixed(2)}
                        </p>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
