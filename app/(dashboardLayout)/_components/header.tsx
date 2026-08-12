"use client"

import { 
  LogOut, 
  ChevronDown, 
  Menu,
  ShieldCheck,
  ArrowLeft,
  User
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/app/redux/store"
import { logout } from "@/app/redux/features/authSlice"
import { logoutAction } from "@/app/(authLayout)/auth/_actions/logoutAction"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet" // Shadcn UI Sheet
import { Sidebar } from "./sidebar"

export function Header() {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)

  const handleLogout = async () => {
    dispatch(logout())
    await logoutAction()
  }

  return (
    <header className="fixed top-0 right-0 left-0 z-40 flex h-20 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md transition-all md:px-8 lg:left-72">
      
      {/* 1. Left Side: Mobile Menu & Return Home */}
      <div className="flex items-center gap-4">
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-xl hover:bg-muted">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72 border-none">
                <Sidebar isMobile={true} />
            </SheetContent>
          </Sheet>
        </div>

        {/* Back to Site Button */}
        <Link href="/">
           <Button variant="outline" size="sm" className="flex items-center gap-2 rounded-xl border-primary/20 hover:bg-primary/5 font-black text-[10px] uppercase tracking-widest transition-all">
              <ArrowLeft className="h-3 w-3 text-primary" />
              <span className="hidden sm:inline">Return to Site</span>
              <span className="sm:hidden text-primary">Home</span>
           </Button>
        </Link>
      </div>

      {/* 2. Right Side: Profile Dropdown */}
      <div className="flex items-center gap-3">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-12 rounded-2xl px-2 hover:bg-muted focus-visible:ring-0 focus-visible:ring-offset-0 transition-all"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border border-primary/20 shadow-sm">
                  <AvatarFallback className="bg-primary/10 text-primary font-black uppercase text-xs">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                
                <div className="hidden text-left lg:block leading-tight">
                  <p className="text-sm font-black text-foreground">
                    {user?.name || "User"}
                  </p>
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-secondary" />
                    <p className="text-[10px] font-bold text-secondary uppercase tracking-tighter">
                      {user?.role}
                    </p>
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-64 mt-2 p-2 rounded-2xl shadow-2xl border-border bg-card">
            <DropdownMenuLabel className="font-normal px-3 py-4">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-black leading-none">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer py-2.5 rounded-xl">
               <Link href="/profile" className="flex items-center gap-3 font-bold text-sm">
                 <User className="h-4 w-4 text-muted-foreground" /> My Profile
               </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer py-2.5 rounded-xl gap-3 text-red-500 font-bold focus:bg-red-50 focus:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout Account</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}