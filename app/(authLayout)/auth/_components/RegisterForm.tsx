"use client"
import { signIn } from "next-auth/react"
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
import {
  User,
  Mail,
  Lock,
  Wrench,
  Briefcase,
  Shield,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { useSearchParams } from "next/navigation"
import { registerAction, RegistrationState } from "../_actions/registerAction"
import { Separator } from "@/components/ui/separator"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

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
    if (state && state.success) {
      toast.success("Account created successfully!")
    }
  }, [state])

  return (
    <Card className="bg-card/80 rounded-2xl border-border/50 shadow-2xl backdrop-blur-sm">
      <CardHeader className="space-y-1 pt-8">
        <div className="mx-auto mb-4 flex h-14 w-14 -rotate-3 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20 transition-transform group-hover:rotate-0">
          <Wrench className="h-7 w-7 text-primary-foreground" />
        </div>
        <CardTitle className="text-center text-3xl font-black tracking-tight">
          Create Account
        </CardTitle>
        <CardDescription className="text-center text-balance">
          Join FixItNow to experience professional service management
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Role Selection (Requirement: Advanced Menu/Tabs) */}
        <div className="space-y-3">
          <Label className="flex justify-center text-xs font-black tracking-[0.1em] text-muted-foreground uppercase">
            Registering as a
          </Label>
          <Tabs
            defaultValue="CUSTOMER"
            onValueChange={(val) => setRole(val)}
            className="w-full"
          >
            <TabsList className="grid h-12 w-full grid-cols-3 rounded-xl bg-muted/50 p-1">
              <TabsTrigger
                value="CUSTOMER"
                className="gap-2 rounded-lg font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                <User className="h-4 w-4 text-primary" />{" "}
                <span className="hidden sm:inline">Customer</span>
              </TabsTrigger>
              <TabsTrigger
                value="TECHNICIAN"
                className="gap-2 rounded-lg font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                <Briefcase className="h-4 w-4 text-secondary" />{" "}
                <span className="hidden sm:inline">Expert</span>
              </TabsTrigger>
              <TabsTrigger
                value="ADMIN"
                className="gap-2 rounded-lg font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                <Shield className="h-4 w-4 text-accent" />{" "}
                <span className="hidden sm:inline">Admin</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Social Register */}
        {/* <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            type="button"
            onClick={() =>
              signIn("google", { callbackUrl: "/dashboard/customer" })
            }
            className="w-full rounded-xl border-border/60 py-5 transition-all hover:bg-secondary/10"
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
            className="w-full rounded-xl border-border/60 py-5 transition-all hover:bg-secondary/10"
          >
            <FaGithub className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div> */}

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase">
            <span className="bg-card px-3 font-black tracking-[0.2em] text-muted-foreground">
              Quick Signup
            </span>
          </div>
        </div>

        <form action={action} className="space-y-4">
          <input type="hidden" name="role" value={role} />
          <input type="hidden" name="redirectTo" value={redirectTo} />

          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="ml-1 text-xs font-bold tracking-wider uppercase"
            >
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-primary/60" />
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                className="h-12 rounded-xl border-border/60 pl-10 transition-all focus:ring-primary"
                required
              />
            </div>
          </div>

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
                className="h-12 rounded-xl border-border/60 pl-10 transition-all focus:ring-primary"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="ml-1 text-xs font-bold tracking-wider uppercase"
            >
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-primary/60" />
              <Input
                name="password"
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-12 rounded-xl border-border/60 pl-10 transition-all focus:ring-primary"
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
                Processing...
              </>
            ) : (
              `Register as ${role}`
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col space-y-4 pb-8">
        <Separator className="w-full" />
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-black text-primary transition-colors hover:text-primary/80"
          >
            Log in Now
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

export default RegisterForm
