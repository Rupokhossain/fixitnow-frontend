/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useParams, useRouter } from "next/navigation"
import { useGetBookingsQuery } from "@/app/redux/api/bookingApi"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  CreditCard,
  Loader2,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react"
import { toast } from "sonner"

import { IBooking } from "@/lib/types" 
import { createPaymentAction } from "@/app/(dashboardLayout)/_actions/paymentActions"
import { Badge } from "@/components/ui/badge"

export default function PaymentInitiationPage() {
  const params = useParams()
  const router = useRouter()
  const bookingId = params.id as string

  const { data: bookingRes, isLoading: isFetching } = useGetBookingsQuery({})
  const booking = bookingRes?.data?.find((b: IBooking) => b.id === bookingId)

  const handlePayment = async () => {
    try {
      const toastId = toast.loading("Connecting to secure payment gateway...")

      const result = await createPaymentAction(bookingId)

      toast.dismiss(toastId)

      if (result.success && result.data) {
        toast.success("Redirecting to Stripe...")
        window.location.href = result.data
      } else {
        toast.error(result.message || "Could not initiate payment")
      }
    } catch (err: any) {
      toast.error("An unexpected error occurred. Please try again.")
    }
  }

  if (isFetching) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

  if (!booking) {
    return <div className="py-20 text-center font-bold">Booking not found!</div>
  }

  return (
    <div className="mx-auto max-w-2xl animate-in px-4 py-12 duration-500 fade-in">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6 gap-2 font-semibold text-gray-500 hover:bg-white"
      >
        <ArrowLeft size={16} /> Back to Bookings
      </Button>

      <Card className="overflow-hidden rounded-[2rem] border-0 bg-white shadow-2xl">
        <CardHeader className="bg-gray-900 p-10 text-white">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-black tracking-tight">
                Checkout
              </CardTitle>
              <CardDescription className="mt-2 text-gray-400">
                Finish your booking for {booking.service?.name}
              </CardDescription>
            </div>
            <div className="rounded-2xl bg-white/10 p-3">
              <CreditCard size={32} className="text-white" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 p-10">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-500">Service Fee</span>
              <span className="font-bold text-gray-900">
                ${booking.price || booking.service?.price}
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-4 text-sm">
              <span className="font-medium text-gray-500">
                Platform Charges
              </span>
              <span className="font-bold text-green-600">FREE</span>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-lg font-bold text-gray-900">
                Total to Pay
              </span>
              <span className="text-4xl font-black text-primary">
                ${booking.price || booking.service?.price}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
              <p className="mb-1 text-[10px] font-bold text-gray-400 uppercase">
                Date
              </p>
              <p className="text-sm font-bold text-gray-700">
                {new Date(booking.scheduledAt).toLocaleDateString()}
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
              <p className="mb-1 text-[10px] font-bold text-gray-400 uppercase">
                Status
              </p>
              <Badge className="border-0 bg-blue-100 text-blue-700">
                {booking.status}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-green-100 bg-green-50 p-4">
            <ShieldCheck className="h-5 w-5 text-green-600" />
            <p className="text-xs leading-relaxed font-semibold text-green-700">
              Your payment is encrypted via SSL and processed by Stripe. No card
              data is stored on our servers.
            </p>
          </div>
        </CardContent>

        <CardFooter className="p-10 pt-0">
          <Button
            onClick={handlePayment}
            className="h-16 w-full gap-3 rounded-2xl text-xl font-black shadow-xl transition-transform hover:scale-[1.02] active:scale-95"
          >
            Pay & Confirm <CheckCircle2 size={24} />
          </Button>
        </CardFooter>
      </Card>

      <p className="mt-8 text-center text-xs font-medium text-gray-400">
        Transaction ID: <span className="font-mono">{booking.id}</span>
      </p>
    </div>
  )
}
