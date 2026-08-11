"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Calendar,
  ClipboardList,
  Users,
  Layers,
  Clock,
  Briefcase,
  LogOut,
  Settings,
  ShieldCheck
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useDispatch } from "react-redux"
import { logout } from "@/app/redux/features/authSlice"
import { logoutAction } from "@/app/(authLayout)/auth/_actions/logoutAction"

export function Sidebar() {
  const pathname = usePathname()
  const dispatch = useDispatch()

  const segments = pathname.split("/")
  const role = (segments[2] as "customer" | "technician" | "admin") || "customer"
  const basePath = `/dashboard/${role}`

  const handleLogout = async () => {
    dispatch(logout())
    await logoutAction()
  }

  const navItems = [
    { label: "Overview", href: basePath, icon: LayoutDashboard },
    ...(role === "customer" ? [{ label: "My Bookings", href: `${basePath}/bookings`, icon: Calendar }] : []),
    ...(role === "technician" ? [
      { label: "Service Profile", href: `${basePath}/my-services`, icon: ClipboardList },
      { label: "My Bookings", href: `${basePath}/bookings`, icon: Briefcase },
      { label: "Scheduler", href: `${basePath}/scheduler`, icon: Clock }
    ] : []),
    ...(role === "admin" ? [
      { label: "User Management", href: `${basePath}/users`, icon: Users },
      { label: "Categories", href: `${basePath}/categories`, icon: Layers },
      { label: "Settings", href: `${basePath}/settings`, icon: Settings }
    ] : []),
  ]

  return (
    <aside className="fixed top-0 left-0 z-50 hidden h-screen w-72 border-r border-border bg-card/50 backdrop-blur-xl transition-all lg:block">
      <div className="flex h-full flex-col px-6 py-10">
        
        {/* Dashboard Logo */}
        <div className="mb-10 flex items-center gap-3 px-2">
           <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
              <ShieldCheck className="h-6 w-6 text-white" />
           </div>
           <span className="text-xl font-black tracking-tighter text-foreground italic">DASH<span className="text-primary NOT-italic">BOARD</span></span>
        </div>

        <nav className="flex-1 space-y-2">
          <p className="px-2 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-4">Main Menu</p>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-bold transition-all",
                  isActive
                    ? "bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]"
                    : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                )}
              >
                <Icon className={cn("h-5 w-5", isActive ? "text-white" : "group-hover:text-primary")} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Logout at Bottom */}
        <div className="pt-6 border-t border-border">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="h-5 w-5" /> Logout Session
          </button>
        </div>
      </div>
    </aside>
  )
}