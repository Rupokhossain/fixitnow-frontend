"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { BookingsTable } from "./bookings-table"
import { Header } from "./header"
import { useSelector } from "react-redux"
import { RootState } from "@/app/redux/store"

type UserRole = "customer" | "technician" | "admin"

interface DashboardProps {
  userRole?: UserRole
}

export default function Dashboard({ userRole = "customer" }: DashboardProps) {
  const user = useSelector((state: RootState) => state.auth.user)

  const [currentRole, setCurrentRole] = useState<UserRole>(userRole)

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />

      <main className="pt-24 pr-8 pb-8 pl-64 md:pl-0 lg:pl-64">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="mb-6 flex gap-2">
            {(["customer", "technician", "admin"] as const).map((role) => (
              <button
                key={role}
                onClick={() => setCurrentRole(role)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  currentRole === role
                    ? "bg-blue-600 text-white"
                    : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)} View
              </button>
            ))}
          </div>

          <section>
            <h1 className="mb-6 text-2xl font-bold text-gray-900">
              {user?.role === "CUSTOMER" && `Welcome back, ${user?.name}`}
              {user?.role === "TECHNICIAN" && "Technician Service Portal"}
              {user?.role === "ADMIN" && "Platform Administration"}

              {!user && "Loading your dashboard..."}
            </h1>

            {/* <OverviewCards /> */}
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
