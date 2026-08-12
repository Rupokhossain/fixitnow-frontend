"use client"
import { signIn } from "next-auth/react"
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
import { Lock, Mail, Wrench, Loader2 } from "lucide-react"
import Link from "next/link"
import { useActionState, useEffect, useState } from "react"
import { loginAction } from "../_actions/authActions"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { Separator } from "@/components/ui/separator"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"

const LoginForm = () => {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") ?? ""

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [state, action, pending] = useActionState(
    loginAction.bind(null, redirectTo),
    false
  )

  useEffect(() => {
    if (state && !state.success) {
      toast.error(state.message || "Login failed")
    }
    if (state && state.success) {
      toast.success("Welcome back to FixItNow!")
    }
  }, [state])

  const fillDemoCredentials = (role: "admin" | "user") => {
    if (role === "admin") {
      setEmail("admin@fixitnow.com")
      setPassword("admin123")
    } else {
      setEmail("user@fixitnow.com")
      setPassword("user123")
    }
    toast.info(`${role.toUpperCase()} credentials filled!`)
  }

  return (
    <Card className="bg-card/80 rounded-2xl border-border/50 shadow-2xl backdrop-blur-sm">
      <CardHeader className="space-y-1 pt-8">
        <div className="mx-auto mb-4 flex h-14 w-14 rotate-3 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20 transition-transform group-hover:rotate-0">
          <Wrench className="h-7 w-7 text-primary-foreground" />
        </div>
        <CardTitle className="text-center text-3xl font-black tracking-tight">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-center text-balance">
          Enter your credentials to access your professional dashboard
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Social Login (Requirement 6) */}
        {/* <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            type="button"
            onClick={() =>
              signIn("google", { callbackUrl: "/dashboard/customer" })
            }
            className="w-full rounded-xl border-border/60 py-6 transition-all hover:bg-secondary/10"
          >
            <FcGoogle className="h-6 w-6" />
            Google
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={() =>
              signIn("github", { callbackUrl: "/dashboard/customer" })
            }
            className="w-full rounded-xl border-border/60 py-6 transition-all hover:bg-secondary/10"
          >
            <FaGithub className="h-6 w-6" />
            GitHub
          </Button>
        </div> */}

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-3 font-semibold tracking-widest text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="ml-1 text-xs font-bold tracking-wider uppercase"
            >
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-primary/60" />
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="name@example.com"
                className="h-12 rounded-xl border-border/60 pl-10 transition-all focus:border-primary focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="ml-1 text-xs font-bold tracking-wider uppercase"
              >
                Password
              </Label>
              <Link
                href="#"
                className="text-xs font-bold text-primary hover:underline"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-primary/60" />
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                className="h-12 rounded-xl border-border/60 pl-10 transition-all focus:border-primary focus:ring-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <Button
            className="w-full rounded-xl py-6 text-base font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-95"
            disabled={pending}
          >
            {pending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Authenticating...
              </>
            ) : (
              "Sign In to Account"
            )}
          </Button>
        </form>

        <div className="pt-2">
          <p className="mb-3 text-center text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase">
            Quick Access Demo
          </p>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              className="flex-1 rounded-lg bg-muted text-xs text-foreground uppercase hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-primary-foreground"
              onClick={() => fillDemoCredentials("user")}
            >
              Demo User
            </Button>

            <Button
              type="button"
              variant="secondary"
              className="flex-1 rounded-lg bg-muted text-xs text-foreground uppercase hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-primary-foreground"
              onClick={() => fillDemoCredentials("admin")}
            >
              Demo Admin
            </Button>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col space-y-4 pb-8">
        <Separator className="w-full" />
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="font-black text-primary transition-colors hover:text-primary/80"
          >
            Create an Account
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

export default LoginForm
