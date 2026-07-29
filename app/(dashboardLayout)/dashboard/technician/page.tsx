import React from 'react'
import { OverviewCards } from '../../_components/overview-card'
import { BookingsTable } from '../../_components/bookings-table'

const TechnicianPage = () => {
  return (
     <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Service Requests Dashboard</h1>
      <OverviewCards /> 
      <BookingsTable userRole="technician" />
    </div>
  )
}

export default TechnicianPage