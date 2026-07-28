"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Lock, Wrench, Briefcase } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function RegisterPage() {
  const [role, setRole] = useState("customer")

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/30 px-4 py-12">
      <Card className="w-full max-w-lg border-border shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-lg bg-primary p-2">
              <Wrench className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            Create an Account
          </CardTitle>
          <CardDescription>
            Join FixItNow as a {role === "customer" ? "Customer" : "Technician"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Role Selection Tabs */}
          <div className="mb-6 space-y-2">
            <Label className="mb-2 block text-center">
              I want to join as a:
            </Label>
            <Tabs
              defaultValue="customer"
              onValueChange={(val) => setRole(val)}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="customer"
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" /> Customer
                </TabsTrigger>
                <TabsTrigger
                  value="technician"
                  className="flex items-center gap-2"
                >
                  <Briefcase className="h-4 w-4" /> Technician
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Doe" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="password" type="password" className="pl-10" />
            </div>
          </div>

          <Button className="mt-4 w-full bg-primary py-6 text-white hover:bg-primary/90">
            Create Account
          </Button>
        </CardContent>
        <CardFooter className="flex flex-wrap justify-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="ml-1 font-bold text-primary hover:underline"
          >
            Log in
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
