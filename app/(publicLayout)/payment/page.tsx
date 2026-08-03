"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CheckCircle2, XCircle, ArrowRight, RefreshCcw } from "lucide-react"
import Link from "next/link"
import { useUpdateTechBookingMutation } from "@/app/redux/api/technicianApi"
import { useEffect, useRef } from "react"
import { toast } from "sonner"

export default function PaymentStatusPage() {
  const searchParams = useSearchParams()
  const isSuccess = searchParams.get("success") === "true"
  const [updateStatus] = useUpdateTechBookingMutation()
  const hasCalledAPI = useRef(false)

   useEffect(() => {
    const finalizePayment = async () => {
      const bookingId = sessionStorage.getItem("pendingBookingId")
      
      if (isSuccess && bookingId && !hasCalledAPI.current) {
        hasCalledAPI.current = true
        try {
          await updateStatus({ id: bookingId, status: "PAID" }).unwrap()
          toast.success("Payment verified and status updated!")
          sessionStorage.removeItem("pendingBookingId")
        } catch (err) {
          console.error("Verification failed", err)
        }
      }
    }

    finalizePayment()
  }, [isSuccess, updateStatus])


  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <Card
        className={`w-full max-w-md border-t-8 text-center shadow-2xl ${isSuccess ? "border-t-green-500" : "border-t-red-500"}`}
      >
        <CardHeader>
          <div className="mb-4 flex justify-center">
            {isSuccess ? (
              <div className="rounded-full bg-green-100 p-4">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
            ) : (
              <div className="rounded-full bg-red-100 p-4">
                <XCircle className="h-12 w-12 text-red-600" />
              </div>
            )}
          </div>
          <CardTitle className="text-3xl font-black text-gray-900">
            {isSuccess ? "Payment Successful!" : "Payment Failed"}
          </CardTitle>
          <p className="mt-2 font-medium text-muted-foreground">
            {isSuccess
              ? "Your booking has been confirmed. Our technician will contact you soon."
              : "We couldn't process your payment. Please check your card and try again."}
          </p>
        </CardHeader>

        <CardContent>
          <div className="rounded-2xl bg-gray-50 p-4 text-sm font-medium text-gray-600">
            {isSuccess
              ? "You can now track your booking status from your dashboard."
              : "If money was deducted from your account, please contact our support."}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 p-8">
          {isSuccess ? (
            <Link href="/dashboard/customer/bookings" className="w-full">
              <Button className="h-12 w-full gap-2 bg-green-600 font-bold shadow-lg hover:bg-green-700">
                Go to My Bookings <ArrowRight size={18} />
              </Button>
            </Link>
          ) : (
            <Link href="/dashboard/customer/bookings" className="w-full">
              <Button className="h-12 w-full gap-2 bg-red-600 font-bold shadow-lg hover:bg-red-700">
                Try Again <RefreshCcw size={18} />
              </Button>
            </Link>
          )}
          <Link
            href="/"
            className="text-sm font-medium text-gray-400 underline hover:text-primary"
          >
            Back to Home
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
