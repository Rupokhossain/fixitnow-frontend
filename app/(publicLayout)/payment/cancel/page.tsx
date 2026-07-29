'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { XCircle, RefreshCcw, HelpCircle } from 'lucide-react'
import Link from 'next/link'

export default function PaymentCancelPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md text-center shadow-xl border-t-8 border-t-red-500">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900">Payment Failed</CardTitle>
          <p className="text-muted-foreground mt-2">
            We couldn&apos;t process your payment. Please try again or contact support.
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 italic">
            &quot;Possible reasons: Insufficient funds, incorrect card details, or connection timeout.&quot;
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Link href="/dashboard/customer/bookings" className="w-full">
            <Button className="w-full bg-red-600 hover:bg-red-700 gap-2">
              Try Again <RefreshCcw size={18} />
            </Button>
          </Link>
          <Button variant="outline" className="w-full gap-2 text-gray-600">
            <HelpCircle size={18} /> Contact Support
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}