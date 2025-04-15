import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-600 hover:text-blue-600">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-600 hover:text-blue-600">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-gray-600 hover:text-blue-600">
                  Deals & Promotions
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="text-gray-600 hover:text-blue-600">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-blue-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-600 hover:text-blue-600">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-600 hover:text-blue-600">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-blue-600">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">About Us</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-blue-600">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-blue-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-600 hover:text-blue-600">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-blue-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-blue-600">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Stay Connected</h3>
            <p className="text-gray-600">
              Subscribe to our newsletter for updates on new products and special promotions.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Your email" type="email" className="border-gray-300" />
              <Button>Subscribe</Button>
            </div>
            <div className="flex gap-4 mt-4">
              <Link href="#" className="text-blue-500 hover:text-blue-700 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-pink-500 hover:text-pink-700 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-blue-400 hover:text-blue-600 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-red-500 hover:text-red-700 transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t mt-12 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Ecommerce Store. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-4">
            <img src="/visa.svg" alt="Visa" className="h-8" />
            <img src="/mastercard.svg" alt="Mastercard" className="h-8" />
            <img src="/amex.svg" alt="American Express" className="h-8" />
            <img src="/paypal.svg" alt="PayPal" className="h-8" />
          </div>
        </div>
      </div>
    </footer>
  )
}
