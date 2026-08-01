"use client"

import { useParams, useRouter } from "next/navigation"
import { useGetBookingsQuery } from "@/app/redux/api/bookingApi"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Loader2, ArrowLeft, ShieldCheck, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

import { IBooking } from "@/lib/types" // তোমার টাইপ ফাইল থেকে
import { createPaymentAction } from "@/app/(dashboardLayout)/_actions/paymentActions"
import { Badge } from "@/components/ui/badge"

export default function PaymentInitiationPage() {
  const params = useParams()
  const router = useRouter()
  const bookingId = params.id as string

  // ১. বুকিং ডাটা ফেচ করা
  const { data: bookingRes, isLoading: isFetching } = useGetBookingsQuery({})
  const booking = bookingRes?.data?.find((b: IBooking) => b.id === bookingId)

  // ২. পেমেন্ট হ্যান্ডেলার
  const handlePayment = async () => {
    try {
      const toastId = toast.loading("Connecting to secure payment gateway...")
      
      const result = await createPaymentAction(bookingId);

      toast.dismiss(toastId);

if (result.success && result.data) {
  toast.success("Redirecting to Stripe...");
  window.location.href = result.data;
} else {
  toast.error(result.message || "Could not initiate payment");
}
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  }

  if (isFetching) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="animate-spin h-10 w-10 text-primary" />
      </div>
    )
  }

  if (!booking) {
    return <div className="text-center py-20 font-bold">Booking not found!</div>
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 animate-in fade-in duration-500">
      <Button 
        variant="ghost" 
        onClick={() => router.back()} 
        className="mb-6 hover:bg-white gap-2 text-gray-500 font-semibold"
      >
        <ArrowLeft size={16} /> Back to Bookings
      </Button>

      <Card className="border-0 shadow-2xl rounded-[2rem] overflow-hidden bg-white">
        <CardHeader className="bg-gray-900 text-white p-10">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-3xl font-black tracking-tight">Checkout</CardTitle>
              <CardDescription className="text-gray-400 mt-2">Finish your booking for {booking.service?.name}</CardDescription>
            </div>
            <div className="bg-white/10 p-3 rounded-2xl">
               <CreditCard size={32} className="text-white" />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-10 space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 font-medium">Service Fee</span>
              <span className="text-gray-900 font-bold">${booking.price || booking.service?.price}</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b pb-4">
              <span className="text-gray-500 font-medium">Platform Charges</span>
              <span className="text-green-600 font-bold">FREE</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-lg font-bold text-gray-900">Total to Pay</span>
              <span className="text-4xl font-black text-primary">${booking.price || booking.service?.price}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Date</p>
                <p className="text-sm font-bold text-gray-700">{new Date(booking.scheduledAt).toLocaleDateString()}</p>
             </div>
             <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Status</p>
                <Badge className="bg-blue-100 text-blue-700 border-0">{booking.status}</Badge>
             </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl border border-green-100">
            <ShieldCheck className="text-green-600 h-5 w-5" />
            <p className="text-xs text-green-700 font-semibold leading-relaxed">
              Your payment is encrypted via SSL and processed by Stripe. No card data is stored on our servers.
            </p>
          </div>
        </CardContent>

        <CardFooter className="p-10 pt-0">
          <Button 
            onClick={handlePayment} 
            className="w-full h-16 text-xl font-black rounded-2xl gap-3 shadow-xl hover:scale-[1.02] transition-transform active:scale-95"
          >
            Pay & Confirm <CheckCircle2 size={24} />
          </Button>
        </CardFooter>
      </Card>
      
      <p className="text-center text-xs text-gray-400 mt-8 font-medium">
        Transaction ID: <span className="font-mono">{booking.id}</span>
      </p>
    </div>
  )
}