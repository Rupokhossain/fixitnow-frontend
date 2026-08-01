/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
  useGetTechProfileQuery,
  useGetTechAvailabilityQuery,
  useGetTechBookingsQuery,
} from "@/app/redux/api/technicianApi"
import OverviewCards from "../../_components/overview-card"
import {
  Loader2,
  User as UserIcon,
  CalendarCheck,
  MapPin,
  Briefcase,
  Info,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useSelector } from "react-redux"
import { RootState } from "@/app/redux/store"

export default function TechnicianOverview() {
  const user = useSelector((state: RootState) => state.auth.user)

  const { data: profileRes, isLoading: profileLoading } =
    useGetTechProfileQuery()

  const { data: availabilityRes, isLoading: availabilityLoading } =
    useGetTechAvailabilityQuery()

  const { data: bookingsRes, isLoading: bookingsLoading } =
    useGetTechBookingsQuery()

  if (profileLoading || availabilityLoading || bookingsLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

  const techProfile = profileRes?.data
  const availability = availabilityRes?.data
  const bookings = bookingsRes?.data ?? []

  const stats = {
    totalUsers: bookings.filter((b) =>
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
    <div className="animate-in space-y-8 duration-700 fade-in">
      <div>
        <h1 className="text-3xl font-black tracking-tight">
          Technician Dashboard
        </h1>

        <p className="mt-1 text-gray-500 italic">
          Welcome back,
          <span className="ml-1 font-bold text-primary not-italic">
            {user?.name}
          </span>
        </p>
      </div>

      <OverviewCards stats={stats} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Profile */}

        <Card className="rounded-3xl border-0 shadow-md">
          <CardHeader className="flex flex-row items-center gap-3 border-b bg-gray-50/50">
            <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
              <UserIcon size={20} />
            </div>

            <CardTitle>Professional Identity</CardTitle>
          </CardHeader>

          <CardContent className="p-8">
            {techProfile ? (
              <div className="space-y-6">
                <div>
                  <p className="mb-2 text-[10px] font-black tracking-widest text-gray-400 uppercase">
                    About Me
                  </p>

                  <p className="text-sm leading-relaxed text-gray-700">
                    {techProfile.bio || "No bio available"}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Badge className="rounded-xl bg-gray-100 px-3 py-2 text-gray-700">
                    <Briefcase className="mr-2 h-4 w-4 text-primary" />
                    {techProfile.experience}
                  </Badge>

                  <Badge className="rounded-xl bg-gray-100 px-3 py-2 text-gray-700">
                    <MapPin className="mr-2 h-4 w-4 text-primary" />
                    {techProfile.location || "N/A"}
                  </Badge>

                  <Badge className="rounded-xl bg-blue-600 px-3 py-2 text-white">
                    ${techProfile.pricing}/hr
                  </Badge>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-orange-300 bg-orange-50 py-8 text-center">
                <Info className="mx-auto mb-3 text-orange-500" />

                <p className="font-bold text-orange-700">Profile Incomplete</p>

                <p className="text-xs text-orange-600">
                  Please update your technician profile.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Availability */}

        <Card className="rounded-3xl border-0 shadow-md">
          <CardHeader className="flex flex-row items-center gap-3 border-b bg-gray-50/50">
            <div className="rounded-lg bg-green-100 p-2 text-green-600">
              <CalendarCheck size={20} />
            </div>

            <CardTitle>Availability</CardTitle>
          </CardHeader>

          <CardContent className="flex min-h-[160px] items-center">
            <div className="flex items-center gap-5">
              <div className="h-5 w-5 animate-pulse rounded-full bg-green-500" />

              <div>
                <h2 className="text-xl font-bold">
                  {availability?.availability ?? "Offline"}
                </h2>

                <p className="text-xs tracking-widest text-gray-400 uppercase">
                  Current Schedule
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
