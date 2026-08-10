/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { Button } from "@/components/ui/button"
import {
  Wrench,
  User,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/app/redux/store"
import { logout } from "@/app/redux/features/authSlice"
import { logoutAction } from "@/app/(authLayout)/auth/_actions/logoutAction"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const dispatch = useDispatch()
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  const user = useSelector((state: RootState) => state.auth.user)
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = async () => {
    dispatch(logout())
    await logoutAction()
    setIsMobileMenuOpen(false)
  }

  const getDashboardPath = () => {
    if (!user) return "/"
    return `/dashboard/${user.role.toLowerCase()}`
  }

  const publicRoutes = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ]

  const authRoutes = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Explore", path: "/explore" },
    { name: "Blog", path: "/blog" },
    { name: "Dashboard", path: getDashboardPath() },
    { name: "About", path: "/about" },
  ]

  const activeRoutes = user ? authRoutes : publicRoutes

  return (
    <nav className="sticky top-0 z-[100] w-full border-b border-border bg-background/95 shadow-sm backdrop-blur-md transition-all">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - Primary Color: Indigo */}
          <Link href="/" className="group flex shrink-0 items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg transition-transform group-hover:rotate-12">
              <Wrench className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-foreground">
              FIXIT
              <span className="NOT-italic font-bold text-primary">NOW</span>
            </span>
          </Link>

          {/* Desktop Links (Requirement: Consistent layout & alignment) */}
          <div className="hidden items-center gap-1 lg:flex">
            {activeRoutes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-bold transition-all hover:bg-muted",
                  pathname === route.path
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {route.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full hover:bg-secondary/20"
            >
              {mounted && theme === "dark" ? (
                <Sun className="h-5 w-5 text-amber-500 transition-all" />
              ) : (
                <Moon className="h-5 w-5 text-indigo-600 transition-all" />
              )}
            </Button>

            {!user ? (
              <div className="hidden items-center gap-2 md:flex">
                <Link href="/auth/login">
                  <Button variant="ghost" className="rounded-full font-bold">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="rounded-full px-6 font-bold">
                    Join Free
                  </Button>
                </Link>
              </div>
            ) : (
              /* Advanced Profile Menu (Requirement: 7) */
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-11 rounded-full border border-border pr-4 pl-2 transition-all hover:bg-muted"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-indigo-400">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div className="hidden text-left leading-tight lg:block">
                        <p className="text-xs font-bold text-foreground">
                          {user.name}
                        </p>
                        <p className="text-[10px] font-black text-amber-600 uppercase dark:text-amber-400">
                          {user.role}
                        </p>
                      </div>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  sideOffset={8}
                  className="z-[110] mt-2 w-64 rounded-2xl border-border bg-white p-2 shadow-2xl"
                >
                  <div className="mb-2 flex items-center gap-3 rounded-xl bg-muted/50 p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-white">
                      {user.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold">{user.name}</p>
                      <p className="truncate text-[10px] text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <DropdownMenuSeparator />

                  <Link href={getDashboardPath()}>
                    <DropdownMenuItem className="group cursor-pointer gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-[#4F46E5]! hover:text-white">
                      <LayoutDashboard className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-white" />
                      <span className="font-medium">Dashboard</span>
                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="group text-destructive cursor-pointer gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-[#4F46E5]! hover:text-white"
                  >
                    <LogOut className="h-4 w-4 transition-colors group-hover:text-white" />
                    <span className="font-bold">Logout Session</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu (Requirement: Fully responsive) */}
        {isMobileMenuOpen && (
          <div className="animate-in space-y-4 border-t border-border py-6 slide-in-from-top-5 md:hidden">
            <div className="grid grid-cols-1 gap-2">
              {activeRoutes.map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center rounded-xl px-4 py-3 text-base font-bold transition-all",
                    pathname === route.path
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  {route.name}
                </Link>
              ))}
            </div>

            {!user ? (
              <div className="grid grid-cols-2 gap-3 border-t border-border pt-4">
                <Link
                  href="/auth/login"
                  className="w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button
                    variant="outline"
                    className="w-full rounded-xl font-bold"
                  >
                    Login
                  </Button>
                </Link>
                <Link
                  href="/auth/register"
                  className="w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button className="w-full rounded-xl font-bold">
                    Register
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4 border-t border-border pt-4">
                <div className="flex items-center gap-3 px-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="w-full gap-2 rounded-xl py-6 font-bold"
                >
                  <LogOut className="h-5 w-5" /> Logout Account
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
