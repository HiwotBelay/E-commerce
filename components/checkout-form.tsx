"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle2, CreditCard, Truck } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export function CheckoutForm() {
  const { items, subtotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [step, setStep] = useState(1);
  const router = useRouter();
  const { toast } = useToast();

  // Shipping cost based on selected method
  const shippingCost =
    shippingMethod === "express"
      ? 19.99
      : shippingMethod === "next-day"
      ? 29.99
      : 9.99; // standard

  // Calculate tax (8%)
  const tax = subtotal * 0.08;

  // Calculate total
  const total = subtotal + shippingCost + tax;

  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      // Clear cart
      clearCart();

      // Show success toast
      toast({
        title: "Order placed successfully!",
        description:
          "Thank you for your purchase. You will receive a confirmation email shortly.",
      });

      // Redirect to success page
      router.push("/checkout/success");
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          {/* Checkout Steps */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 1
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {step > 1 ? <CheckCircle2 className="h-6 w-6" /> : 1}
              </div>
              <span className="text-sm mt-2">Shipping</span>
            </div>
            <div className="flex-1 h-1 mx-4 bg-gray-200">
              <div
                className={`h-full ${
                  step > 1 ? "bg-green-500" : "bg-gray-200"
                }`}
              ></div>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 2
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {step > 2 ? <CheckCircle2 className="h-6 w-6" /> : 2}
              </div>
              <span className="text-sm mt-2">Payment</span>
            </div>
            <div className="flex-1 h-1 mx-4 bg-gray-200">
              <div
                className={`h-full ${
                  step > 2 ? "bg-green-500" : "bg-gray-200"
                }`}
              ></div>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 3
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {step > 3 ? <CheckCircle2 className="h-6 w-6" /> : 3}
              </div>
              <span className="text-sm mt-2">Review</span>
            </div>
          </div>

          {/* Step 1: Shipping Information */}
          {step === 1 && (
            <form onSubmit={handleSubmitShipping}>
              <h2 className="text-xl font-bold mb-6">Shipping Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" required className="mt-1" />
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="apartment">
                    Apartment, suite, etc. (optional)
                  </Label>
                  <Input id="apartment" className="mt-1" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="state">State/Province</Label>
                    <Select defaultValue="CA">
                      <SelectTrigger id="state" className="mt-1">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AL">Alabama</SelectItem>
                        <SelectItem value="AK">Alaska</SelectItem>
                        <SelectItem value="AZ">Arizona</SelectItem>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="CO">Colorado</SelectItem>
                        <SelectItem value="CT">Connecticut</SelectItem>
                        <SelectItem value="FL">Florida</SelectItem>
                        <SelectItem value="GA">Georgia</SelectItem>
                        <SelectItem value="HI">Hawaii</SelectItem>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="TX">Texas</SelectItem>
                        <SelectItem value="WA">Washington</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP / Postal Code</Label>
                    <Input id="zipCode" required className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select defaultValue="US">
                    <SelectTrigger id="country" className="mt-1">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="MX">Mexico</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mb-6">
                <Label className="text-base font-medium mb-3 block">
                  Shipping Method
                </Label>
                <RadioGroup
                  value={shippingMethod}
                  onValueChange={setShippingMethod}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="standard" id="standard" />
                      <div>
                        <Label
                          htmlFor="standard"
                          className="font-medium cursor-pointer"
                        >
                          Standard Shipping
                        </Label>
                        <p className="text-sm text-gray-500">
                          Delivery in 3-5 business days
                        </p>
                      </div>
                    </div>
                    <div className="font-medium">$9.99</div>
                  </div>
                  <div className="flex items-center justify-between border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="express" id="express" />
                      <div>
                        <Label
                          htmlFor="express"
                          className="font-medium cursor-pointer"
                        >
                          Express Shipping
                        </Label>
                        <p className="text-sm text-gray-500">
                          Delivery in 2-3 business days
                        </p>
                      </div>
                    </div>
                    <div className="font-medium">$19.99</div>
                  </div>
                  <div className="flex items-center justify-between border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="next-day" id="next-day" />
                      <div>
                        <Label
                          htmlFor="next-day"
                          className="font-medium cursor-pointer"
                        >
                          Next Day Delivery
                        </Label>
                        <p className="text-sm text-gray-500">
                          Order before 2pm for next day delivery
                        </p>
                      </div>
                    </div>
                    <div className="font-medium">$29.99</div>
                  </div>
                </RadioGroup>
              </div>

              <div className="mb-6">
                <Label htmlFor="notes">Order Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Special instructions for delivery"
                  className="mt-1"
                />
              </div>

              <Button type="submit" className="w-full">
                Continue to Payment
              </Button>
            </form>
          )}

          {/* Step 2: Payment Information */}
          {step === 2 && (
            <form onSubmit={handleSubmitPayment}>
              <h2 className="text-xl font-bold mb-6">Payment Information</h2>

              <div className="mb-6">
                <Label className="text-base font-medium mb-3 block">
                  Payment Method
                </Label>
                <Tabs
                  defaultValue="credit-card"
                  onValueChange={setPaymentMethod}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="credit-card">Credit Card</TabsTrigger>
                    <TabsTrigger value="paypal">PayPal</TabsTrigger>
                    <TabsTrigger value="apple-pay">Apple Pay</TabsTrigger>
                  </TabsList>

                  <TabsContent value="credit-card" className="space-y-4">
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input
                          id="cvc"
                          placeholder="123"
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="saveCard" />
                      <label
                        htmlFor="saveCard"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Save card for future purchases
                      </label>
                    </div>
                  </TabsContent>

                  <TabsContent value="paypal" className="text-center py-8">
                    <div className="mb-4">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png"
                        alt="PayPal"
                        className="h-12 mx-auto"
                      />
                    </div>
                    <p className="text-gray-600 mb-4">
                      You will be redirected to PayPal to complete your payment.
                    </p>
                    <Button
                      type="button"
                      className="bg-[#0070ba] hover:bg-[#005ea6]"
                    >
                      Continue with PayPal
                    </Button>
                  </TabsContent>

                  <TabsContent value="apple-pay" className="text-center py-8">
                    <div className="mb-4">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/1200px-Apple_Pay_logo.svg.png"
                        alt="Apple Pay"
                        className="h-12 mx-auto"
                      />
                    </div>
                    <p className="text-gray-600 mb-4">
                      Click the button below to pay with Apple Pay.
                    </p>
                    <Button
                      type="button"
                      className="bg-black hover:bg-gray-900"
                    >
                      Pay with Apple Pay
                    </Button>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="mb-6">
                <Label className="text-base font-medium mb-3 block">
                  Billing Address
                </Label>
                <div className="flex items-center space-x-2 mb-4">
                  <Checkbox id="sameAsShipping" defaultChecked />
                  <label
                    htmlFor="sameAsShipping"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Same as shipping address
                  </label>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Back to Shipping
                </Button>
                <Button type="submit" className="flex-1">
                  Review Order
                </Button>
              </div>
            </form>
          )}

          {/* Step 3: Order Review */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold mb-6">Review Your Order</h2>

              <div className="mb-6">
                <h3 className="font-medium mb-3">Shipping Address</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p>John Doe</p>
                  <p>123 Main Street</p>
                  <p>Apt 4B</p>
                  <p>San Francisco, CA 94103</p>
                  <p>United States</p>
                  <p>Phone: (555) 123-4567</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-3">Shipping Method</h3>
                <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                  <div className="flex items-center">
                    <Truck className="h-5 w-5 mr-2 text-gray-500" />
                    {shippingMethod === "standard" &&
                      "Standard Shipping (3-5 business days)"}
                    {shippingMethod === "express" &&
                      "Express Shipping (2-3 business days)"}
                    {shippingMethod === "next-day" && "Next Day Delivery"}
                  </div>
                  <div>${shippingCost.toFixed(2)}</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-3">Payment Method</h3>
                <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-gray-500" />
                    {paymentMethod === "credit-card" &&
                      "Credit Card (ending in 3456)"}
                    {paymentMethod === "paypal" && "PayPal"}
                    {paymentMethod === "apple-pay" && "Apple Pay"}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-3">Order Items</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center py-2 border-b last:border-0"
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded bg-gray-200 overflow-hidden mr-3">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="flex-1"
                >
                  Back to Payment
                </Button>
                <Button
                  type="button"
                  className="flex-1"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order Summary */}
      <div>
        <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-20">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.quantity} × {item.name}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between font-bold text-lg mb-6">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 mb-4">
            <p className="flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
              Secure checkout
            </p>
            <p className="flex items-center mt-2">
              <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
              Free returns within 30 days
            </p>
          </div>

          {step === 1 && (
            <div className="text-center text-sm text-gray-500">
              Proceed to payment after filling shipping details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
