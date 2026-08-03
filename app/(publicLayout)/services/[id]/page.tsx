/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Clock, MapPin, Loader2, ArrowLeft, Briefcase, Lock, MessageSquare } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import Image from "next/image"
import { useSelector } from "react-redux"
import { RootState } from "@/app/redux/store"

import { useCreateBookingMutation } from "@/app/redux/api/bookingApi"
import { useGetServicesQuery } from "@/app/redux/api/baseApi"
import { useGetAllReviewsQuery } from "@/app/redux/api/technicianApi"
import { cn } from "@/lib/utils"
import DashboardSkeleton from "@/app/(dashboardLayout)/_components/dashboard-skeleton"

interface ICategory {
  id: string
  name: string
}

interface ITechnicianProfile {
  bio?: string
  skills?: string
  experience?: string
  location?: string
  pricing?: number
}

interface IReview {
  id: string
  rating: number
  comment: string
  technicianId: string
  createdAt: string
  customer: {
    name: string
  }
}

interface ITechnician {
  id: string
  name: string
  email: string
  technicianProfile?: ITechnicianProfile | null
}

interface IService {
  id: string
  name: string
  description: string
  price: number
  image?: string
  category?: ICategory
  technician?: ITechnician
}

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
]

export default function ServiceDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const serviceId = params.id as string

  const user = useSelector((state: RootState) => state.auth.user)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const { data: servicesData, isLoading: isServicesLoading } = useGetServicesQuery({})
  const { data: reviewsRes, isLoading: isReviewsLoading } = useGetAllReviewsQuery({})
  const [createBooking, { isLoading: isBookingLoading }] = useCreateBookingMutation()

  const service = useMemo(() => 
    servicesData?.data?.find((s: IService) => s.id === serviceId), 
    [servicesData, serviceId]
  ) as IService | undefined

  const technicianReviews = useMemo(() => {
    if (!reviewsRes?.data || !service?.technician?.id) return []
    return reviewsRes.data.filter((rev: IReview) => rev.technicianId === service.technician?.id)
  }, [reviewsRes, service])

  const handleBookNow = async () => {
    if (!user) {
      toast.error("Please login to book a service")
      router.push(`/auth/login?redirectTo=/services/${serviceId}`)
      return
    }

    if (!selectedDate || !selectedTime) {
      toast.error("Please select both date and time")
      return
    }

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const bookingData = {
      serviceId: serviceId,
      date: formattedDate,  
      time: selectedTime,  
    };

    try {
      await createBooking(bookingData).unwrap();
      toast.success("Booking requested successfully!");
      router.push("/dashboard/customer/bookings");
    } catch (err: any) {
      toast.error(err?.data?.message || "Booking failed. Please try again.");
    }
  };

  if (isServicesLoading)
    return <DashboardSkeleton/>

  if (!service)
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Service not found!</h2>
        <Link href="/services" className="mt-4 block text-blue-600 underline">Go back to services</Link>
      </div>
    )

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      <div className="sticky top-16 z-30 border-b bg-white shadow-sm">
        <div className="mx-auto flex h-14 max-w-7xl items-center px-4">
          <Link href="/services" className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-primary">
            <ArrowLeft size={16} /> Back to Listings
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          <div className="space-y-6 lg:col-span-2">
            {/* Service Main Card */}
            <Card className="overflow-hidden rounded-2xl border-0 bg-white shadow-sm">
              <div className="relative h-80 bg-gray-200">
                <Image 
                  src={service.image || "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2071"} 
                  alt={service.name} fill className="object-cover"
                />
                <Badge className="absolute top-6 left-6 bg-primary px-4 py-1.5 text-xs font-black text-white uppercase border-0 shadow-lg">
                  {service.category?.name || "Service"}
                </Badge>
              </div>
              <CardContent className="p-8">
                <h1 className="text-4xl leading-tight font-black text-gray-900">{service.name}</h1>
                <div className="mt-4 flex items-center gap-6 text-gray-500">
                  <div className="flex items-center gap-1 font-black text-amber-500">
                    <Star size={20} fill="currentColor" /> 5.0 (Vetted)
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <MapPin size={20} className="text-primary" /> {service.technician?.technicianProfile?.location || "Dhaka, BD"}
                  </div>
                </div>
                <div className="mt-8 border-t border-gray-100 pt-8">
                  <h3 className="mb-4 text-xl font-bold text-gray-900">Service Description</h3>
                  <p className="text-lg leading-relaxed text-gray-600 whitespace-pre-line">{service.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Expert Information */}
            <Card className="overflow-hidden rounded-2xl border-0 bg-white shadow-sm">
              <CardHeader className="border-b bg-gray-50/50 py-4 px-8">
                <CardTitle className="text-base font-bold text-gray-700">Expert Information</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
                  <Avatar className="h-28 w-28 shadow-xl ring-4 ring-white">
                    <AvatarFallback className="bg-primary text-3xl font-black text-white">{service.technician?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-2xl font-black text-gray-900">{service.technician?.name}</h3>
                    <p className="mt-1 flex items-center justify-center gap-2 font-bold text-primary sm:justify-start">
                      <Briefcase size={16} /> {service.technician?.technicianProfile?.experience || "Professional"} Expertise
                    </p>
                    <p className="mt-4 text-base leading-relaxed text-gray-600 italic">
                      &quot;{service.technician?.technicianProfile?.bio || "Dedicated professional providing high-quality service."}&quot;
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-2 sm:justify-start">
                      {service.technician?.technicianProfile?.skills?.split(',').map((skill: string) => (
                        <Badge key={skill} variant="outline" className="border-blue-100 bg-blue-50 px-4 py-1 font-bold text-blue-700">
                          {skill.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* --- REVIEWS SECTION --- */}
            <Card className="overflow-hidden rounded-2xl border-0 bg-white shadow-sm">
              <CardHeader className="border-b bg-gray-50/50 py-4 px-8">
                <CardTitle className="text-base font-bold text-gray-700 flex items-center gap-2">
                   <MessageSquare size={18} className="text-amber-500" /> Customer Reviews ({technicianReviews.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {technicianReviews.length > 0 ? (
                  <div className="space-y-6">
                    {technicianReviews.map((rev: any) => (
                      <div key={rev.id} className="border-b last:border-0 pb-6 last:pb-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex text-amber-500">
                            {[...Array(rev.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                          </div>
                          <span className="text-sm font-bold text-gray-900">{rev.customer?.name}</span>
                        </div>
                        <p className="text-gray-600 text-sm italic">&quot;{rev.comment}&quot;</p>
                        <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase">{new Date(rev.createdAt).toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-400 py-6 italic font-medium">No reviews for this professional yet.</p>
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
                  <p className="text-sm font-black text-gray-700 flex items-center gap-2"><Clock size={18} className="text-primary" /> Select Time</p>
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
                     <div className="bg-amber-50 p-6 rounded-2xl border-2 border-dashed border-amber-200 text-center animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <Lock className="mx-auto text-amber-600 mb-3" size={32} />
                        <p className="text-sm text-amber-900 font-black uppercase tracking-tight">Restricted Access</p>
                        <p className="text-[11px] text-amber-700 mt-2 font-bold leading-relaxed">You are logged in as {user.role}. Booking is for customers only.</p>
                     </div>
                   ) : (
                     <>
                        <div className="flex justify-between items-center mb-6 px-1">
                          <span className="text-gray-500 font-bold">Total Service Fee:</span>
                          <span className="text-3xl font-black text-gray-900">${service.price}</span>
                        </div>
                        {!user ? (
                          <Link href={`/auth/login?redirectTo=/services/${serviceId}`} className="w-full">
                            <Button className="h-14 w-full rounded-2xl bg-gray-900 text-lg font-black shadow-xl">Login to Book</Button>
                          </Link>
                        ) : (
                          <Button className="h-14 w-full rounded-2xl bg-primary text-lg font-black shadow-xl" onClick={handleBookNow} disabled={isBookingLoading}>
                            {isBookingLoading ? <Loader2 className="animate-spin" /> : "Confirm Reservation"}
                          </Button>
                        )}
                     </>
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