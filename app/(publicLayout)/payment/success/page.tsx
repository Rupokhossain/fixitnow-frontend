'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, ArrowRight, Download } from 'lucide-react'
import Link from 'next/link'

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md text-center shadow-xl border-t-8 border-t-green-500">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900">Payment Successful!</CardTitle>
          <p className="text-muted-foreground mt-2">
            Your booking has been confirmed. Thank you for choosing FixItNow!
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg text-left">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Transaction ID:</span>
              <span className="font-mono font-medium">#TXN-987654321</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Amount Paid:</span>
              <span className="font-bold text-gray-900">$150.00</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Link href="/dashboard/customer/bookings" className="w-full">
            <Button className="w-full bg-primary hover:bg-primary/90 gap-2">
              View My Bookings <ArrowRight size={18} />
            </Button>
          </Link>
          <Button variant="outline" className="w-full gap-2">
            <Download size={18} /> Download Receipt
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}