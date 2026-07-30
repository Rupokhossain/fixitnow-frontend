
"use client"
import { BookingsTable } from '../../_components/bookings-table'
import OverviewCards from '../../_components/overview-card'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/redux/store'

const CustomerPage = () => {
const user = useSelector((state: RootState) => state.auth.user)

  return (
     <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">
        Welcome back, {user?.name}
      </h1>
      <OverviewCards />
      <BookingsTable userRole="customer" />
    </div>
  )
}

export default CustomerPage