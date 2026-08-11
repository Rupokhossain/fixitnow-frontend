/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
  useGetTechProfileQuery,
  useGetTechAvailabilityQuery,
  useGetTechBookingsQuery,
} from "@/app/redux/api/technicianApi"
import OverviewCards from "../../_components/overview-card"
import {
  User as UserIcon,
  CalendarCheck,
  MapPin,
  Briefcase,
  Info,
  TrendingUp,
  Award,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useSelector } from "react-redux"
import { RootState } from "@/app/redux/store"
import DashboardSkeleton from "../../_components/dashboard-skeleton"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StatsChart } from "../../_components/StatsChart"

export default function TechnicianOverview() {
  const user = useSelector((state: RootState) => state.auth.user)

  const { data: profileRes, isLoading: profileLoading } =
    useGetTechProfileQuery()
  const { data: availabilityRes, isLoading: availabilityLoading } =
    useGetTechAvailabilityQuery()
  const { data: bookingsRes, isLoading: bookingsLoading } =
    useGetTechBookingsQuery()

  if (profileLoading || availabilityLoading || bookingsLoading) {
    return <DashboardSkeleton />
  }

  const techProfile = profileRes?.data
  const availability = availabilityRes?.data
  const bookings = bookingsRes?.data ?? []

  const stats = {
    totalUsers: bookings.filter((b: any) =>
      ["ACCEPTED", "IN_PROGRESS"].includes(b.status)
    ).length,
    totalBookings: bookings.length,
    totalRevenue: bookings.reduce(
      (sum: number, booking: any) =>
        sum + (booking.service?.price ?? booking.price ?? 0),
      0
    ),
    activeTechnicians: 1,
  }

  return (
    <div className="animate-in space-y-10 pb-10 duration-700 fade-in slide-in-from-bottom-4">
      {/* 1. Header Section */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-foreground uppercase italic md:text-4xl">
            Expert <span className="NOT-italic text-primary">Console</span>
          </h1>
          <p className="mt-1 font-medium text-muted-foreground">
            Welcome back,{" "}
            <span className="font-bold text-primary">{user?.name}</span>. Here
            is your business overview.
          </p>
        </div>
        <div className="flex gap-3">
          <Badge className="rounded-xl border-secondary/20 bg-secondary/10 px-4 py-2 text-[10px] font-bold tracking-widest text-secondary uppercase hover:bg-secondary/20">
            <TrendingUp className="mr-2 h-3 w-3" /> Top Rated Pro
          </Badge>
        </div>
      </div>

      {/* 2. Overview Cards (Stats) */}
      <OverviewCards stats={stats} />

      {/* 3. Analytics & Profile Grid (Requirement 7.2 - Charts) */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Chart Area - Occupies 2 columns */}
        <div className="lg:col-span-2">
          <StatsChart />
        </div>

        {/* Professional Identity Card */}
        <Card className="bg-card/50 flex flex-col rounded-[2.5rem] border-border shadow-xl shadow-primary/5 backdrop-blur-sm">
          <CardHeader className="border-b border-border/50 pb-6">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                <Award size={24} />
              </div>
              <CardTitle className="text-xl font-black tracking-tight uppercase italic">
                Identity
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-between p-8">
            {techProfile ? (
              <div className="space-y-8">
                <div>
                  <p className="mb-3 text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase">
                    Expert Bio
                  </p>
                  <p className="line-clamp-4 text-sm leading-relaxed font-medium text-foreground/80 italic">
                    {techProfile.bio ||
                      "Crafting excellence in home maintenance..."}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 rounded-2xl border border-border bg-muted/50 p-4">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase">
                        Experience
                      </p>
                      <p className="text-sm font-bold">
                        {techProfile.experience || "5+ Years"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-2xl border border-border bg-muted/50 p-4">
                    <MapPin className="h-5 w-5 text-secondary" />
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase">
                        Base Location
                      </p>
                      <p className="text-sm font-bold">
                        {techProfile.location || "Dhaka, BD"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-dashed border-border pt-4">
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-black text-primary">
                      ${techProfile.pricing}
                      <span className="text-xs text-muted-foreground">/hr</span>
                    </p>
                    <Link href="/dashboard/technician/my-services">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="gap-2 font-bold text-primary"
                      >
                        Edit Profile <ArrowUpRight size={14} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="mb-4 rounded-full bg-amber-100 p-4">
                  <Info className="text-amber-600" />
                </div>
                <p className="font-bold">Profile Incomplete</p>
                <Button className="mt-4 rounded-xl bg-primary">
                  Setup Profile
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 4. Availability & Quick Actions */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card className="relative overflow-hidden rounded-[2.5rem] border-border bg-gradient-to-br from-primary to-indigo-700 text-white shadow-2xl shadow-primary/20">
          <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
          <CardContent className="relative z-10 flex items-center gap-8 p-10">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/30 bg-white/20 backdrop-blur-md">
              <CalendarCheck size={40} className="text-white" />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black tracking-[0.2em] text-indigo-100 uppercase">
                Live Status
              </p>
              <h2 className="text-3xl font-black tracking-tighter uppercase italic">
                {availability?.availability || "Available Now"}
              </h2>
              <div className="flex items-center gap-2 pt-2">
                <span className="h-2 w-2 animate-ping rounded-full bg-green-400" />
                <p className="text-xs font-bold text-indigo-200">
                  System is syncronized
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card group flex cursor-pointer items-center justify-between rounded-[2.5rem] border-border p-10 transition-all hover:border-primary/30">
          <div className="space-y-2">
            <h3 className="text-2xl font-black tracking-tighter uppercase italic">
              Manage <span className="text-primary">Orders</span>
            </h3>
            <p className="text-sm font-medium text-muted-foreground">
              You have {bookings.length} total booking requests to review.
            </p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted transition-all group-hover:bg-primary group-hover:text-white">
            <Link href="/dashboard/technician/bookings">
              <ArrowRight />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
