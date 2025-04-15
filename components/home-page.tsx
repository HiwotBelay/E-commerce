"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShoppingBag, Truck, Shield, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface HomePageProps {
  featuredProducts: any[]
}

export function HomePage({ featuredProducts }: HomePageProps) {
  // Categories data
  const categories = [
    {
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Latest gadgets and devices",
    },
    {
      name: "Home & Kitchen",
      image:
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Appliances and home essentials",
    },
    {
      name: "Fashion",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Clothing, shoes, and accessories",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80 z-10"></div>
          <div className="relative h-[600px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
              alt="Hero banner"
              width={2000}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 flex items-center z-20">
            <div className="container mx-auto px-4">
              <div className="max-w-xl">
                <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
                  Discover Amazing Products at Unbeatable Prices
                </h1>
                <p className="text-xl text-white/90 mb-8">
                  Shop the latest trends in electronics, fashion, and home essentials.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-white text-blue-900 hover:bg-white/90" asChild>
                    <Link href="/products">Shop Now</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                    <Link href="/deals">View Deals</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex items-center p-6 bg-blue-50 rounded-lg">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold">Free Shipping</h3>
                  <p className="text-sm text-gray-600">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center p-6 bg-blue-50 rounded-lg">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold">Secure Payment</h3>
                  <p className="text-sm text-gray-600">100% secure transactions</p>
                </div>
              </div>
              <div className="flex items-center p-6 bg-blue-50 rounded-lg">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold">24/7 Support</h3>
                  <p className="text-sm text-gray-600">Dedicated customer service</p>
                </div>
              </div>
              <div className="flex items-center p-6 bg-blue-50 rounded-lg">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <ShoppingBag className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold">Easy Returns</h3>
                  <p className="text-sm text-gray-600">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold">Featured Products</h2>
                <p className="text-gray-600 mt-2">Handpicked products for you</p>
              </div>
              <Link href="/products" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  rating={product.rating || 4.5}
                  reviewCount={product.reviewCount || 100}
                  image={product.images?.[0] || "/placeholder.svg"}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Browse our wide selection of products across various categories
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg h-80">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width={500}
                    height={320}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                    <p className="text-white/80 mb-4">{category.description}</p>
                    <Button
                      variant="outline"
                      className="text-black border-white hover:bg-white hover:text-gray-900"
                      asChild
                    >
                      <Link href={`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`}>Explore</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
            <p className="mb-8 max-w-xl mx-auto">
              Stay updated with the latest products, special offers and exclusive deals.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
              <Input
                placeholder="Your email address"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-white"
              />
              <Button className="bg-white text-blue-600 hover:bg-white/90">Subscribe</Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
