import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Package,
  CreditCard,
  MapPin,
  Heart,
  Settings,
  Bell,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

interface AccountSidebarProps {
  activePage?: string;
}

export function AccountSidebar({ activePage = "" }: AccountSidebarProps) {
  const isActive = (page: string) => activePage === page;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
          <User className="h-6 w-6" />
        </div>
        <div>
          <h2 className="font-bold">John Doe</h2>
          <p className="text-sm text-gray-500">john.doe@example.com</p>
        </div>
      </div>

      <nav className="space-y-1">
        <Button
          variant={isActive("dashboard") ? "default" : "ghost"}
          className={`w-full justify-start font-normal ${
            isActive("dashboard") ? "" : ""
          }`}
          asChild
        >
          <Link href="/account/dashboard" className="flex items-center">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Dashboard
          </Link>
        </Button>

        <Button
          variant={isActive("profile") ? "default" : "ghost"}
          className="w-full justify-start font-normal"
          asChild
        >
          <Link href="/account/profile" className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            Profile
          </Link>
        </Button>

        <Button
          variant={isActive("orders") ? "default" : "ghost"}
          className="w-full justify-start font-normal"
          asChild
        >
          <Link href="/account/orders" className="flex items-center">
            <Package className="h-4 w-4 mr-2" />
            Orders
          </Link>
        </Button>

        <Button
          variant={isActive("addresses") ? "default" : "ghost"}
          className="w-full justify-start font-normal"
          asChild
        >
          <Link href="/account/addresses" className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            Addresses
          </Link>
        </Button>

        <Button
          variant={isActive("payment-methods") ? "default" : "ghost"}
          className="w-full justify-start font-normal"
          asChild
        >
          <Link href="/account/payment-methods" className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            Payment Methods
          </Link>
        </Button>

        <Button
          variant={isActive("wishlist") ? "default" : "ghost"}
          className="w-full justify-start font-normal"
          asChild
        >
          <Link href="/account/wishlist" className="flex items-center">
            <Heart className="h-4 w-4 mr-2" />
            Wishlist
          </Link>
        </Button>

        <Button
          variant={isActive("notifications") ? "default" : "ghost"}
          className="w-full justify-start font-normal"
          asChild
        >
          <Link href="/account/notifications" className="flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
            <span className="ml-auto bg-blue-100 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full">
              3
            </span>
          </Link>
        </Button>

        <Button
          variant={isActive("settings") ? "default" : "ghost"}
          className="w-full justify-start font-normal"
          asChild
        >
          <Link href="/account/settings" className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Link>
        </Button>

        <Separator className="my-2" />

        <Button
          variant="ghost"
          className="w-full justify-start font-normal text-red-500 hover:text-red-600 hover:bg-red-50"
          asChild
        >
          <Link href="/login" className="flex items-center">
            <LogOut className="h-4 w-4 mr-2" />
            Sign out
          </Link>
        </Button>
      </nav>
    </div>
  );
}
