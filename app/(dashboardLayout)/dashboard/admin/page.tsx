/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useGetAllUsersQuery } from "@/app/redux/api/userApi"
import { BookingsTable } from "../../_components/bookings-table"
import OverviewCards from "../../_components/overview-card"
import { useGetAllBookingsQuery } from "@/app/redux/api/bookingApi"
import { Loader2 } from "lucide-react"

const AdminPage = () => {
  const { data: userData, isLoading: userLoading } = useGetAllUsersQuery({})
  const { data: bookingData, isLoading: bookingLoading } =
    useGetAllBookingsQuery({})

  const users = userData?.data || []
  const bookings = bookingData?.data || []

  const calculatedStats = {
    totalUsers: users.length,
    totalBookings: bookings.length,

    totalRevenue: bookings.reduce(
      (sum: number, b: any) => sum + (Number(b.price) || 0),
      0
    ),

    activeTechnicians: users.filter((u: any) => u.role === "TECHNICIAN").length,
  }

  if (userLoading || bookingLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-8 p-4 md:p-0">
      <div>
        <h1 className="text-3xl leading-tight font-bold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="mt-1 text-gray-500">
          Platform-wide statistics and management
        </p>
      </div>

      <section>
        <OverviewCards stats={calculatedStats} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Recent Bookings</h2>
        <BookingsTable userRole="admin" />
      </section>
    </div>
  )
}

export default AdminPage
