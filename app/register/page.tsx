import { Suspense } from "react"
import { RegisterForm } from "@/components/register-form"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Register",
  description: "Create a new account",
}

export default async function RegisterPage() {
  // For demo purposes, we'll skip the actual auth check
  // const session = await auth()
  // if (session?.user) {
  //   redirect("/")
  // }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="w-full max-w-md px-4">
            <RegisterForm />
          </div>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
