import { Suspense } from "react";
import { CheckoutForm } from "@/components/checkout-form";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "Checkout",
  description: "Complete your purchase",
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          <Suspense fallback={<CheckoutSkeleton />}>
            <CheckoutForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function CheckoutSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Skeleton className="h-[600px] w-full rounded-lg" />
      </div>
      <div>
        <Skeleton className="h-[400px] w-full rounded-lg" />
      </div>
    </div>
  );
}
