'use client'

import { useState } from 'react'
import { Sidebar } from './sidebar'
import { BookingsTable } from './bookings-table'
import OverviewCards from './overview-card'

type UserRole = 'customer' | 'technician' | 'admin'

interface DashboardProps {
  userRole?: UserRole
}

export default function Dashboard({ userRole = 'customer' }: DashboardProps) {
  const [currentRole, setCurrentRole] = useState<UserRole>(userRole)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Header */}
      {/* <Header userName="James Miller" /> */}

      {/* Main Content */}
      <main className="pt-24 pl-64 pr-8 pb-8 lg:pl-64 md:pl-0 ">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Role Selector for Demo */}
          <div className="flex gap-2 mb-6">
            {(['customer', 'technician', 'admin'] as const).map((role) => (
              <button
                key={role}
                onClick={() => setCurrentRole(role)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  currentRole === role
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)} View
              </button>
            ))}
          </div>

          {/* Overview Section */}
          <section>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              {currentRole === 'customer' && 'Welcome back, James'}
              {currentRole === 'technician' && 'Service Dashboard'}
              {currentRole === 'admin' && 'Admin Dashboard'}
            </h1>
            <OverviewCards />
          </section>

          {/* Bookings/Requests Table */}
          <section>
            <BookingsTable userRole={currentRole} />
          </section>
        </div>
      </main>
    </div>
  )
}
