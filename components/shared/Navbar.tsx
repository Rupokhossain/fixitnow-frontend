"use client"

import { Button } from "@/components/ui/button"
import { Wrench, User, ChevronDown, LogOut, LayoutDashboard } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/app/redux/store"
import { logout } from "@/app/redux/features/authSlice"
import { logoutAction } from "@/app/(authLayout)/auth/_actions/logoutAction"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dispatch = useDispatch()
  

  const user = useSelector((state: RootState) => state.auth.user)

  const handleLogout = async () => {
    dispatch(logout())
    await logoutAction()
  }


  const getDashboardPath = () => {
    if (!user) return "/"
    return `/dashboard/${user.role.toLowerCase()}`
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="rounded-lg bg-primary p-2">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">FixItNow</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center space-x-8 md:flex">
            <Link href="/services" className="font-medium text-muted-foreground transition-colors hover:text-primary">
              Browse Services
            </Link>
          </div>

          {/* Desktop User Logic */}
          <div className="hidden items-center space-x-3 md:flex">
            {!user ? (

              <>
                <Link href="/auth/login">
                  <Button variant="outline" className="text-primary hover:bg-secondary">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="bg-primary text-white hover:bg-primary/90">
                    Register
                  </Button>
                </Link>
              </>
            ) : (

              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-10 px-2 focus-visible:ring-0">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 border border-blue-200">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="text-left hidden lg:block">
                        <p className="text-xs font-bold text-gray-900 leading-none">{user.name}</p>
                        <p className="text-[10px] text-primary uppercase font-bold mt-1">{user.role}</p>
                      </div>
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl">
                  <div className="px-2 py-2">
                    <p className="text-sm font-bold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <Link href={getDashboardPath()}>
                    <DropdownMenuItem className="cursor-pointer gap-2">
                      <LayoutDashboard className="h-4 w-4 text-gray-500" />
                      <span>My Dashboard</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer gap-2 text-red-600 focus:bg-red-50 focus:text-red-700">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-foreground transition-colors hover:text-primary">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {isMobileMenuOpen && (
          <div className="border-t border-border pb-4 md:hidden">
            <Link href="/services" className="block py-3 font-medium text-foreground hover:text-primary">
              Browse Services
            </Link>
            <div className="mt-2 border-t border-border pt-4">
              {!user ? (
                <div className="flex flex-col space-y-2">
                  <Link href="/auth/login"><Button variant="outline" className="w-full">Login</Button></Link>
                  <Link href="/auth/register"><Button className="w-full">Register</Button></Link>
                </div>
              ) : (
                <div className="space-y-4">
                   <div className="flex items-center gap-3 px-2">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center"><User className="text-blue-600"/></div>
                      <div>
                        <p className="font-bold text-sm text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                   </div>
                   <Link href={getDashboardPath()} className="block py-2 text-sm font-medium text-primary">Go to Dashboard</Link>
                   <Button onClick={handleLogout} variant="destructive" className="w-full gap-2"><LogOut size={16}/> Logout</Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}