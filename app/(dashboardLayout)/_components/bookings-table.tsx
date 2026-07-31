/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, CreditCard, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useGetBookingsQuery, useGetAllBookingsQuery } from "@/app/redux/api/bookingApi"
import { useUpdateTechBookingMutation } from "@/app/redux/api/technicianApi"
import { toast } from "sonner"
import { IBooking } from "@/lib/types" 
import { useRouter } from "next/navigation"

interface BookingsTableProps {
  userRole?: "customer" | "technician" | "admin"
  initialData?: IBooking[]
}

const statusColors: Record<string, string> = {
  REQUESTED: "bg-yellow-100 text-yellow-800",
  ACCEPTED: "bg-blue-100 text-blue-800",
  PAID: "bg-green-100 text-green-800",
  IN_PROGRESS: "bg-indigo-100 text-indigo-800",
  COMPLETED: "bg-gray-100 text-gray-800",
  DECLINED: "bg-red-100 text-red-800",
}

export function BookingsTable({ userRole = "customer", initialData }: BookingsTableProps) {
  const router = useRouter()

  const { data: adminRes, isLoading: isAdminLoading } = useGetAllBookingsQuery(undefined, {
    skip: !!initialData || userRole !== "admin",
  })

  const { data: generalRes, isLoading: isGeneralLoading } = useGetBookingsQuery(undefined, {
    skip: !!initialData || userRole === "admin",
  })

  const [updateBooking, { isLoading: isUpdating }] = useUpdateTechBookingMutation()
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const bookings = initialData || (userRole === "admin" ? adminRes?.data : generalRes?.data) || []
  const isLoading = !initialData && (isAdminLoading || isGeneralLoading)

  const handleStatusChange = async (id: string, status: string) => {
    setLoadingId(id)
    try {
      await updateBooking({ id, status }).unwrap()
      toast.success(`Booking ${status.toLowerCase()} successfully!`)
    } catch (err: any) {
      toast.error(err?.data?.message || "Action failed")
    } finally {
      setLoadingId(null)
    }
  }

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" /></div>

  return (
    <Card className="border-gray-200 shadow-sm overflow-hidden rounded-2xl">
      <CardHeader className="border-b bg-gray-50/50 px-6 py-4">
        <CardTitle className="text-lg font-bold text-gray-800">
          {userRole === "technician" ? "Service Requests" : userRole === "admin" ? "All Bookings" : "My Bookings"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-white">
              <TableRow className="hover:bg-transparent">
                <TableHead className="px-6 py-4 font-bold text-gray-600">Service Name</TableHead>
                <TableHead className="font-bold text-gray-600">Scheduled At</TableHead>
                <TableHead className="font-bold text-gray-600">
                  {userRole === "technician" ? "Customer" : "Technician"}
                </TableHead>
                <TableHead className="text-right font-bold text-gray-600">Price</TableHead>
                <TableHead className="text-center font-bold text-gray-600">Status</TableHead>
                <TableHead className="pr-6 text-right font-bold text-gray-600">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.length > 0 ? (
                bookings.map((booking: IBooking) => (
                  <TableRow key={booking.id} className="border-b last:border-0 hover:bg-gray-50/30 transition-colors">
                    {/* ১. সার্ভিস নাম ফিক্স */}
                    <TableCell className="px-6 py-4 font-bold text-gray-900">
                      {booking.service?.name || "Service"}
                    </TableCell>
                    
                    {/* ২. তারিখ ফিক্স (scheduledAt ব্যবহার করো) */}
                    <TableCell className="text-sm text-gray-600">
                      {booking.scheduledAt ? new Date(booking.scheduledAt).toLocaleString('en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      }) : "N/A"}
                    </TableCell>

                    <TableCell className="text-gray-600 font-medium">
                      {userRole === "technician" ? booking.customer?.name : (booking.technician?.name || "Not Assigned")}
                    </TableCell>

                    {/* ৩. প্রাইস ফিক্স (সার্ভিস থেকে প্রাইস নাও) */}
                    <TableCell className="text-right font-black text-gray-900">
                      ${booking.price || booking.service?.price || 0}
                    </TableCell>

                    <TableCell className="text-center">
                      <Badge className={cn("rounded-full font-bold px-3 py-1 border-0", statusColors[booking.status] || "bg-gray-100")}>
                        {booking.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="pr-6 text-right">
                      <div className="flex justify-end gap-2">
                        {userRole === "technician" && booking.status === "REQUESTED" && (
                          <Button size="sm" variant="outline" className="h-8 border-green-200 text-green-600" 
                            onClick={() => handleStatusChange(booking.id!, "ACCEPTED")} disabled={loadingId === booking.id}>
                            {loadingId === booking.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-4 w-4" />}
                          </Button>
                        )}
                        {userRole === 'customer' && booking.status === 'ACCEPTED' && (
                          <Button size="sm" className="h-8 bg-primary hover:bg-primary/90 text-white font-bold"
                            onClick={() => router.push(`/dashboard/customer/bookings/${booking.id}/pay`)}>
                            <CreditCard className="h-4 w-4 mr-1" /> Pay Now
                          </Button>
                        )}
                        {((userRole === 'admin') || (userRole === 'technician' && booking.status !== 'REQUESTED') || (userRole === 'customer' && booking.status !== 'ACCEPTED')) && (
                          <span className="text-gray-300">—</span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow><TableCell colSpan={6} className="py-20 text-center text-gray-400">No records found.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}