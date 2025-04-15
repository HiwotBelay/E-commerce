import ProductDetailPage from "@/components/product-detail-page"

// This is a demo product for when you don't have a database set up yet
const demoProduct = {
  id: "1",
  name: "Wireless Noise Cancelling Headphones - Premium Sound Quality",
  price: 249.99,
  originalPrice: 299.99,
  rating: 4.8,
  reviewCount: 356,
  description:
    "Experience premium sound quality with these wireless noise cancelling headphones. Featuring advanced noise cancellation technology, these headphones deliver immersive audio with deep bass and crystal-clear highs. The comfortable over-ear design and long battery life make them perfect for all-day use.",
  features: [
    "Active Noise Cancellation Technology",
    "40 hours of battery life",
    "Premium sound quality with deep bass",
    "Comfortable over-ear design",
    "Quick charge - 5 minutes for 3 hours of playback",
    "Bluetooth 5.0 with multi-device connection",
  ],
  specifications: {
    Brand: "AudioTech",
    Model: "NC-500",
    Color: "Matte Black",
    Connectivity: "Bluetooth 5.0, 3.5mm audio jack",
    "Battery Life": "Up to 40 hours",
    "Charging Time": "2 hours",
    Weight: "250g",
    Warranty: "2 years",
  },
  colors: [
    { name: "Black", value: "black" },
    { name: "Silver", value: "silver" },
    { name: "Blue", value: "blue" },
  ],
  images: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  ],
  inStock: true,
  freeShipping: true,
  estimatedDelivery: "2-4 business days",
}

// Demo related products
const demoRelatedProducts = [
  {
    id: "r1",
    name: "Wireless Earbuds with Charging Case",
    price: 129.99,
    originalPrice: 149.99,
    rating: 4.6,
    reviewCount: 218,
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "r2",
    name: "Premium Bluetooth Speaker - Waterproof",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.5,
    reviewCount: 128,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "r3",
    name: "Noise Cancelling Earbuds",
    price: 149.99,
    originalPrice: 179.99,
    rating: 4.7,
    reviewCount: 182,
    image:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "r4",
    name: "Wireless Charging Pad",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.3,
    reviewCount: 94,
    image:
      "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
]

export default async function ProductPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the product from your database
  // For demo purposes, we're using the demo product

  // Uncomment this when you have your database set up
  // try {
  //   const product = await db.product.findUnique({
  //     where: {
  //       id: params.id,
  //     },
  //   })
  //
  //   if (!product) {
  //     notFound()
  //   }
  //
  //   // Fetch related products
  //   const relatedProducts = await db.product.findMany({
  //     where: {
  //       id: {
  //         not: params.id,
  //       },
  //     },
  //     take: 4,
  //   })
  //
  //   return <ProductDetailPage product={product} relatedProducts={relatedProducts} />
  // } catch (error) {
  //   console.error("Error fetching product:", error)
  //   notFound()
  // }

  // For demo purposes, just return the demo product
  return <ProductDetailPage product={demoProduct} relatedProducts={demoRelatedProducts} />
}
