"use client"

import { useSearchParams, useRouter } from "next/navigation"
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
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function PaymentStatusPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const isSuccess = searchParams.get("success") === "true"
  const bookingId = searchParams.get("bookingId")

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-background px-4 py-12">
      <Card
        className={cn(
          "w-full max-w-md overflow-hidden rounded-[2.5rem] border-t-8 text-center shadow-2xl",
          isSuccess ? "border-t-primary" : "border-t-red-500"
        )}
      >
        <CardHeader className="pt-12">
          <div className="mb-6 flex justify-center">
            {isSuccess ? (
              <div className="rounded-full bg-primary/10 p-5">
                <CheckCircle2 className="h-14 w-14 text-primary" />
              </div>
            ) : (
              <div className="rounded-full bg-red-100 p-5">
                <XCircle className="h-14 w-14 text-red-600" />
              </div>
            )}
          </div>

          <CardTitle className="text-3xl font-black uppercase italic">
            {isSuccess ? "Payment Done!" : "Payment Failed"}
          </CardTitle>

          <p className="mt-3 px-8 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
            {isSuccess
              ? "Your payment has been successfully processed"
              : "The payment process was interrupted"}
          </p>
        </CardHeader>

        <CardContent className="px-10 pb-6">
          <div className="rounded-2xl bg-muted p-4 text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase">
            Ref: {bookingId ? bookingId.slice(-10) : "N/A-TRANS-ID"}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 p-10 pt-4">
          <Button
            onClick={() =>
              router.push("/dashboard/customer/bookings")
            }
            className="h-14 w-full gap-3 rounded-2xl bg-primary text-[10px] font-black tracking-widest text-white uppercase"
          >
            Back to My Bookings
            <ArrowRight size={18} />
          </Button>

          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase"
          >
            Go to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}