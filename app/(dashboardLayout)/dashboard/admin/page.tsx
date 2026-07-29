
import { BookingsTable } from '../../_components/bookings-table'
import OverviewCards from '../../_components/overview-card'

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