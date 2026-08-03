/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { useSelector } from "react-redux"
import { toast } from "sonner"

import { RootState } from "@/app/redux/store"
import { useCreateBookingMutation } from "@/app/redux/api/bookingApi"
import { useGetSingleTechnicianQuery } from "@/app/redux/api/technicianApi"

import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import {
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  Clock,
  Loader2,
  Lock,
  MapPin,
  Star,
} from "lucide-react"

import { cn } from "@/lib/utils"
import DashboardSkeleton from "@/app/(dashboardLayout)/_components/dashboard-skeleton"

interface ITechnicianProfile {
  bio?: string
  skills?: string
  experience?: string
  location?: string
  pricing?: number
}

interface IService {
  id: string
  name: string
  description: string
  price: number
}

interface ITechnician {
  id: string
  name: string
  email: string
  technicianProfile?: ITechnicianProfile | null
  services?: IService[]
}

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
]

export default function TechnicianPublicProfile() {
  const params = useParams()
  const router = useRouter()
  const techId = params.id as string

  const user = useSelector((state: RootState) => state.auth.user)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null)

  const { data: techRes, isLoading, isError } = useGetSingleTechnicianQuery(techId)
  const [createBooking, { isLoading: isBookingLoading }] = useCreateBookingMutation()

  const technician = techRes?.data as ITechnician | undefined

  const handleBookNow = async () => {
    if (!user) {
      toast.error("Please login to book a service")
      router.push(`/auth/login?redirectTo=/technicians/${techId}`)
      return
    }

    if (!selectedDate || !selectedTime || !selectedServiceId) {
      toast.error("Please select a service, date, and time")
      return
    }

    const formattedDate = selectedDate.toISOString().split('T')[0]

    try {
      await createBooking({
        serviceId: selectedServiceId,
        date: formattedDate,
        time: selectedTime,
      }).unwrap()
      
      toast.success("Booking requested successfully!")
      router.push("/dashboard/customer/bookings")
    } catch (err: any) {
      toast.error(err?.data?.message || "Booking failed. Please try again.")
    }
  }

  if (isLoading) <DashboardSkeleton></DashboardSkeleton>

  if (isError || !technician) return (
    <div className="py-20 text-center">
      <h2 className="text-2xl font-bold text-gray-900">Technician not found!</h2>
      <Link href="/services" className="mt-4 block text-blue-600 underline">Go back to services</Link>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      {/* Navigation */}
      <div className="sticky top-16 z-30 border-b bg-white shadow-sm">
        <div className="mx-auto flex h-14 max-w-7xl items-center px-4">
          <Link href="/services" className="flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors hover:text-primary">
            <ArrowLeft size={16} /> Back to Services
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          <div className="space-y-6 lg:col-span-2">
            {/* Technician Profile Card */}
            <Card className="overflow-hidden rounded-3xl border-0 bg-white shadow-sm">
              <CardContent className="p-10">
                <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
                  <Avatar className="h-32 w-32 shadow-2xl ring-4 ring-primary/10">
                    <AvatarFallback className="bg-primary text-4xl font-black text-white">
                      {technician.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                      <h1 className="text-4xl font-black text-gray-900">{technician.name}</h1>
                      <Badge className="bg-green-100 text-green-700 border-0 font-bold px-3 py-1">
                        <CheckCircle2 size={14} className="mr-1" /> Verified Pro
                      </Badge>
                    </div>
                    <p className="mt-2 flex items-center justify-center gap-2 font-medium text-gray-500 md:justify-start">
                       <MapPin size={18} className="text-primary" /> {technician.technicianProfile?.location || "Dhaka, Bangladesh"}
                    </p>
                    <p className="mt-6 text-gray-600 text-lg leading-relaxed italic max-w-2xl">
                      &quot;{technician.technicianProfile?.bio || "Expert professional dedicated to providing high-quality service solutions."}&quot;
                    </p>
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-3 gap-4 border-t pt-8">
                   <div className="text-center">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Experience</p>
                      <p className="text-xl font-black text-gray-900">{technician.technicianProfile?.experience || "5+"} Yrs</p>
                   </div>
                   <div className="border-x text-center">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Rating</p>
                      <p className="text-xl font-black text-amber-500 flex items-center justify-center gap-1">5.0 <Star size={18} fill="currentColor"/></p>
                   </div>
                   <div className="text-center">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Success Rate</p>
                      <p className="text-xl font-black text-gray-900">98%</p>
                   </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Selection */}
            <Card className="overflow-hidden rounded-3xl border-0 bg-white shadow-sm">
              <CardHeader className="bg-gray-50/50 border-b px-8 py-5">
                <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Briefcase size={20} className="text-primary" /> Select a Service
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {technician.services && technician.services.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {technician.services.map((svc: IService) => (
                      <div 
                        key={svc.id} 
                        onClick={() => setSelectedServiceId(svc.id)}
                        className={cn(
                          "p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 relative",
                          selectedServiceId === svc.id ? "border-primary bg-primary/5 ring-1 ring-primary shadow-md" : "border-gray-100 hover:border-blue-100 hover:bg-gray-50"
                        )}
                      >
                        <h4 className={cn("font-bold", selectedServiceId === svc.id ? "text-primary" : "text-gray-900")}>{svc.name}</h4>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{svc.description}</p>
                        <p className="mt-3 text-primary font-black text-xl">${svc.price}</p>
                        {selectedServiceId === svc.id && <CheckCircle2 className="absolute top-4 right-4 text-primary" size={20} />}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-400 py-10 italic">No services listed yet.</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-32 overflow-hidden rounded-3xl border-0 shadow-2xl">
              <CardHeader className="bg-gray-900 p-6 text-white text-center">
                <CardTitle className="text-xl font-bold">Reserve Appointment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 bg-white p-6">
                <div className="flex justify-center border rounded-2xl p-2 bg-gray-50 shadow-inner">
                  <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} 
                    className="rounded-md" disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))} />
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-black text-gray-700 flex items-center gap-2"><Clock size={18} className="text-primary" /> Available Time</p>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((time) => (
                      <Button key={time} variant={selectedTime === time ? "default" : "outline"} 
                        className={cn("h-11 rounded-xl font-bold transition-all", selectedTime === time ? 'bg-primary shadow-lg ring-2 ring-primary ring-offset-1' : 'hover:border-primary')} 
                        onClick={() => setSelectedTime(time)}>{time}</Button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                   {user && (user.role === 'TECHNICIAN' || user.role === 'ADMIN') ? (
                     <div className="bg-amber-50 p-6 rounded-2xl border-2 border-dashed border-amber-200 text-center animate-in slide-in-from-bottom-2 duration-300">
                        <Lock className="mx-auto text-amber-600 mb-2" size={24} />
                        <p className="text-[11px] text-amber-700 font-bold leading-relaxed uppercase tracking-tight">Access Restricted</p>
                        <p className="text-[10px] text-amber-600 mt-1">Bookings are only for customers.</p>
                     </div>
                   ) : (
                     <Button 
                       className="w-full h-14 text-lg font-black shadow-xl bg-primary hover:bg-primary/90 rounded-2xl transition-all active:scale-95" 
                       onClick={handleBookNow} 
                       disabled={isBookingLoading}
                     >
                       {isBookingLoading ? <Loader2 className="animate-spin mr-2" /> : "Confirm Booking"}
                     </Button>
                   )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}