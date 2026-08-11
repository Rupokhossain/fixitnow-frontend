/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { 
  LogOut, 
  User, 
  ChevronDown, 
  Home, 
  Bell, 
  Moon, 
  Sun, 
  Menu,
  Settings,
  ShieldCheck,
  ArrowLeft
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/app/redux/store"
import { logout } from "@/app/redux/features/authSlice"
import { logoutAction } from "@/app/(authLayout)/auth/_actions/logoutAction"
import Link from "next/link"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function Header() {
  const dispatch = useDispatch()
  // const { theme, setTheme } = useTheme()
  // const [mounted, setMounted] = useState(false)

  // useEffect(() => setMounted(true), [])

  const handleLogout = async () => {
    dispatch(logout())
    await logoutAction()
  }

  const user = useSelector((state: RootState) => state.auth.user)

  return (
    <header className="fixed top-0 right-0 left-0 z-40 flex h-20 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md transition-all md:px-8 lg:left-72">
      
      {/* 1. Left Side: Mobile Menu & Back to Home */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden hover:bg-muted rounded-xl">
           <Menu className="h-5 w-5" />
        </Button>

        {/* Back to Home Button (Requirement) */}
        <Link href="/">
           <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2 rounded-xl border-primary/20 hover:bg-primary/5 font-bold text-xs uppercase tracking-widest transition-all">
              <ArrowLeft className="h-4 w-4 text-primary" />
              Return to Site
           </Button>
           {/* Mobile view only icon */}
           <Button variant="ghost" size="icon" className="sm:hidden text-primary">
              <Home className="h-5 w-5" />
           </Button>
        </Link>
      </div>

      {/* 2. Right Side: Notification, Theme & Profile */}
      <div className="flex items-center gap-2 md:gap-5">
        
        {/* Vertical Divider */}
        <div className="h-8 w-px bg-border mx-1 hidden md:block" />

        {/* Advanced Profile Dropdown (Requirement 7) */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-12 rounded-2xl px-2 hover:bg-muted focus-visible:ring-0 focus-visible:ring-offset-0 transition-all"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border border-primary/20 shadow-sm">
                  {/* <AvatarImage src={user?.image} /> */}
                  <AvatarFallback className="bg-primary/10 text-primary font-black uppercase">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                
                <div className="hidden text-left lg:block">
                  <p className="text-sm font-black text-foreground leading-none">
                    {user?.name || "Premium User"}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <ShieldCheck className="h-3 w-3 text-secondary" />
                    <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">
                      {user?.role || "Guest"}
                    </p>
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground hidden lg:block" />
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-64 mt-2 p-2 rounded-2xl shadow-2xl border-border animate-in fade-in zoom-in-95 duration-200 bg-white">
            <DropdownMenuLabel className="font-normal px-3 py-4">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-black leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
          
            
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer py-2.5 rounded-xl gap-3 text-red-500 font-bold  focus:text-red-600 hover:text-red-400"
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