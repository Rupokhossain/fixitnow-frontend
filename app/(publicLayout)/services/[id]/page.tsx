/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Star, Clock, MapPin, Loader2, ArrowLeft, Briefcase, 
  Lock, MessageSquare, ShieldCheck, CheckCircle2, Share2, Heart
} from "lucide-react"
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
  const { data: reviewsRes } = useGetAllReviewsQuery({})
  const [createBooking, { isLoading: isBookingLoading }] = useCreateBookingMutation()

  const service = useMemo(() => 
    servicesData?.data?.find((s: any) => s.id === serviceId), 
    [servicesData, serviceId]
  )

  const technicianReviews = useMemo(() => {
    if (!reviewsRes?.data || !service?.technician?.id) return []
    return reviewsRes.data.filter((rev: any) => rev.technicianId === service.technician?.id)
  }, [reviewsRes, service])

  const handleBookNow = async () => {
    if (!user) {
      toast.error("Please login to book this service")
      router.push(`/auth/login?redirectTo=/services/${serviceId}`)
      return
    }
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both date and preferred time slot")
      return
    }

    const formattedDate = selectedDate.toISOString().split('T')[0];
    try {
      await createBooking({ serviceId, date: formattedDate, time: selectedTime }).unwrap();
      toast.success("Booking request sent! Check your dashboard.");
      router.push("/dashboard/customer/bookings");
    } catch (err: any) {
      toast.error(err?.data?.message || "Booking failed.");
    }
  };

  if (isServicesLoading) return <DashboardSkeleton />
  if (!service) return <div className="py-32 text-center font-black uppercase tracking-tighter text-4xl">Service Not Found</div>

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* 1. Header & Navigation */}
      <div className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/services" className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> Back to Services
          </Link>
          <div className="flex gap-4">
             <Button variant="ghost" size="icon" className="rounded-full"><Share2 size={18}/></Button>
             <Button variant="ghost" size="icon" className="rounded-full"><Heart size={18}/></Button>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* LEFT: Details Content */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Service Cover */}
            <div className="group relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-[3rem] shadow-2xl border border-border">
              <Image 
                src={service.image || "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2071"} 
                alt={service.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-10 left-10 space-y-4">
                <Badge className="bg-secondary px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">
                   {service.category?.name || "Premium Service"}
                </Badge>
                <h1 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter uppercase italic">
                   {service.name}
                </h1>
              </div>
            </div>

            {/* Core Features / Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                 { icon: ShieldCheck, label: "Verified Expert", sub: "Fully Vetted", color: "text-primary" },
                 { icon: Clock, label: "2-4 Hours", sub: "Est. Duration", color: "text-secondary" },
                 { icon: Star, label: "4.9 Rating", sub: "Top Quality", color: "text-amber-500" }
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-4 p-6 bg-card border border-border rounded-[2rem] shadow-sm">
                    <div className={cn("p-3 rounded-2xl bg-muted", item.color)}><item.icon size={24} /></div>
                    <div><p className="font-black text-sm uppercase tracking-tight">{item.label}</p><p className="text-[10px] font-bold text-muted-foreground uppercase">{item.sub}</p></div>
                 </div>
               ))}
            </div>

            {/* Description Section */}
            <div className="space-y-6 bg-card border border-border p-10 rounded-[3rem]">
              <h3 className="text-2xl font-black uppercase tracking-tighter italic border-l-4 border-primary pl-6">Service Overview</h3>
              <p className="text-lg leading-relaxed text-muted-foreground font-medium italic">
                {service.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                 {["Eco-friendly materials", "Background checked pro", "Service Guarantee", "Equipment included"].map(point => (
                   <div key={point} className="flex items-center gap-2 text-sm font-bold text-foreground">
                      <CheckCircle2 size={16} className="text-secondary" /> {point}
                   </div>
                 ))}
              </div>
            </div>

            {/* Expert Info Card */}
            <div className="bg-primary/5 border border-primary/10 p-10 rounded-[3rem] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-2xl" />
               <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                  <div className="relative">
                    <Avatar className="h-28 w-28 border-4 border-background shadow-2xl">
                      <AvatarImage src={service.technician?.image} />
                      <AvatarFallback className="bg-primary text-3xl font-black text-white">{service.technician?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 bg-secondary p-1.5 rounded-full border-4 border-background text-white"><ShieldCheck size={20}/></div>
                  </div>
                  <div className="flex-1 text-center md:text-left space-y-4">
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Certified Professional</p>
                       <h3 className="text-3xl font-black tracking-tight">{service.technician?.name}</h3>
                    </div>
                    <p className="text-sm font-medium italic text-muted-foreground leading-relaxed">
                      &quot;{service.technician?.technicianProfile?.bio || "I am dedicated to providing top-notch home services with a focus on reliability and customer satisfaction."}&quot;
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                       {service.technician?.technicianProfile?.skills?.split(',').map((skill: any) => (
                         <Badge key={skill} className="bg-background text-foreground border-border hover:bg-muted font-bold px-3">{skill.trim()}</Badge>
                       ))}
                    </div>
                  </div>
               </div>
            </div>

            {/* Reviews Grid */}
            <div className="space-y-8">
               <h3 className="text-2xl font-black uppercase tracking-tighter">Community <span className="text-primary">Reviews</span> ({technicianReviews.length})</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {technicianReviews.length > 0 ? (
                   technicianReviews.map((rev: any) => (
                     <div key={rev.id} className="bg-card border border-border p-6 rounded-[2rem] shadow-sm space-y-4">
                        <div className="flex justify-between items-start">
                           <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center font-black text-secondary">{rev.customer?.name.charAt(0)}</div>
                              <div><p className="font-bold text-sm">{rev.customer?.name}</p><p className="text-[10px] text-muted-foreground uppercase">{new Date(rev.createdAt).toLocaleDateString()}</p></div>
                           </div>
                           <div className="flex text-amber-500 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100">
                             <Star size={12} fill="currentColor" className="mr-1 mt-0.5" /> <span className="text-xs font-black">{rev.rating}.0</span>
                           </div>
                        </div>
                        <p className="text-sm text-muted-foreground italic font-medium leading-relaxed">&quot;{rev.comment}&quot;</p>
                     </div>
                   ))
                 ) : (
                   <p className="text-muted-foreground italic">No feedback received for this expert yet.</p>
                 )}
               </div>
            </div>
          </div>

          {/* RIGHT: Booking Sidebar */}
          <aside className="lg:col-span-4">
            <Card className="sticky top-24 rounded-3xl border-border bg-card shadow-2xl shadow-primary/5 overflow-hidden transition-all hover:border-primary/20 p-0">
              <CardHeader className="bg-slate-950 p-8 text-white text-center relative">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
                <CardTitle className="text-xl font-black uppercase tracking-widest italic">Reserve Now</CardTitle>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">Available 7 days a week</p>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                
                {/* Custom Calendar */}
                <div className="rounded-4xl border border-border bg-background p-2 shadow-inner">
                  <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} 
                    className="rounded-2xl" disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))} />
                </div>

                {/* Time Selection */}
                <div className="space-y-4">
                  <p className="text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <Clock size={14} className="text-primary" /> Choose Time Slot
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map((time) => (
                      <Button key={time} variant={selectedTime === time ? "default" : "outline"} 
                        className={cn("h-12 rounded-xl font-black text-xs uppercase tracking-tighter transition-all", 
                        selectedTime === time ? 'bg-primary text-white shadow-lg ring-2 ring-primary/20 scale-95' : 'hover:border-primary border-border')} 
                        onClick={() => setSelectedTime(time)}>{time}</Button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-dashed border-border space-y-6">
                   {user && (user.role === 'TECHNICIAN' || user.role === 'ADMIN') ? (
                     <div className="bg-amber-50 dark:bg-amber-950/20 p-8 rounded-[2rem] border-2 border-dashed border-amber-200 text-center animate-pulse">
                        <Lock className="mx-auto text-amber-600 mb-4" size={32} />
                        <h4 className="text-xs font-black uppercase text-amber-900 dark:text-amber-200">Staff Restricted</h4>
                        <p className="text-[10px] text-amber-700 dark:text-amber-400 mt-2 font-bold leading-relaxed uppercase">Booking is strictly for customers only.</p>
                     </div>
                   ) : (
                     <>
                        <div className="flex justify-between items-center  px-2">
                          <p className="text-xs font-black uppercase text-muted-foreground tracking-widest">Total Price</p>
                          <h2 className="text-2xl font-black text-primary  leading-none">${service.price}</h2>
                        </div>
                        
                        {!user ? (
                          <Link href={`/auth/login?redirectTo=/services/${serviceId}`} className="block">
                            <Button className="h-16 w-full rounded-2xl bg-foreground text-background font-black uppercase tracking-widest shadow-xl transition-all active:scale-95">
                              Login to Book
                            </Button>
                          </Link>
                        ) : (
                          <Button 
                            className="h-16 w-full rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-95" 
                            onClick={handleBookNow} 
                            disabled={isBookingLoading}
                          >
                            {isBookingLoading ? <Loader2 className="animate-spin" /> : "Confirm Service"}
                          </Button>
                        )}
                        <p className="text-[10px] text-center font-bold text-muted-foreground uppercase tracking-widest italic">Secure checkout • Satisfaction Guaranteed</p>
                     </>
                   )}
                </div>
              </CardContent>
            </Card>
          </aside>

        </div>
      </div>
    </main>
  )
}