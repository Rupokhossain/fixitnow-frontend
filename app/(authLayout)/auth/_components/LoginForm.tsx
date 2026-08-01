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
import { Lock, Mail, Wrench } from "lucide-react"
import Link from "next/link"
import { useActionState, useEffect } from "react"
import { loginAction } from "../_actions/authActions"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { setUser } from "@/app/redux/features/authSlice"

const LoginForm = () => {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") ?? ""

  const [state, action, pending] = useActionState(
    loginAction.bind(null, redirectTo),
    false
  )
  const dispatch = useDispatch();

  useEffect(() => {
    if (state && !state.success) {
      toast.error(state.message || "Login failed")
    }

    if (state && state.success) {
       dispatch(setUser(state.data.user)); 
      toast.success("Login Successful!")
    }
  }, [state, dispatch])

  return (
    <form action={action}>
      <Card className="w-full max-w-2xl border-border shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-lg bg-primary p-2">
              <Wrench className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Enter your credentials to access your FixItNow account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
            </div>
            <div className="relative">
              <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                name="password"
                className="pl-10"
              />
            </div>
          </div>
          <Button className="w-full bg-primary py-6 text-white hover:bg-primary/90">
            {pending ? "Submitting..." : "Sign In"}
          </Button>
        </CardContent>
        <CardFooter className="flex flex-wrap justify-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="ml-1 font-bold text-primary hover:underline"
          >
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </form>
  )
}

export default LoginForm
