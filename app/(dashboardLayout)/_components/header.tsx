"use client"

import { useState } from "react"
import { Search, Bell, LogOut, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/app/redux/store"
import { logout } from "@/app/redux/features/authSlice"
import { logoutAction } from "@/app/(authLayout)/auth/_actions/logoutAction"

export function Header() {
  const dispatch = useDispatch()

  const handleLogout = async () => {
    dispatch(logout())

    await logoutAction()
  }

  const user = useSelector((state: RootState) => state.auth.user)

  const [hasNotifications, setHasNotifications] = useState(true)

  return (
    <header className="fixed top-0 right-0 left-64 z-40 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-8 md:left-0 lg:left-64">
      {/* Search Bar */}
      {/* <div className="max-w-md flex-1">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search bookings, services..."
            className="border-gray-200 bg-gray-50 pl-10 text-sm focus:bg-white focus:ring-blue-500"
          />
        </div>
      </div> */}

      {/* Right Section: Notifications & Profile */}
      <div className="ml-auto flex items-center gap-4">
        {/* Notifications Bell */}
        {/* <button
          className={cn(
            "relative rounded-lg p-2 transition-colors",
            hasNotifications
              ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
              : "text-gray-600 hover:bg-gray-100"
          )}
        >
          <Bell className="h-5 w-5" />
          {hasNotifications && (
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          )}
        </button> */}

        {/* Profile Dropdown */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-10 px-3 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <div className="hidden text-left sm:block">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name || "User"}
                  </p>
                  <p className="mt-1 text-[10px] font-medium text-blue-600 uppercase">
                    {user?.role || "Guest"}
                  </p>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium text-gray-900">
                {user?.name || "Guest User"}
              </p>
              <p className="text-xs text-gray-500">
                {user?.email || "guest@example.com"}
              </p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer gap-2 text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
