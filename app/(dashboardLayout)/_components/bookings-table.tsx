/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  Check, X, Play, CheckCircle, CreditCard, Loader2, 
  Star, MessageSquare, Search, Filter, ChevronLeft, ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useUpdateTechBookingMutation } from "@/app/redux/api/technicianApi"
import { useCreateReviewMutation } from "@/app/redux/api/reviewApi"
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
  
  // ১. Filtering States (Requirement 7.3)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")

  const [updateBooking] = useUpdateTechBookingMutation()
  const [createReview, { isLoading: isReviewing }] = useCreateReviewMutation()

  // ২. Filter Logic
  const filteredBookings = useMemo(() => {
    return initialData.filter((booking) => {
      const matchesSearch = booking.service?.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "ALL" || booking.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [initialData, searchTerm, statusFilter])

  // --- Review Form Logic ---
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 5, comment: "" },
  })
  const currentRating = watch("rating")

  const handleStatusChange = async (id: string, status: string) => {
    setLoadingId(id)
    try {
      await updateBooking({ id, status }).unwrap()
      toast.success(`Booking ${status.toLowerCase()} successfully`)
    } catch (err: any) {
      toast.error(err?.data?.message || "Action failed")
    } finally {
      setLoadingId(null)
    }
  }

  const onReviewSubmit = async (data: ReviewFormValues) => {
    try {
      await createReview({ bookingId: selectedBookingId, rating: data.rating, comment: data.comment }).unwrap()
      toast.success("Review submitted! Thank you.")
      reset(); setSelectedBookingId(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to submit review")
    }
  }

  return (
    <div className="space-y-6">
      
      {/* 3. Search & Filter Bar (Requirement 7.3) */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card p-4 rounded-2xl border border-border shadow-sm">
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search by service name..." 
            className="pl-10 h-11 rounded-xl border-border bg-background focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="h-4 w-4 text-primary hidden md:block" />
          <select 
            className="h-11 w-full md:w-44 rounded-xl border border-border bg-background px-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="REQUESTED">Requested</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>

      {/* 4. The Table */}
      <Card className="overflow-hidden rounded-[2rem] border-border bg-card shadow-xl shadow-primary/5">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="border-b border-border hover:bg-transparent">
                  <TableHead className="px-6 py-5 font-black uppercase tracking-widest text-[10px] text-muted-foreground">Service Detail</TableHead>
                  <TableHead className="font-black uppercase tracking-widest text-[10px] text-muted-foreground">Schedule</TableHead>
                  <TableHead className="font-black uppercase tracking-widest text-[10px] text-muted-foreground">{userRole === "technician" ? "Customer" : "Expert"}</TableHead>
                  <TableHead className="text-right font-black uppercase tracking-widest text-[10px] text-muted-foreground">Amount</TableHead>
                  <TableHead className="text-center font-black uppercase tracking-widest text-[10px] text-muted-foreground">Status</TableHead>
                  <TableHead className="pr-6 text-right font-black uppercase tracking-widest text-[10px] text-muted-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <TableRow key={booking.id} className="border-b border-border/50 transition-colors last:border-0 hover:bg-primary/5">
                      <TableCell className="px-6 py-5 font-bold text-foreground italic">{booking.service?.name}</TableCell>
                      <TableCell>
                        <div className="text-xs space-y-1">
                          <p className="font-black text-foreground">{new Date(booking.scheduledAt).toLocaleDateString()}</p>
                          <p className="text-muted-foreground uppercase font-bold">{new Date(booking.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        {userRole === "technician" ? booking.customer?.name : booking.technician?.name || <span className="text-orange-500 font-bold italic">Waiting...</span>}
                      </TableCell>
                      <TableCell className="text-right font-black text-primary text-lg">${booking.price ?? booking.service?.price ?? 0}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={cn("rounded-lg border px-3 py-1 font-black text-[10px] uppercase tracking-tighter", statusColors[booking.status])}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="pr-6">
                        <div className="flex justify-end gap-2">
                          {/* Technician Actions */}
                          {userRole === "technician" && booking.status === "REQUESTED" && (
                            <div className="flex gap-2">
                              <Button size="sm" className="h-9 w-9 rounded-xl bg-primary hover:bg-primary/90 p-0" onClick={() => handleStatusChange(booking.id!, "ACCEPTED")} disabled={loadingId === booking.id}>
                                {loadingId === booking.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check size={16} />}
                              </Button>
                              <Button size="sm" variant="outline" className="h-9 w-9 rounded-xl border-red-200 text-red-500 hover:bg-red-50 p-0" onClick={() => handleStatusChange(booking.id!, "DECLINED")} disabled={loadingId === booking.id}>
                                <X size={16} />
                              </Button>
                            </div>
                          )}
                          
                          {/* Customer Actions */}
                          {userRole === "customer" && booking.status === "ACCEPTED" && (
                            <Button size="sm" className="h-9 rounded-xl bg-secondary text-white font-bold gap-2 px-4 shadow-lg shadow-secondary/20" onClick={() => router.push(`/dashboard/customer/bookings/${booking.id}/pay`)}>
                              <CreditCard size={14} /> Pay
                            </Button>
                          )}

                          {userRole === "customer" && booking.status === "COMPLETED" && (
                            <Dialog open={selectedBookingId === booking.id} onOpenChange={(open) => !open && setSelectedBookingId(null)}>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" className="h-9 rounded-xl border-primary text-primary font-bold gap-2" onClick={() => setSelectedBookingId(booking.id!)}>
                                  <MessageSquare size={14} /> Review
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="rounded-[2.5rem]">
                                {/* Review logic remains same but with better UI */}
                                <DialogHeader><DialogTitle className="text-center text-2xl font-black italic uppercase">Rate <span className="text-primary NOT-italic">Service</span></DialogTitle></DialogHeader>
                                <form onSubmit={handleSubmit(onReviewSubmit)} className="space-y-6 py-4">
                                  <div className="flex justify-center gap-3">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star key={star} size={36} className={cn("cursor-pointer transition-all", star <= currentRating ? "fill-secondary text-secondary" : "text-muted/30")} onClick={() => setValue("rating", star)} />
                                    ))}
                                  </div>
                                  <Textarea {...register("comment")} placeholder="How was your experience?" className="rounded-2xl min-h-[120px]" />
                                  <Button type="submit" disabled={isReviewing} className="w-full h-14 rounded-2xl bg-primary font-black uppercase tracking-widest">
                                    {isReviewing ? <Loader2 className="animate-spin" /> : "Submit Review"}
                                  </Button>
                                </form>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={6} className="py-24 text-center font-bold text-muted-foreground italic">No matching activities found.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 5. Pagination (Requirement 7.3) */}
      <div className="flex items-center justify-between px-2">
         <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Page 1 of 1</p>
         <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-xl h-10 w-10 p-0" disabled><ChevronLeft size={16} /></Button>
            <Button variant="outline" size="sm" className="rounded-xl h-10 w-10 p-0" disabled><ChevronRight size={16} /></Button>
         </div>
      </div>
    </div>
  )
}