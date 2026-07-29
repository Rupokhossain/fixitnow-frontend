'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Calendar,
  ClipboardList,
  Users,
  Settings,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  userRole?: 'customer' | 'technician' | 'admin'
}

export function Sidebar({ userRole = 'customer' }: SidebarProps) {
  const pathname = usePathname()

  const navItems = [
    {
      label: 'Overview',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    ...(userRole === 'customer'
      ? [
          {
            label: 'My Bookings',
            href: '/dashboard/bookings',
            icon: Calendar,
          },
        ]
      : []),
    ...(userRole === 'technician'
      ? [
          {
            label: 'Service Requests',
            href: '/dashboard/requests',
            icon: ClipboardList,
          },
        ]
      : []),
    ...(userRole === 'admin'
      ? [
          {
            label: 'User Management',
            href: '/dashboard/users',
            icon: Users,
          },
        ]
      : []),
    {
      label: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
    },
  ]

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-gray-200 bg-white pt-20 transition-all duration-300 lg:block hidden">
      <nav className="space-y-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
