import React from 'react'
import { BookingsTable } from '../../_components/bookings-table'
import OverviewCards from '../../_components/overview-card'

const CustomerPage = () => {
  return (
     <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Welcome back, James</h1>
      <OverviewCards />
      <BookingsTable userRole="customer" />
    </div>
  )
}

export default CustomerPage