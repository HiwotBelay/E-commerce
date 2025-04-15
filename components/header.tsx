"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ShoppingCart, User, Menu, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/components/cart-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // For demo purposes
  const pathname = usePathname()
  const router = useRouter()
  const { itemCount } = useCart()

  const isActive = (path: string) => {
    return pathname === path
  }

  // Demo products for search
  const demoProducts = [
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    {
      id: "2",
      name: "Smart Watch with Health Monitoring",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a",
    },
    {
      id: "3",
      name: "Ultra HD 4K Smart TV - 55 inch",
      price: 699.99,
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6",
    },
    {
      id: "4",
      name: "Portable Bluetooth Speaker - Waterproof",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    },
    {
      id: "5",
      name: "Wireless Gaming Mouse",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7",
    },
    {
      id: "6",
      name: "Mechanical Gaming Keyboard",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1595044426077-d36d9236d44a",
    },
  ]

  const filteredProducts = demoProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false)

    // If we're not on the homepage, navigate there first
    if (pathname !== "/") {
      router.push("/")
      // Need to wait for navigation to complete before scrolling
      setTimeout(() => {
        const section = document.getElementById(sectionId)
        if (section) {
          section.scrollIntoView({ behavior: "smooth" })
        }
      }, 300)
    } else {
      // If already on homepage, just scroll
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const searchContainer = document.getElementById("search-container")
      if (searchContainer && !searchContainer.contains(event.target as Node)) {
        setShowSearchResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 py-6">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-bold text-xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span>Ecommerce</span>
                </Link>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search products..." className="w-full bg-background pl-8" />
                </div>
                <nav className="flex flex-col gap-4">
                  <button
                    className={`text-left text-lg font-medium ${isActive("/") ? "text-primary" : "text-foreground/60"}`}
                    onClick={() => scrollToSection("home")}
                  >
                    Home
                  </button>
                  <button
                    className="text-left text-lg font-medium text-foreground/60"
                    onClick={() => scrollToSection("featured-products")}
                  >
                    Products
                  </button>
                  <button
                    className="text-left text-lg font-medium text-foreground/60"
                    onClick={() => scrollToSection("categories")}
                  >
                    Categories
                  </button>
                  <button
                    className="text-left text-lg font-medium text-foreground/60"
                    onClick={() => scrollToSection("testimonials")}
                  >
                    About
                  </button>
                  <button
                    className="text-left text-lg font-medium text-foreground/60"
                    onClick={() => scrollToSection("newsletter")}
                  >
                    Contact
                  </button>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <ShoppingCart className="h-6 w-6" />
            <span className="hidden md:inline-block">Ecommerce</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-6 ml-10">
            <button
              className={`text-sm font-medium ${
                isActive("/") ? "text-primary" : "text-foreground/60"
              } transition-colors hover:text-primary`}
              onClick={() => scrollToSection("home")}
            >
              Home
            </button>
            <button
              className="text-sm font-medium text-foreground/60 transition-colors hover:text-primary"
              onClick={() => scrollToSection("featured-products")}
            >
              Products
            </button>
            <button
              className="text-sm font-medium text-foreground/60 transition-colors hover:text-primary"
              onClick={() => scrollToSection("categories")}
            >
              Categories
            </button>
            <button
              className="text-sm font-medium text-foreground/60 transition-colors hover:text-primary"
              onClick={() => scrollToSection("testimonials")}
            >
              About
            </button>
            <button
              className="text-sm font-medium text-foreground/60 transition-colors hover:text-primary"
              onClick={() => scrollToSection("newsletter")}
            >
              Contact
            </button>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div id="search-container" className="hidden md:flex relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-[200px] lg:w-[300px] pl-8"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                if (e.target.value.length > 0) {
                  setShowSearchResults(true)
                } else {
                  setShowSearchResults(false)
                }
              }}
              onFocus={() => {
                if (searchQuery.length > 0) {
                  setShowSearchResults(true)
                }
              }}
            />
            {searchQuery && (
              <button
                className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600"
                onClick={() => {
                  setSearchQuery("")
                  setShowSearchResults(false)
                }}
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {/* Search Results Dropdown */}
            {showSearchResults && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg z-50 max-h-[400px] overflow-y-auto">
                {filteredProducts.length > 0 ? (
                  <div className="p-2">
                    {filteredProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        className="flex items-center p-2 hover:bg-gray-100 rounded-md"
                        onClick={() => setShowSearchResults(false)}
                      >
                        <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden mr-3 flex-shrink-0">
                          <img
                            src={`${product.image}?w=40&h=40&fit=crop`}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{product.name}</p>
                          <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">No products found</div>
                )}
              </div>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {isLoggedIn ? (
                <>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account/dashboard" className="w-full cursor-pointer">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/profile" className="w-full cursor-pointer">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/orders" className="w-full cursor-pointer">
                      Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/wishlist" className="w-full cursor-pointer">
                      Wishlist
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      setIsLoggedIn(false)
                    }}
                    className="cursor-pointer"
                  >
                    Sign out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/login" className="w-full cursor-pointer">
                      Sign in
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register" className="w-full cursor-pointer">
                      Create account
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
