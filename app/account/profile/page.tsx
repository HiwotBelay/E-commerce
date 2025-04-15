import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Account Profile",
  description: "Manage your account profile",
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-20">
                <h2 className="text-xl font-bold mb-6">Account</h2>
                <nav className="space-y-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-normal"
                    asChild
                  >
                    <a href="/account/profile" className="text-primary">
                      Profile
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-normal"
                    asChild
                  >
                    <a href="/account/orders">Orders</a>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-normal"
                    asChild
                  >
                    <a href="/account/addresses">Addresses</a>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-normal"
                    asChild
                  >
                    <a href="/account/payment-methods">Payment Methods</a>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-normal"
                    asChild
                  >
                    <a href="/account/wishlist">Wishlist</a>
                  </Button>
                  <Separator className="my-2" />
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-normal text-red-500 hover:text-red-600 hover:bg-red-50"
                    asChild
                  >
                    <a href="/login">Sign out</a>
                  </Button>
                </nav>
              </div>
            </div>
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h1 className="text-2xl font-bold mb-6">Profile</h1>

                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="mb-6">
                    <TabsTrigger value="personal">
                      Personal Information
                    </TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          defaultValue="John"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          defaultValue="Doe"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue="john.doe@example.com"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          defaultValue="(555) 123-4567"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <Button>Save Changes</Button>
                  </TabsContent>

                  <TabsContent value="security" className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="currentPassword">
                          Current Password
                        </Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">
                          Confirm New Password
                        </Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <Button>Update Password</Button>
                  </TabsContent>

                  <TabsContent value="preferences" className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-base">Email Notifications</Label>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="orderUpdates"
                              className="mr-2"
                              defaultChecked
                            />
                            <label htmlFor="orderUpdates">Order updates</label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="promotions"
                              className="mr-2"
                              defaultChecked
                            />
                            <label htmlFor="promotions">
                              Promotions and deals
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="newsletter"
                              className="mr-2"
                              defaultChecked
                            />
                            <label htmlFor="newsletter">Newsletter</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button>Save Preferences</Button>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
