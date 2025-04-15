"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { FcGoogle } from "react-icons/fc"
import { Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react"

export function RegisterForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // For demo purposes, we'll simulate a successful registration
      setTimeout(() => {
        toast({
          title: "Account created",
          description: "Your account has been created successfully!",
        })
        router.push("/account/dashboard")
      }, 1500)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to register",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Password strength indicators
  const hasMinLength = password.length >= 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password)

  const passwordStrength = [hasMinLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar].filter(Boolean).length

  const getPasswordStrengthText = () => {
    if (password.length === 0) return ""
    if (passwordStrength <= 2) return "Weak"
    if (passwordStrength <= 4) return "Medium"
    return "Strong"
  }

  const getPasswordStrengthColor = () => {
    if (password.length === 0) return "bg-gray-200"
    if (passwordStrength <= 2) return "bg-red-500"
    if (passwordStrength <= 4) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className="space-y-6 bg-white p-8 rounded-xl shadow-lg border">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="text-muted-foreground mt-2">Enter your information to create an account</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="h-11"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-11"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="h-11 pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* Password strength meter */}
          {password.length > 0 && (
            <div className="mt-2 space-y-2">
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs flex justify-between">
                <span>Password strength:</span>
                <span
                  className={
                    passwordStrength <= 2
                      ? "text-red-500"
                      : passwordStrength <= 4
                        ? "text-yellow-500"
                        : "text-green-500"
                  }
                >
                  {getPasswordStrengthText()}
                </span>
              </p>

              <ul className="space-y-1 text-xs">
                <li className="flex items-center gap-1">
                  <span className={hasMinLength ? "text-green-500" : "text-gray-400"}>
                    {hasMinLength ? <CheckCircle2 className="h-3 w-3" /> : "•"}
                  </span>
                  <span className={hasMinLength ? "text-green-500" : "text-gray-500"}>At least 8 characters</span>
                </li>
                <li className="flex items-center gap-1">
                  <span className={hasUpperCase ? "text-green-500" : "text-gray-400"}>
                    {hasUpperCase ? <CheckCircle2 className="h-3 w-3" /> : "•"}
                  </span>
                  <span className={hasUpperCase ? "text-green-500" : "text-gray-500"}>
                    At least one uppercase letter
                  </span>
                </li>
                <li className="flex items-center gap-1">
                  <span className={hasNumber ? "text-green-500" : "text-gray-400"}>
                    {hasNumber ? <CheckCircle2 className="h-3 w-3" /> : "•"}
                  </span>
                  <span className={hasNumber ? "text-green-500" : "text-gray-500"}>At least one number</span>
                </li>
              </ul>
            </div>
          )}
        </div>
        <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <Button
        variant="outline"
        className="w-full h-11 text-base flex items-center gap-2"
        onClick={() => {
          setIsLoading(true)
          setTimeout(() => {
            toast({
              title: "Google Sign-up",
              description: "Successfully created account with Google",
            })
            router.push("/account/dashboard")
            setIsLoading(false)
          }, 1500)
        }}
        disabled={isLoading}
      >
        <FcGoogle className="h-5 w-5" />
        Google
      </Button>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
          Sign in
        </Link>
      </div>
    </div>
  )
}
