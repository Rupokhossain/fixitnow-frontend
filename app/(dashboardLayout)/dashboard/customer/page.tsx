/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { BookingsTable } from "../../_components/bookings-table"
import OverviewCards from "../../_components/overview-card"

import { useSelector } from "react-redux"
import { RootState } from "@/app/redux/store"
import { useGetBookingsQuery } from "@/app/redux/api/bookingApi"
import DashboardSkeleton from "../../_components/dashboard-skeleton"
import { StatsChart } from "../../_components/StatsChart"

const CustomerPage = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const { data: bookingRes, isLoading } = useGetBookingsQuery({})
  const bookings = bookingRes?.data || []

  const customerStats = {
    totalUsers: 1, // Current User
    totalBookings: bookings.length,
    totalRevenue: bookings.reduce((sum: number, b: { price: any }) => sum + (Number(b.price) || 0), 0),
    activeTechnicians: bookings.filter((b: { status: string }) => b.status === "IN_PROGRESS").length,
  }

  if (isLoading) return <DashboardSkeleton />

  return (
    <div className="space-y-10 pb-10 lg:ml-10">
      
      {/* Header with Welcome Message */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-black tracking-tight text-foreground uppercase italic">
             Welcome, <span className="text-primary NOT-italic">{user?.name}</span>
           </h1>
           <p className="text-muted-foreground font-medium">Heres whats happening with your home services today.</p>
        </div>
        <div className="bg-secondary/10 text-secondary px-4 py-2 rounded-xl border border-secondary/20 text-xs font-black uppercase tracking-widest">
           Status: Customer Account
        </div>
      </div>

      {/* 1. Overview Statistics Cards */}
      <OverviewCards stats={customerStats} />

      {/* 2. Visual Analytics (Charts) - Requirement 7.2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2">
            <StatsChart />
         </div>
         <div className="bg-primary rounded-[2.5rem] p-10 text-white flex flex-col justify-center relative overflow-hidden shadow-2xl shadow-primary/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
            <h4 className="text-2xl font-black mb-4 leading-tight">Need help with something else?</h4>
            <p className="text-indigo-100 mb-8 font-medium">Browse 50+ new expert services added this week.</p>
            <button className="bg-white text-primary font-black py-4 rounded-2xl uppercase tracking-widest text-xs hover:bg-slate-100 transition-all">Explore Marketplace</button>
         </div>
      </div>

      {/* 3. Data Table - Requirement 7.3 */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
           <h2 className="text-xl font-black uppercase tracking-tighter">Recent Activities</h2>
        </div>
        <BookingsTable userRole="customer" initialData={bookings} />
      </section>
      
    </div>
  )
}

export default CustomerPage