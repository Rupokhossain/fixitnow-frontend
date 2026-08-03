"use client"

import { useGetAllUsersQuery } from "@/app/redux/api/userApi"
import { BookingsTable } from "../../_components/bookings-table"
import OverviewCards from "../../_components/overview-card"
import { useGetAllBookingsQuery } from "@/app/redux/api/bookingApi"
import { Loader2 } from "lucide-react"
import { IBooking, ICalculatedStats, IUser } from "@/lib/types"


const AdminPage = () => {

  const { data: userData, isLoading: userLoading } = useGetAllUsersQuery({})
  const { data: bookingData, isLoading: bookingLoading } = useGetAllBookingsQuery({})

  const users: IUser[] = userData?.data || []
  const bookings: IBooking[] = bookingData?.data || []

  const calculatedStats: ICalculatedStats = {
    totalUsers: users.length,
    totalBookings: bookings.length,

    totalRevenue: bookings.reduce(
      (sum: number, b: IBooking) => sum + (Number(b.price) || 0),
      0
    ),

    activeTechnicians: users.filter((u: IUser) => u.role === "TECHNICIAN").length,
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
        <h1 className="sm:text-3xl text-2xl leading-tight font-extrabold text-gray-900 tracking-tight">
          Admin Dashboard
        </h1>
        <p className="mt-1 text-gray-500 font-medium">
          Platform-wide statistics and management
        </p>
      </div>

      <section className="animate-in fade-in slide-in-from-top-4 duration-500">
        <OverviewCards stats={calculatedStats} />
      </section>

      <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h2 className="text-xl font-bold text-gray-800 ml-1">Recent Platform Activity</h2>
        <BookingsTable userRole="admin" initialData={bookings} />
      </section>
    </div>
  )
}

export default AdminPage