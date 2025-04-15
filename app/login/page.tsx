import { Suspense } from "react"
import { LoginForm } from "@/components/login-form"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Login",
  description: "Login to your account",
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string }
}) {
  // For demo purposes, we'll skip the actual auth check
  // const session = await auth()
  // if (session?.user) {
  //   redirect(searchParams.callbackUrl || "/")
  // }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="w-full max-w-md px-4">
            <LoginForm callbackUrl={searchParams.callbackUrl} />
          </div>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
