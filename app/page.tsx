import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ShoppingBag, Truck, Shield, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Home() {
  // Demo featured products for the homepage
  const featuredProducts = [
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 249.99,
      originalPrice: 299.99,
      rating: 4.8,
      reviewCount: 356,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      isBestSeller: true,
    },
    {
      id: "2",
      name: "Smart Watch with Health Monitoring",
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.6,
      reviewCount: 218,
      image:
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      isNew: true,
    },
    {
      id: "3",
      name: "Ultra HD 4K Smart TV - 55 inch",
      price: 699.99,
      originalPrice: 899.99,
      rating: 4.7,
      reviewCount: 182,
      image:
        "https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "4",
      name: "Portable Bluetooth Speaker - Waterproof",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.5,
      reviewCount: 128,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
  ]

  // Categories for the homepage
  const categories = [
    {
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Latest gadgets and devices",
    },
    {
      name: "Home & Kitchen",
      image:
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Appliances and home essentials",
    },
    {
      name: "Fashion",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Clothing, shoes, and accessories",
    },
  ]

  // Trending products
  const trendingProducts = [
    {
      id: "5",
      name: "Wireless Gaming Mouse",
      price: 59.99,
      originalPrice: 79.99,
      rating: 4.7,
      reviewCount: 203,
      image:
        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "6",
      name: "Mechanical Gaming Keyboard",
      price: 129.99,
      originalPrice: 159.99,
      rating: 4.8,
      reviewCount: 176,
      image:
        "/game.jpg",
    },
    {
      id: "7",
      name: "Ergonomic Office Chair",
      price: 249.99,
      originalPrice: 299.99,
      rating: 4.6,
      reviewCount: 142,
      image:
        "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
  ]

  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Verified Buyer",
      content:
        "I've been shopping here for years and the quality never disappoints. The customer service is exceptional and shipping is always fast!",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Verified Buyer",
      content:
        "Found exactly what I was looking for at a great price. The website is easy to navigate and checkout was seamless. Will definitely shop here again!",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Verified Buyer",
      content:
        "The product arrived even faster than expected and was exactly as described. Very happy with my purchase and the overall shopping experience.",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      rating: 4,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="relative h-[700px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/80 to-white/0 z-10"></div>
          <div className="relative h-full overflow-hidden">
            <Image
              src="/77.jpg"
              alt="Hero banner"
              fill
              className="object-contain transform translate-x-[16%]"
              priority
            />
          </div>
          <div className="absolute inset-0 flex items-center z-20">
            <div className="container mx-auto px-4">
              <div className="max-w-xl bg-white/90 p-8 rounded-lg shadow-lg backdrop-blur-sm">
                <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  Discover Amazing Products at Unbeatable Prices
                </h1>
                <p className="text-xl text-gray-700 mb-8">
                  Shop the latest trends in electronics, fashion, and home essentials with free shipping on orders over
                  $50.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-14 text-lg" asChild>
                    <Link href="/products">Shop Now</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 h-14 text-lg"
                    asChild
                  >
                    <Link href="/deals">View Deals</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex items-center p-6 bg-blue-50 rounded-lg transform transition-transform hover:scale-105 border-2 border-blue-100">
                <div className="bg-blue-500 p-3 rounded-full mr-4 text-white">
                  <Truck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-700">Free Shipping</h3>
                  <p className="text-sm text-gray-600">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center p-6 bg-green-50 rounded-lg transform transition-transform hover:scale-105 border-2 border-green-100">
                <div className="bg-green-500 p-3 rounded-full mr-4 text-white">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-green-700">Secure Payment</h3>
                  <p className="text-sm text-gray-600">100% secure transactions</p>
                </div>
              </div>
              <div className="flex items-center p-6 bg-purple-50 rounded-lg transform transition-transform hover:scale-105 border-2 border-purple-100">
                <div className="bg-purple-500 p-3 rounded-full mr-4 text-white">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-purple-700">24/7 Support</h3>
                  <p className="text-sm text-gray-600">Dedicated customer service</p>
                </div>
              </div>
              <div className="flex items-center p-6 bg-amber-50 rounded-lg transform transition-transform hover:scale-105 border-2 border-amber-100">
                <div className="bg-amber-500 p-3 rounded-full mr-4 text-white">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-amber-700">Easy Returns</h3>
                  <p className="text-sm text-gray-600">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section id="featured-products" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold">Featured Products</h2>
                <p className="text-gray-600 mt-2">Handpicked products for you</p>
              </div>
              <Link href="/product/1" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
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
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  image={product.image}
                  isBestSeller={product.isBestSeller}
                  isNew={product.isNew}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section id="categories" className="py-16 bg-white">
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
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                    <p className="text-white/80 mb-4">{category.description}</p>
                    <Button
                      variant="outline"
                      className="text-blue-900 border-white hover:bg-white hover:text-gray-900"
                      asChild
                    >
                      <Link href={`/product/${index + 1}`}>Explore</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Products */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold">Trending Now</h2>
                <p className="text-gray-600 mt-2">What's popular this week</p>
              </div>
              <Link href="/product/5" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {trendingProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  image={product.image}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Special Offer Banner */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl overflow-hidden shadow-lg">
              <div className="flex flex-col md:flex-row items-center justify-between p-8">
                <div className="mb-8 md:mb-0 md:mr-8 max-w-xl">
                  <span className="inline-block bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full mb-4">
                    Limited Time Offer
                  </span>
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">Special Summer Sale!</h2>
                  <p className="text-xl mb-6 text-gray-700">
                    Get 20% off on all electronics this week. Use code <span className="font-bold">SUMMER20</span> at
                    checkout.
                  </p>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-14 text-lg" asChild>
                    <Link href="/product/1">Shop Now</Link>
                  </Button>
                </div>
                <div className="relative w-full md:w-1/2 h-64 md:h-80 rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Special offer"
                    fill
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-xl font-bold h-16 w-16 rounded-full flex items-center justify-center transform rotate-12">
                    20% OFF
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our customers have to say about their shopping experience.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-gray-50 p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section id="newsletter" className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Join Our Newsletter</h2>
                <p className="mb-8 text-gray-700 max-w-xl mx-auto">
                  Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals. We'll send you a 10%
                  discount code as a welcome gift!
                </p>
                <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="px-4 py-3 rounded-md flex-1 text-gray-900 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700 h-12">Subscribe</Button>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  By subscribing, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
