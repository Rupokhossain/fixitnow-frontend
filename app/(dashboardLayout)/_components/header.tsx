"use client"

import { LogOut, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
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

  return (
    <header className="fixed top-0 right-0 left-64 z-40 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-8 md:left-0 lg:left-64">
      {/* Right Section: Notifications & Profile */}
      <div className="ml-auto flex items-center gap-4">
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
