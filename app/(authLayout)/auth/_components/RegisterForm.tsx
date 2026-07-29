"use client"

import { useActionState, useEffect, useState } from "react"
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
import { User, Mail, Lock, Wrench, Briefcase, Shield } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { useSearchParams } from "next/navigation"
import { registerAction, RegistrationState } from "../_actions/registerAction"

const initialState: RegistrationState = {
  success: false,
  message: "",
}

const RegisterForm = () => {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") ?? ""

  const [role, setRole] = useState("CUSTOMER")
  const [state, action, pending] = useActionState(registerAction, initialState)

  useEffect(() => {
    if (state && state.success === false && state.message) {
      toast.error(state.message)
    }
  }, [state])

  const getRoleLabel = () => {
    switch (role) {
      case "CUSTOMER":
        return "Customer"
      case "TECHNICIAN":
        return "Technician"
      case "ADMIN":
        return "Administrator"
      default:
        return "Customer"
    }
  }

  return (
    <form action={action}>
      <input type="hidden" name="role" value={role} />
      <input type="hidden" name="redirectTo" value={redirectTo} />

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
          <CardDescription>Join FixItNow as a {getRoleLabel()}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="mb-6 space-y-2">
            <Label className="mb-2 block text-center">
              I want to join as a:
            </Label>
            <Tabs
              defaultValue="CUSTOMER"
              onValueChange={(val) => setRole(val)}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger
                  value="CUSTOMER"
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" /> Customer
                </TabsTrigger>
                <TabsTrigger
                  value="TECHNICIAN"
                  className="flex items-center gap-2"
                >
                  <Briefcase className="h-4 w-4" /> Technician
                </TabsTrigger>
                <TabsTrigger value="ADMIN" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" /> Admin
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>

              <div className="relative">
                <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="name@example.com"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                name="password"
                id="password"
                type="password"
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={pending}
            className="mt-4 w-full bg-primary py-6 text-white hover:bg-primary/90"
          >
            {pending ? "Creating Account..." : "Create Account"}
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
    </form>
  )
}

export default RegisterForm
