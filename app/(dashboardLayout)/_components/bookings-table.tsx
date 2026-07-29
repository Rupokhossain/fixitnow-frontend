'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, X, CreditCard } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Booking {
  id: string
  serviceName: string
  date: string
  technician?: string
  customer?: string
  price: number
  status: 'Requested' | 'In-Progress' | 'Paid' | 'Completed'
}

interface BookingsTableProps {
  userRole?: 'customer' | 'technician' | 'admin'
}

const statusColors: Record<Booking['status'], string> = {
  Requested: 'bg-yellow-100 text-yellow-800',
  'In-Progress': 'bg-blue-100 text-blue-800',
  Paid: 'bg-green-100 text-green-800',
  Completed: 'bg-gray-100 text-gray-800',
}

export function BookingsTable({ userRole = 'customer' }: BookingsTableProps) {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      serviceName: 'Plumbing Repair',
      date: 'Jan 15, 2024 - 10:00 AM',
      technician: 'John Smith',
      customer: 'You',
      price: 150,
      status: 'Completed',
    },
    {
      id: '2',
      serviceName: 'HVAC Maintenance',
      date: 'Jan 22, 2024 - 2:00 PM',
      technician: 'Sarah Johnson',
      customer: 'You',
      price: 200,
      status: 'In-Progress',
    },
    {
      id: '3',
      serviceName: 'Electrical Work',
      date: 'Jan 25, 2024 - 9:00 AM',
      technician: 'Mike Davis',
      customer: 'You',
      price: 300,
      status: 'Requested',
    },
    {
      id: '4',
      serviceName: 'Roof Inspection',
      date: 'Jan 28, 2024 - 11:00 AM',
      technician: 'Emily Brown',
      customer: 'Robert Wilson',
      price: 250,
      status: 'Paid',
    },
    {
      id: '5',
      serviceName: 'Appliance Repair',
      date: 'Feb 2, 2024 - 3:00 PM',
      technician: 'David Lee',
      customer: 'You',
      price: 180,
      status: 'Requested',
    },
  ])

  const handleAccept = (id: string) => {
    setBookings(
      bookings.map((b) =>
        b.id === id ? { ...b, status: 'In-Progress' as const } : b
      )
    )
  }

  const handleDecline = (id: string) => {
    setBookings(bookings.filter((b) => b.id !== id))
  }

  const handlePayNow = (id: string) => {
    setBookings(
      bookings.map((b) =>
        b.id === id ? { ...b, status: 'Paid' as const } : b
      )
    )
  }

  return (
    <Card className="border-gray-200">
      <CardHeader className="border-b border-gray-200">
        <CardTitle className="text-lg font-semibold text-gray-900">
          {userRole === 'technician'
            ? 'Service Requests'
            : userRole === 'admin'
              ? 'All Bookings'
              : 'My Bookings'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50 border-b border-gray-200">
              <TableRow className="hover:bg-gray-50">
                <TableHead className="text-gray-700 font-semibold">
                  Service Name
                </TableHead>
                <TableHead className="text-gray-700 font-semibold">
                  Date & Time
                </TableHead>
                <TableHead className="text-gray-700 font-semibold">
                  {userRole === 'technician' ? 'Customer' : 'Technician'}
                </TableHead>
                <TableHead className="text-gray-700 font-semibold text-right">
                  Price
                </TableHead>
                <TableHead className="text-gray-700 font-semibold">
                  Status
                </TableHead>
                <TableHead className="text-gray-700 font-semibold text-center">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow
                  key={booking.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="text-gray-900 font-medium">
                    {booking.serviceName}
                  </TableCell>
                  <TableCell className="text-gray-600 text-sm">
                    {booking.date}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {userRole === 'technician'
                      ? booking.customer
                      : booking.technician}
                  </TableCell>
                  <TableCell className="text-gray-900 font-semibold text-right">
                    ${booking.price}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        'font-medium',
                        statusColors[booking.status]
                      )}
                      variant="secondary"
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      {userRole === 'technician' &&
                        booking.status === 'Requested' && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 border-green-200 text-green-600 hover:bg-green-50"
                              onClick={() => handleAccept(booking.id)}
                            >
                              <Check className="h-4 w-4" />
                              Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 border-red-200 text-red-600 hover:bg-red-50"
                              onClick={() => handleDecline(booking.id)}
                            >
                              <X className="h-4 w-4" />
                              Decline
                            </Button>
                          </>
                        )}
                      {userRole === 'customer' &&
                        booking.status === 'In-Progress' && (
                          <Button
                            size="sm"
                            className="h-8 bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => handlePayNow(booking.id)}
                          >
                            <CreditCard className="h-4 w-4" />
                            Pay Now
                          </Button>
                        )}
                      {(userRole === 'admin' ||
                        (userRole === 'technician' &&
                          booking.status !== 'Requested') ||
                        (userRole === 'customer' &&
                          booking.status !== 'In-Progress')) && (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
