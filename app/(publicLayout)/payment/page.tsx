/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useUpdateBookingStatusMutation } from "@/app/redux/api/bookingApi"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RefreshCcw,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function PaymentStatusPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const isSuccess = searchParams.get("success") === "true"

  const [updateStatus, { isLoading: isVerifying }] =
    useUpdateBookingStatusMutation()

  const hasCalledAPI = useRef(false)

  useEffect(() => {
    const verifyAndFixStatus = async () => {
      const bookingId = sessionStorage.getItem("pendingBookingId")

      if (isSuccess && bookingId && !hasCalledAPI.current) {
        hasCalledAPI.current = true
        try {
          await updateStatus({ id: bookingId, status: "PAID" }).unwrap()
          toast.success("Payment verified and booking updated!")

          sessionStorage.removeItem("pendingBookingId")
        } catch (err: any) {
          console.error("Manual verification failed:", err)
        }
      }
    }

    verifyAndFixStatus()
  }, [isSuccess, updateStatus])

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-gray-50/50 px-4 py-12 font-sans">
      <Card
        className={`w-full max-w-md overflow-hidden rounded-[2rem] border-t-8 text-center shadow-2xl ${isSuccess ? "border-t-green-500" : "border-t-red-500"}`}
      >
        <CardHeader className="pt-10">
          <div className="mb-6 flex justify-center">
            {isSuccess ? (
              <div className="animate-bounce rounded-full bg-green-100 p-5">
                <CheckCircle2 className="h-14 w-14 text-green-600" />
              </div>
            ) : (
              <div className="rounded-full bg-red-100 p-5">
                <XCircle className="h-14 w-14 text-red-600" />
              </div>
            )}
          </div>
          <CardTitle className="text-3xl font-black tracking-tight text-gray-900">
            {isSuccess ? "Payment Received!" : "Payment Cancelled"}
          </CardTitle>
          <p className="mt-2 px-6 font-medium text-gray-500">
            {isSuccess
              ? "We've received your payment. Your service is now scheduled."
              : "The transaction was not completed. No money was deducted."}
          </p>
        </CardHeader>

        <CardContent className="px-10 pb-6">
          {isVerifying ? (
            <div className="flex items-center justify-center gap-2 rounded-xl bg-blue-50 py-3 font-bold text-blue-600">
              <Loader2 className="h-4 w-4 animate-spin" /> Finalizing Booking...
            </div>
          ) : (
            <div className="rounded-2xl bg-gray-100 p-4 text-xs font-bold tracking-widest text-gray-400 uppercase">
              {isSuccess ? "Status: Booking Paid" : "Status: Payment Failed"}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-3 p-10 pt-0">
          {isSuccess ? (
            <Link href="/dashboard/customer/bookings" className="w-full">
              <Button className="h-14 w-full gap-3 rounded-2xl bg-gray-900 font-black text-white shadow-xl transition-all hover:bg-black active:scale-95">
                Go to My Bookings <ArrowRight size={20} />
              </Button>
            </Link>
          ) : (
            <Link href="/dashboard/customer/bookings" className="w-full">
              <Button className="h-14 w-full gap-3 rounded-2xl bg-red-600 font-black text-white shadow-xl transition-all hover:bg-red-700">
                Try Again <RefreshCcw size={20} />
              </Button>
            </Link>
          )}
          <Button
            variant="link"
            onClick={() => router.push("/")}
            className="mt-2 font-bold text-gray-400"
          >
            Return to Homepage
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
