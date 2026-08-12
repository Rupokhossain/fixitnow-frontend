/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  Check, X, CreditCard, Loader2, Star, MessageSquare, Search, 
  Filter, ChevronLeft, ChevronRight, CalendarDays, User2, 
  DollarSign, Activity, Play, CheckCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useUpdateTechBookingMutation } from "@/app/redux/api/technicianApi"
import { useCreateReviewMutation } from "@/app/redux/api/reviewApi"
import { useGetBookingsQuery, useGetAllBookingsQuery } from "@/app/redux/api/bookingApi"
import { reviewSchema, ReviewFormValues } from "@/app/schemas/review.schema"
import { toast } from "sonner"
import { IBooking } from "@/lib/types"
import { useRouter } from "next/navigation"

interface BookingsTableProps {
  userRole?: "customer" | "technician" | "admin"
  initialData?: IBooking[]
}

const statusColors: Record<string, string> = {
  REQUESTED: "bg-amber-100 text-amber-700 border-amber-200",
  ACCEPTED: "bg-blue-100 text-blue-700 border-blue-200",
  PAID: "bg-emerald-100 text-emerald-700 border-emerald-200",
  IN_PROGRESS: "bg-indigo-100 text-indigo-700 border-indigo-200",
  COMPLETED: "bg-slate-100 text-slate-700 border-slate-200",
  DECLINED: "bg-red-100 text-red-700 border-red-200",
}

export function BookingsTable({ userRole = "customer", initialData = [] }: BookingsTableProps) {
  const router = useRouter()
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")

  // --- Data Fetching Logic (If no initialData) ---
  const { data: adminRes, isLoading: adminLoading } = useGetAllBookingsQuery(undefined, { skip: initialData.length > 0 || userRole !== "admin" })
  const { data: bookingRes, isLoading: bookingLoading } = useGetBookingsQuery(undefined, { skip: initialData.length > 0 || userRole === "admin" })
  
  const [updateBooking] = useUpdateTechBookingMutation()
  const [createReview, { isLoading: isReviewing }] = useCreateReviewMutation()

  const allBookings = useMemo(() => {
    if (initialData.length > 0) return initialData;
    return (userRole === "admin" ? adminRes?.data : bookingRes?.data) || [];
  }, [initialData, adminRes, bookingRes, userRole]);

  const filteredBookings = useMemo(() => {
    return allBookings.filter((booking: any) => {
      const matchesSearch = booking.service?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "ALL" || booking.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [allBookings, searchTerm, statusFilter])

  const isLoading = !initialData.length && (adminLoading || bookingLoading)

  // --- Review Logic ---
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 5, comment: "" },
  })
  const currentRating = watch("rating")

  const handleStatusChange = async (id: string, status: string) => {
    setLoadingId(id)
    try {
      await updateBooking({ id, status }).unwrap()
      toast.success(`Booking is now ${status.toLowerCase()}`)
    } catch (err: any) {
      toast.error(err?.data?.message || "Operation failed")
    } finally {
      setLoadingId(null)
    }
  }

  const onReviewSubmit = async (data: ReviewFormValues) => {
    try {
      await createReview({ bookingId: selectedBookingId, rating: data.rating, comment: data.comment }).unwrap()
      toast.success("Feedback submitted! Thank you.")
      reset(); setSelectedBookingId(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Submission failed")
    }
  }

  if (isLoading) return <div className="flex justify-center py-24"><Loader2 className="animate-spin text-primary h-10 w-10" /></div>

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* 3. Action Bar (Requirement 5 & 7.3) */}
      <div className="bg-card/50 flex flex-col items-center justify-between gap-4 rounded-3xl border border-border p-4 shadow-xl shadow-primary/5 backdrop-blur-md md:flex-row">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search by service name..." 
            className="pl-11 h-12 rounded-2xl border-border bg-background/50 focus:ring-primary font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="p-2 rounded-xl bg-primary/10 text-primary hidden md:block"><Filter size={18}/></div>
          <select 
            className="h-12 w-full md:w-48 rounded-2xl border border-border bg-background/50 px-4 text-sm font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="REQUESTED">Requested</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="PAID">Paid</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>

      {/* 4. Data Table (Requirement 7.3) */}
      <Card className="overflow-hidden rounded-[2.5rem] border-border bg-card shadow-2xl shadow-primary/5">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="border-b border-border/50 hover:bg-transparent uppercase tracking-widest text-[10px] font-black">
                  <TableHead className="px-8 py-6">Service Detail</TableHead>
                  <TableHead className="text-center">Timing</TableHead>
                  <TableHead>{userRole === "technician" ? "Client" : "Expert"}</TableHead>
                  <TableHead className="text-right">Bill</TableHead>
                  <TableHead className="text-center">Flow</TableHead>
                  <TableHead className="pr-8 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking: any) => (
                    <TableRow key={booking.id} className="border-b border-border/40 transition-all last:border-0 hover:bg-primary/2 group">
                      <TableCell className="px-8 py-6 font-extrabold italic text-foreground uppercase tracking-tight">
                         <div className="flex items-center gap-3">
                            <Activity size={16} className="text-primary opacity-50" />
                            {booking.service?.name}
                         </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="inline-flex flex-col items-center p-2 rounded-2xl bg-muted/50 border border-border min-w-25">
                          <p className="text-[10px] font-black text-foreground">{new Date(booking.scheduledAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</p>
                          <p className="text-[9px] text-primary font-bold uppercase tracking-widest">{new Date(booking.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                         <div className="flex items-center gap-2 font-bold text-sm text-muted-foreground">
                            <User2 size={14} className="text-secondary" />
                            {userRole === "technician" ? booking.customer?.name : booking.technician?.name || <span className="text-orange-500 italic">Assigning...</span>}
                         </div>
                      </TableCell>
                      <TableCell className="text-right">
                         <div className="inline-flex items-center font-black text-primary text-lg">
                            <DollarSign size={14} />{booking.price ?? booking.service?.price ?? 0}
                         </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={cn("rounded-xl border-0 px-4 py-1.5 font-black text-[9px] uppercase tracking-widest shadow-sm", statusColors[booking.status])}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="pr-8">
                        <div className="flex justify-end gap-2">
                          
                          {/* --- TECHNICIAN ACTIONS --- */}
                          {userRole === "technician" && (
                            <>
                              {booking.status === "REQUESTED" && (
                                <div className="flex gap-2">
                                  <Button size="sm" className="h-9 w-9 rounded-xl bg-primary hover:bg-primary/90 p-0 shadow-lg" onClick={() => handleStatusChange(booking.id!, "ACCEPTED")} disabled={loadingId === booking.id}>
                                    {loadingId === booking.id ? <Loader2 size={16} className="animate-spin" /> : <Check size={18} />}
                                  </Button>
                                  <Button size="sm" variant="ghost" className="h-9 w-9 rounded-xl text-red-500 hover:bg-red-50" onClick={() => handleStatusChange(booking.id!, "DECLINED")} disabled={loadingId === booking.id}>
                                    <X size={18} />
                                  </Button>
                                </div>
                              )}
                              {booking.status === "PAID" && (
                                <Button size="sm" className="h-9 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase text-[10px] gap-2 shadow-lg animate-pulse" onClick={() => handleStatusChange(booking.id!, "IN_PROGRESS")} disabled={loadingId === booking.id}>
                                   {loadingId === booking.id ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />} Start Job
                                </Button>
                              )}
                              {booking.status === "IN_PROGRESS" && (
                                <Button size="sm" className="h-9 px-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-black uppercase text-[10px] gap-2 shadow-lg" onClick={() => handleStatusChange(booking.id!, "COMPLETED")} disabled={loadingId === booking.id}>
                                   {loadingId === booking.id ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />} Mark Complete
                                </Button>
                              )}
                            </>
                          )}
                          
                          {/* --- CUSTOMER ACTIONS --- */}
                          {userRole === "customer" && (
                            <>
                              {booking.status === "ACCEPTED" && (
                                <Button size="sm" className="h-10 rounded-2xl bg-secondary text-white font-black uppercase text-[10px] tracking-widest px-5 shadow-lg transition-all hover:scale-105" onClick={() => router.push(`/dashboard/customer/bookings/${booking.id}/pay`)}>
                                  <CreditCard size={14} className="mr-2" /> Pay Now
                                </Button>
                              )}
                              {booking.status === "COMPLETED" && (
                                <Dialog open={selectedBookingId === booking.id} onOpenChange={(open) => !open && setSelectedBookingId(null)}>
                                  <DialogTrigger asChild>
                                    <Button size="sm" variant="outline" className="h-10 rounded-2xl border-primary text-primary font-black uppercase text-[10px] tracking-widest px-5 hover:bg-primary hover:text-white" onClick={() => setSelectedBookingId(booking.id!)}>
                                      <MessageSquare size={14} className="mr-2" /> Feedback
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="rounded-[3rem] p-10 border-none bg-card/95 backdrop-blur-2xl">
                                    <DialogHeader><DialogTitle className="text-center text-3xl font-black italic uppercase tracking-tighter">Rate the <span className="text-primary NOT-italic">Service</span></DialogTitle></DialogHeader>
                                    <form onSubmit={handleSubmit(onReviewSubmit)} className="space-y-8 py-6">
                                      <div className="flex justify-center gap-4">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                          <Star key={star} size={44} className={cn("cursor-pointer transition-all hover:scale-110", star <= currentRating ? "fill-secondary text-secondary" : "text-muted/20")} onClick={() => setValue("rating", star)} />
                                        ))}
                                      </div>
                                      <Textarea {...register("comment")} placeholder="Share your experience..." className="rounded-[2rem] min-h-[150px] bg-muted/30" />
                                      <Button type="submit" disabled={isReviewing} className="w-full h-16 rounded-[1.5rem] bg-primary font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-primary/20">
                                        {isReviewing ? <Loader2 className="animate-spin mr-2" /> : "Submit Review"}
                                      </Button>
                                    </form>
                                  </DialogContent>
                                </Dialog>
                              )}
                            </>
                          )}

                          {/* Actionless Status Label */}
                          {((userRole === "technician" && ["COMPLETED", "DECLINED", "ACCEPTED"].includes(booking.status)) ||
                            (userRole === "customer" && ["REQUESTED", "PAID", "IN_PROGRESS", "DECLINED"].includes(booking.status)) ||
                            (userRole === "admin")) && (
                            <span className="text-[9px] font-bold text-muted-foreground uppercase italic px-2">
                               {booking.status === "ACCEPTED" && userRole === "technician" ? "Waiting for pay" : "No Action Required"}
                            </span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={6} className="py-32 text-center flex flex-col items-center gap-4 opacity-30">
                    <CalendarDays size={64} strokeWidth={1} /><p className="text-xl font-black uppercase italic tracking-tighter">No Logs Found</p>
                  </TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 5. Pagination Footer (Requirement 7.3) */}
      <div className="flex items-center justify-between px-4 pb-10">
         <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
            Showing {filteredBookings.length} Active Records
         </div>
         <div className="flex gap-3">
            <Button variant="outline" size="sm" className="h-11 w-11 rounded-2xl border-border hover:bg-muted" disabled><ChevronLeft size={18} /></Button>
            <Button variant="outline" size="sm" className="h-11 w-11 rounded-2xl bg-primary text-white border-none font-black shadow-lg shadow-primary/20">1</Button>
            <Button variant="outline" size="sm" className="h-11 w-11 rounded-2xl border-border hover:bg-muted" disabled><ChevronRight size={18} /></Button>
         </div>
      </div>
    </div>
  )
}