import { OverviewCards } from '../../_components/overview-card'
import { BookingsTable } from '../../_components/bookings-table'

const AdminPage = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Platform Overview (Admin)</h1>
      <OverviewCards />
      <BookingsTable userRole="admin" />
    </div>
  )
}

export default AdminPage