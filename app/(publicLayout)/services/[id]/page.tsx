/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, Clock, MapPin, Loader2, ArrowLeft, Briefcase, Lock } from 'lucide-react'
import { toast } from "sonner"
import Link from 'next/link'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/redux/store'

import { useCreateBookingMutation } from "@/app/redux/api/bookingApi"
import { useGetServicesQuery } from '@/app/redux/api/baseApi'

// --- TypeScript Interfaces ---
interface ICategory {
  id: string;
  name: string;
}

interface ITechnicianProfile {
  bio?: string;
  skills?: string;
  experience?: string;
  location?: string;
  pricing?: number;
}

interface ITechnician {
  id: string;
  name: string;
  email: string;
  technicianProfile?: ITechnicianProfile | null;
}

interface IService {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category?: ICategory;
  technician?: ITechnician;
}

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
]

export default function ServiceDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const serviceId = params.id as string

  // ১. রেডক্স থেকে ইউজার ডাটা নেওয়া
  const user = useSelector((state: RootState) => state.auth.user)

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  // ২. এপিআই হুকস
  const { data: servicesData, isLoading: isServicesLoading } = useGetServicesQuery({})
  const [createBooking, { isLoading: isBookingLoading }] = useCreateBookingMutation()

  // নির্দিষ্ট সার্ভিস খুঁজে বের করা
  const service = servicesData?.data?.find((s: IService) => s.id === serviceId) as IService | undefined

  // ৩. বুকিং সাবমিট লজিক
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

    const bookingData = {
      serviceId: serviceId,
      slotDate: selectedDate.toISOString(),
      slotTime: selectedTime,
    }

    try {
      await createBooking(bookingData).unwrap()
      toast.success("Booking request sent successfully!")
      router.push("/dashboard/customer/bookings")
    } catch (err: any) {
      toast.error(err?.data?.message || "Booking failed. Please try again.")
    }
  }

  if (isServicesLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-primary" /></div>

  if (!service) return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold text-gray-900">Service not found!</h2>
      <Link href="/services" className="text-blue-600 underline mt-4 block">Go back to services</Link>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      {/* Top Header */}
      <div className="bg-white border-b sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center">
          <Link href="/services" className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-primary transition-colors">
            <ArrowLeft size={16} /> Back to Listings
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden border-0 shadow-sm bg-white rounded-2xl">
              <div className="h-80 bg-gray-200 relative">
                <Image 
                  src={service.image || "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2071"} 
                  alt={service.name} 
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-6 left-6 bg-primary text-white px-4 py-1.5 text-xs font-black uppercase">
                  {service.category?.name || "Premium Service"}
                </Badge>
              </div>
              <CardContent className="p-8">
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div className="flex-1">
                    <h1 className="text-4xl font-black text-gray-900 leading-tight">{service.name}</h1>
                    <div className="flex items-center gap-6 mt-4 text-gray-500">
                      <div className="flex items-center gap-1 text-amber-500 font-black">
                        <Star size={20} fill="currentColor" /> 5.0 (Vetted)
                      </div>
                      <div className="flex items-center gap-2 font-medium">
                        <MapPin size={20} className="text-primary" /> {service.technician?.technicianProfile?.location || "Dhaka, BD"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Service Description</h3>
                  <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">{service.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Provider Section */}
            <Card className="border-0 shadow-sm rounded-2xl overflow-hidden bg-white">
              <CardHeader className="border-b bg-gray-50/50 py-4 px-8">
                <CardTitle className="text-base font-bold text-gray-700">Expert Information</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                  <Avatar className="h-28 w-28 ring-4 ring-white shadow-xl">
                    <AvatarFallback className="bg-primary text-white text-3xl font-black">
                      {service.technician?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-2xl font-black text-gray-900">{service.technician?.name}</h3>
                    <p className="text-primary font-bold mt-1 flex items-center justify-center sm:justify-start gap-2">
                      <Briefcase size={16} /> 
                      {service.technician?.technicianProfile?.experience || "Experienced"} Professional
                    </p>
                    <p className="mt-4 text-gray-600 leading-relaxed italic text-base">
                      &quot;{service.technician?.technicianProfile?.bio || "Committed to delivering high-quality home service solutions with a focus on reliability and customer satisfaction."}&quot;
                    </p>
                    
                    <div className="mt-6 flex flex-wrap gap-2 justify-center sm:justify-start">
                      {service.technician?.technicianProfile?.skills?.split(',').map((skill: string) => (
                        <Badge key={skill} variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100 px-4 py-1 font-bold">
                          {skill.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar - The Dynamic Logic */}
          <div className="lg:col-span-1">
            <Card className="sticky top-32 shadow-2xl border-0 overflow-hidden rounded-3xl">
              <CardHeader className="bg-gray-900 text-white p-6">
                <CardTitle className="text-xl font-bold">Secure Your Slot</CardTitle>
                <CardDescription className="text-gray-400">Choose date & time</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6 bg-white">
                
                <div className="border rounded-2xl p-2 bg-gray-50 flex justify-center shadow-inner">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md"
                    disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                  />
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-black text-gray-700 flex items-center gap-2">
                    <Clock size={18} className="text-primary" /> Select Time
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className={`h-11 font-bold transition-all rounded-xl ${selectedTime === time ? 'bg-primary shadow-lg ring-2 ring-primary ring-offset-1' : 'hover:border-primary hover:text-primary'}`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                   {/* --- ROLE BASED RENDERING --- */}
                   {user && (user.role === 'TECHNICIAN' || user.role === 'ADMIN') ? (
                     /* ১. টেকনিশিয়ান বা অ্যাডমিন হলে রেস্ট্রিকশন দেখাবে */
                     <div className="bg-amber-50 p-6 rounded-2xl border-2 border-dashed border-amber-200 text-center animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <div className="flex justify-center mb-3">
                           <Lock className="text-amber-600 h-8 w-8" />
                        </div>
                        <p className="text-sm text-amber-900 font-black uppercase tracking-tight">
                          Restricted Access
                        </p>
                        <p className="text-[11px] text-amber-700 mt-2 font-bold leading-relaxed">
                          You are logged in as {user.role}. <br/> Only Customer accounts can reserve services.
                        </p>
                     </div>
                   ) : (
                     /* ২. গেস্ট বা কাস্টমার হলে প্রাইস এবং বাটন দেখাবে */
                     <>
                        <div className="flex justify-between items-center mb-6 px-1">
                          <span className="text-gray-500 font-bold">Total Service Fee:</span>
                          <span className="text-3xl font-black text-gray-900">${service.price}</span>
                        </div>

                        {!user ? (
                          /* যদি লগইন না থাকে - লগইন বাটন */
                          <Link href={`/auth/login?redirectTo=/services/${serviceId}`} className="w-full">
                            <Button className="w-full h-14 text-lg font-black shadow-xl bg-gray-900 hover:bg-black rounded-2xl transition-all">
                              Login to Book
                            </Button>
                          </Link>
                        ) : (
                          /* যদি কাস্টমার হয় - বুকিং বাটন */
                          <Button 
                            className="w-full h-14 text-lg font-black shadow-xl bg-primary hover:bg-primary/90 rounded-2xl transition-all active:scale-95" 
                            onClick={handleBookNow}
                            disabled={isBookingLoading}
                          >
                            {isBookingLoading ? <Loader2 className="animate-spin mr-2" /> : "Confirm Reservation"}
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