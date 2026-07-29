'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Calendar,
  ClipboardList,
  Users,
  Layers,
  Clock,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function Sidebar() {
  const pathname = usePathname()

  const segments = pathname.split('/')
  const userRoleFromPath = segments[2] as 'customer' | 'technician' | 'admin'

  const role = userRoleFromPath || 'customer'
  const basePath = `/dashboard/${role}`

  const navItems = [
    {
      label: 'Overview',
      href: basePath,
      icon: LayoutDashboard,
    },
    ...(role === 'customer'
      ? [
          {
            label: 'My Bookings',
            href: `${basePath}/bookings`,
            icon: Calendar,
          },
        ]
      : []),
    ...(role === 'technician'
      ? [
          {
            label: 'Service Requests',
            href: `${basePath}/my-services`,
            icon: ClipboardList,
          },
          {
            label: 'Scheduler',
            href: `${basePath}/scheduler`,
            icon: Clock,
          },
        ]
      : []),
    ...(role === 'admin'
      ? [
          {
            label: 'User Management',
            href: `${basePath}/users`,
            icon: Users,
          },
          {
            label: 'Categories',
            href: `${basePath}/categories`,
            icon: Layers,
          },
        ]
      : []),

  ]

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-gray-200 bg-white pt-20 transition-all duration-300 lg:block hidden z-30">
      <nav className="space-y-1 px-4 mt-4">
        {navItems.map((item) => {
          const Icon = item.icon
       
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all group',
                isActive
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              )}
            >
              <Icon className={cn('h-5 w-5', isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-600')} />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}