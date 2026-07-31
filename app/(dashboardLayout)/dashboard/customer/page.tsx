"use client"
import { BookingsTable } from '../../_components/bookings-table'
import OverviewCards from '../../_components/overview-card'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/redux/store'
import { useGetBookingsQuery } from '@/app/redux/api/bookingApi'
import { Loader2 } from 'lucide-react'
import { IBooking } from '@/lib/types'

const CustomerPage = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const { data: bookingRes, isLoading } = useGetBookingsQuery({})

  const bookings: IBooking[] = bookingRes?.data || []

  const customerStats = {
    totalUsers: 0,
    totalBookings: bookings.length,
    totalRevenue: bookings.reduce((sum: number, b: IBooking) => sum + (Number(b.price) || 0), 0),
    activeTechnicians: bookings.filter((b: IBooking) => b.status === 'IN_PROGRESS').length
  }

  if (isLoading) return <div className="flex h-[70vh] items-center justify-center"><Loader2 className="animate-spin text-primary h-10 w-10" /></div>

  return (
     <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 leading-tight">Welcome back, {user?.name}</h1>
      <OverviewCards stats={customerStats} />
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">Your Recent Bookings</h2>
        <BookingsTable userRole="customer" initialData={bookings} />
      </section>
    </div>
  )
}

export default CustomerPage