"use client"
export const dynamic = "force-dynamic"

import { useGetTechBookingsQuery } from "@/app/redux/api/technicianApi"
import { BookingsTable } from "../../../_components/bookings-table"
import DashboardSkeleton from "@/app/(dashboardLayout)/_components/dashboard-skeleton"

export default function TechnicianBookingsPage() {
  const { data, isLoading } = useGetTechBookingsQuery()
  const bookings = data?.data || []

  if (isLoading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage My Bookings</h1>
      <BookingsTable userRole="technician" initialData={bookings} />
    </div>
  )
}
