/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useGetAllUsersQuery } from "@/app/redux/api/userApi"
import { BookingsTable } from "../../_components/bookings-table"
import OverviewCards from "../../_components/overview-card"
import { useGetAllBookingsQuery } from "@/app/redux/api/bookingApi"
import { 
  TrendingUp, 
  Activity, 

  ArrowUpRight, 

} from "lucide-react"
import { IBooking, ICalculatedStats, IUser } from "@/lib/types"
import DashboardSkeleton from "../../_components/dashboard-skeleton"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StatsChart } from "../../_components/StatsChart"

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
    return <DashboardSkeleton />
  }

  return (
    <div className="space-y-10 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. Admin Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
             <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">System Live Status</p>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground uppercase italic leading-none">
            Admin <span className="text-primary NOT-italic text-shadow-sm">Command Center</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
           <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 rounded-xl font-bold uppercase tracking-widest text-[10px]">
              V 2.0.4 - Enterprise
           </Badge>
        </div>
      </div>

      {/* 2. Overview Statistics (Requirement 7) */}
      <section className="animate-in fade-in slide-in-from-top-4 duration-500">
        <OverviewCards stats={calculatedStats} />
      </section>

      {/* 3. Analytics Section (Requirement 7.2 - Charts) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Revenue/Booking Chart */}
         <div className="lg:col-span-2">
            <StatsChart />
         </div>

         {/* Platform Alerts / Summary Card */}
         <Card className="rounded-[2.5rem] bg-indigo-600 p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between border-none">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
            
            <div className="relative z-10">
               <div className="flex items-center justify-between mb-8">
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30">
                     <Activity className="h-6 w-6" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-secondary" />
               </div>
               <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-2">Platform Health</h3>
               <p className="text-indigo-100 font-medium text-sm leading-relaxed mb-6">
                 No critical issues detected. All technician nodes are synchronized and payments are processing normally.
               </p>
            </div>

            <div className="relative z-10 pt-6 border-t border-white/20">
               <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                  <span>Server Latency</span>
                  <span className="text-secondary">24ms</span>
               </div>
            </div>
         </Card>
      </div>

      {/* 4. Recent Activity Table (Requirement 7.3) */}
      <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="flex items-center justify-between px-2">
           <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-card border border-border shadow-sm">
                 <TrendingUp size={18} className="text-primary" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tighter italic">Global <span className="text-primary NOT-italic">Activity Logs</span></h2>
           </div>
        </div>
        <BookingsTable userRole="admin" initialData={bookings} />
      </section>
      
    </div>
  )
}

export default AdminPage