"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, XCircle, ArrowRight, RefreshCcw } from "lucide-react"
import Link from "next/link"

export default function PaymentStatusPage() {
  const searchParams = useSearchParams()
  // URL থেকে success ভ্যালু চেক করা (?success=true)
  const isSuccess = searchParams.get("success") === "true"

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Card className={`w-full max-w-md text-center shadow-2xl border-t-8 ${isSuccess ? 'border-t-green-500' : 'border-t-red-500'}`}>
        <CardHeader>
          <div className="flex justify-center mb-4">
            {isSuccess ? (
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
            ) : (
              <div className="bg-red-100 p-4 rounded-full">
                <XCircle className="w-12 h-12 text-red-600" />
              </div>
            )}
          </div>
          <CardTitle className="text-3xl font-black text-gray-900">
            {isSuccess ? "Payment Successful!" : "Payment Failed"}
          </CardTitle>
          <p className="text-muted-foreground mt-2 font-medium">
            {isSuccess 
              ? "Your booking has been confirmed. Our technician will contact you soon." 
              : "We couldn't process your payment. Please check your card and try again."}
          </p>
        </CardHeader>

        <CardContent>
          <div className="bg-gray-50 p-4 rounded-2xl text-sm font-medium text-gray-600">
            {isSuccess 
              ? "You can now track your booking status from your dashboard." 
              : "If money was deducted from your account, please contact our support."}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 p-8">
          {isSuccess ? (
            <Link href="/dashboard/customer/bookings" className="w-full">
              <Button className="w-full h-12 bg-green-600 hover:bg-green-700 gap-2 font-bold shadow-lg">
                Go to My Bookings <ArrowRight size={18} />
              </Button>
            </Link>
          ) : (
            <Link href="/dashboard/customer/bookings" className="w-full">
              <Button className="w-full h-12 bg-red-600 hover:bg-red-700 gap-2 font-bold shadow-lg">
                Try Again <RefreshCcw size={18} />
              </Button>
            </Link>
          )}
          <Link href="/" className="text-sm text-gray-400 hover:text-primary underline font-medium">
            Back to Home
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}