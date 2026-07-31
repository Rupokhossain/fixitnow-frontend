/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, CreditCard, Loader2, Play, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useGetBookingsQuery, useGetAllBookingsQuery } from "@/app/redux/api/bookingApi"
import { useUpdateTechBookingMutation } from "@/app/redux/api/technicianApi"
import { toast } from "sonner"
import { IBooking } from "@/lib/types"

interface BookingsTableProps {
  userRole?: "customer" | "technician" | "admin"
  initialData?: IBooking[]
}

const statusColors: Record<string, string> = {
  REQUESTED: "bg-yellow-100 text-yellow-800",
  ACCEPTED: "bg-blue-100 text-blue-800",
  PAID: "bg-purple-100 text-purple-800",
  IN_PROGRESS: "bg-indigo-100 text-indigo-800",
  COMPLETED: "bg-green-100 text-green-800",
  DECLINED: "bg-red-100 text-red-800",
}

export function BookingsTable({ userRole = "customer", initialData }: BookingsTableProps) {
  // ১. এপিআই হুকস (skip লজিক সহ যাতে ভুল রোলে কল না হয়)
  const { data: adminRes, isLoading: isAdminLoading } = useGetAllBookingsQuery(undefined, {
    skip: !!initialData || userRole !== 'admin'
  });
  
  const { data: generalRes, isLoading: isGeneralLoading } = useGetBookingsQuery(undefined, {
    skip: !!initialData || userRole === 'admin'
  });

  const [updateBooking, { isLoading: isUpdating }] = useUpdateTechBookingMutation();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // ২. ডাটা সোর্স নির্ধারণ
  const bookings = initialData || (userRole === 'admin' ? adminRes?.data : generalRes?.data) || [];
  const isLoading = !initialData && (isAdminLoading || isGeneralLoading);

  const handleStatusChange = async (id: string, status: string) => {
    setLoadingId(id);
    try {
      await updateBooking({ id, status }).unwrap();
      toast.success(`Job ${status.toLowerCase()} successfully!`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Action failed");
    } finally {
      setLoadingId(null);
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" /></div>

  return (
    <Card className="border-gray-200 shadow-sm">
      <CardHeader className="border-b bg-gray-50/50">
        <CardTitle className="text-lg font-bold text-gray-900">
          {userRole === 'technician' ? 'Incoming Service Requests' : userRole === 'admin' ? 'All Platform Bookings' : 'My Bookings'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-bold py-4 px-6">Service Name</TableHead>
                <TableHead className="font-bold">Date & Time</TableHead>
                <TableHead className="font-bold">{userRole === 'technician' ? 'Customer' : 'Technician'}</TableHead>
                <TableHead className="font-bold text-right">Price</TableHead>
                <TableHead className="font-bold text-center">Status</TableHead>
                <TableHead className="font-bold text-right pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.length > 0 ? (
                bookings.map((booking: IBooking) => (
                  <TableRow key={booking._id} className="hover:bg-gray-50/50 border-b last:border-0">
                    <TableCell className="font-medium py-4 px-6">{booking.service?.name || "General Service"}</TableCell>
                    <TableCell className="text-gray-600 text-sm">
                      {new Date(booking.slotDate).toLocaleDateString()} - {booking.slotTime}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {userRole === 'technician' ? booking.customer?.name : (booking.technician?.name || "Pending")}
                    </TableCell>
                    <TableCell className="font-bold text-right">${booking.price || booking.service?.price || 0}</TableCell>
                    <TableCell className="text-center">
                      <Badge className={cn('font-semibold rounded-full', statusColors[booking.status] || 'bg-gray-100')}>
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex justify-end gap-2">
                        {userRole === 'technician' && booking.status === 'REQUESTED' && (
                          <>
                            <Button size="sm" variant="outline" className="h-8 border-green-200 text-green-600" 
                              onClick={() => handleStatusChange(booking._id, 'ACCEPTED')} disabled={loadingId === booking._id}>
                              {loadingId === booking._id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-4 w-4" />}
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 border-red-200 text-red-600" 
                              onClick={() => handleStatusChange(booking._id, 'DECLINED')} disabled={loadingId === booking._id}>
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {/* অন্যান্য অ্যাকশন বাটন এখানে থাকবে */}
                        {userRole === 'admin' && <span className="text-gray-300">—</span>}
                        {userRole === 'customer' && booking.status === 'ACCEPTED' && <Button size="sm" className="h-8 bg-blue-600">Pay Now</Button>}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow><TableCell colSpan={6} className="py-20 text-center text-gray-500">No bookings found.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}